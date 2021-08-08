function load(e) {
    var file_name = e.getAttribute("data");
    $("#right").load(file_name);
}

function goto(e){
    var url = e.getAttribute("url");
    window.open(url, '_blank');
}

$(window).on('load', function () {
    $("#right").load('./html/aboutme.html');
    $("#left").load('./html/nav.html');
});

$(document).ready(function(){
    $('.in_nav_link').on('click',function(){
        var aID = $(this).attr('href');
        aID = aID.replace("#", "\.");
        console.log(aID);
        $("#right").load(aID);
        return false
    });
});