let menuBtn = document.getElementById("menuBtn");
let  menu = document.getElementById("menu");

menu.style.left = "-200px";
menuBtn.onclick = function () {
    if (menu.style.left === "-200px") {
        menu.style.left = "0px";
    } else {
        menu.style.left = "-200px"
    }
}