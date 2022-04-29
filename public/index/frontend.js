const leftButton = document.querySelector(".left-btn")
const rightButton = document.querySelector(".right-btn")
const imgContent = document.querySelector(".home-img");
var img = 1;
// console.log(leftButton);
leftButton.addEventListener("onclick",function(){
    console.log("img"+img+".avif");
    imgContent.setAttribute(src,"img"+img+".avif");
})
document.querySelector(".left-btn").onclick = function(){
    // console.log("public/index/img"+img+".avif");
    if(img == 3){
        img = 1;
    }
    else
        img++;
    imgContent.setAttribute("src","index/img"+img+".avif")
}
document.querySelector(".right-btn").onclick = function(){
    // console.log("public/index/img"+img+".avif");
    if(img == 1){
        img = 3;
    }
    else
        img--;
    imgContent.setAttribute("src","index/img"+img+".avif")
}

function loader(){
    document.querySelector(".loader-container").classList.add('fade-out')
}
function fadeOut(){
    setInterval(loader, 2000)
}
window.onload = fadeOut;