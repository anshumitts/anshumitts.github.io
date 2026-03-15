/**
 * Loads a TSV file and returns an array of objects keyed by header columns.
 */
async function loadTSV(url) {
    const resp = await fetch(url);
    const text = await resp.text();
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split('\t');
    return lines.slice(1).map(line => {
        const vals = line.split('\t');
        const obj = {};
        headers.forEach((h, i) => { obj[h.trim()] = (vals[i] || '').trim(); });
        return obj;
    });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Render news items from data/news.tsv
 */
async function renderNews() {
    const months = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
    function newsDate(d) {
        var parts = d.trim().split(/\s+/);
        if (parts.length >= 2) {
            var m = months[parts[0].toLowerCase().slice(0,3)] || 0;
            return parseInt(parts[1]) * 100 + m;
        }
        return (parseInt(parts[0]) || 0) * 100;
    }
    const items = await loadTSV('./data/news.tsv');
    items.sort((a, b) => newsDate(b.date) - newsDate(a.date));
    const ul = document.getElementById('news-list');
    if (!ul) return;
    ul.innerHTML = items.map(item => {
        const cls = item.highlight === '1' ? ' class="highlight"' : '';
        return '<li' + cls + '><span class="news-date">' + escapeHTML(item.date) + '</span>' + escapeHTML(item.text) + '</li>';
    }).join('');
}

/**
 * Render publications from data/publications.tsv
 */
async function renderPublications() {
    const pubs = await loadTSV('./data/publications.tsv');
    pubs.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
    const container = document.getElementById('publications-list');
    if (!container) return;
    container.innerHTML = pubs.map(pub => {
        let links = '';
        if (pub.pdf_url) links += '<a href="' + escapeHTML(pub.pdf_url) + '" target="_blank">PDF</a>';
        if (pub.code_url) links += '<a href="' + escapeHTML(pub.code_url) + '" target="_blank">Code</a>';
        if (pub.video_url) links += '<a href="' + escapeHTML(pub.video_url) + '" target="_blank">Video</a>';
        return '<div class="pub-entry">' +
            '<div class="pub-title">' + escapeHTML(pub.title) + '</div>' +
            '<div class="pub-authors">' + escapeHTML(pub.authors) + '</div>' +
            '<div class="pub-venue">' + escapeHTML(pub.venue) + ', ' + escapeHTML(pub.year) + '</div>' +
            (links ? '<div class="pub-links">' + links + '</div>' : '') +
            '</div>';
    }).join('');
}

/**
 * Render patents from data/patents.tsv
 */
async function renderPatents() {
    const patents = await loadTSV('./data/patents.tsv');
    patents.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
    const container = document.getElementById('patents-list');
    if (!container) return;
    container.innerHTML = patents.map(pat => {
        return '<div class="patent-entry">' +
            '<div class="patent-title">' + escapeHTML(pat.title) + '</div>' +
            '<div class="patent-meta">' + escapeHTML(pat.inventors) + ' &middot; ' + escapeHTML(pat.patent_number) + ' &middot; ' + escapeHTML(pat.status) + ' (' + escapeHTML(pat.year) + ')</div>' +
            '<div class="patent-abstract">' + escapeHTML(pat.abstract) + '</div>' +
            '<div class="patent-citation">' + escapeHTML(pat.citation) + '</div>' +
            '</div>';
    }).join('');
}

// Load all sections on page ready
document.addEventListener('DOMContentLoaded', function() {
    renderNews();
    renderPublications();
    // renderResearchNotes();
    // renderPatents();
});

/**
 * Render research notes/blog posts from data/research_notes.tsv
 */
async function renderResearchNotes() {
    const notes = await loadTSV('./data/research_notes.tsv');
    var months = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
    function noteDate(d) {
        var parts = d.trim().split(/\s+/);
        if (parts.length >= 2) {
            var m = months[parts[0].toLowerCase().slice(0,3)] || 0;
            return parseInt(parts[1]) * 100 + m;
        }
        return (parseInt(parts[0]) || 0) * 100;
    }
    notes.sort((a, b) => noteDate(b.date) - noteDate(a.date));
    var container = document.getElementById('research-notes-list');
    if (!container) return;
    container.innerHTML = notes.map(function(note) {
        var body = escapeHTML(note.content || '').replace(/\\n/g, '<br>');
        return '<div class="note-entry">' +
            '<div class="note-header">' +
            '<span class="note-title">' + escapeHTML(note.title) + '</span>' +
            '<span class="note-date">' + escapeHTML(note.date) + '</span>' +
            '</div>' +
            '<div class="note-summary">' + escapeHTML(note.summary) + '</div>' +
            '<details class="note-details"><summary>Read more</summary>' +
            '<div class="note-body">' + body + '</div>' +
            '</details>' +
            '</div>';
    }).join('');
}
