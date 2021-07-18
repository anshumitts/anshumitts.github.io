function load(e) {
    var file_name = e.getAttribute("data");
    $("#right").load(file_name);
    // document.getElementById("right").innerHTML = '<object type="type/html" data="'+file_name+'" ></object>';
    // document.getElementById("right").innerHTML="daara";
    // console.log(document.getElementById("right").innerHTML = '<object type="type/html" data="' + file_name + '" ></object>');
}

function goto(e){
    var url = e.getAttribute("url");
    window.open(url, '_blank');
}

$(window).on('load', function () {
    $("#right").load('./html/aboutme.html');
    $("#left").load('./html/nav.html');
});