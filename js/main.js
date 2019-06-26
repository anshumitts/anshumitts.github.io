function load(e) {
    var file_name = e.getAttribute("data");
    $("#right").load(file_name);
    // document.getElementById("right").innerHTML = '<object type="type/html" data="'+file_name+'" ></object>';
    // document.getElementById("right").innerHTML="daara";
    // console.log(document.getElementById("right").innerHTML = '<object type="type/html" data="' + file_name + '" ></object>');
}

$(window).on('load', function () {
    $("#right").load('./html/aboutme.html');
});