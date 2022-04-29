
const cameraPlayer = document.getElementById("player");
const captureButton = document.getElementById('capture');
const camera = document.querySelector(".camera")
const canvas = document.getElementById('canvas');
let star = document.querySelectorAll(".rating input")
let showValue = document.querySelector("#rating-value")
let starValue = document.querySelectorAll(".rating-wrap input")
const Urlaccess = document.querySelector(".imageURLAccess input")

console.log(starValue);
for(let i=0;i<star.length;i++){
  star[i].addEventListener("click",function(){
    i=this.value;
    showValue.innerHTML = i + " out of 5"
    starValue[10].value = i
    console.log(starValue[10].value);
  })
}

// console.log(stars);

// for(var x=0;x<5;x++){  
//   stars[x].starValue = ((x+1))
//   stars[x].addEventListener("click",function(){
//     for(var j=0;j<=x;j++){
// //       stars[j].style.color = "green"
// //     }
// //     for(var k=x+1;k<=5;j++){
// //       stars[k].classList.remove("star-yellow")
// //     }
// //   }

// //   )
// // }
// stars.forEach((star,i)=>{
//   star.onclick = function(){
//     for(var j=0;j<=i;j++){
//       star.classList.add("star-yellow")
//     }
//     for(var k=i+1;k<=5;j++){
//       star.classList.remove("star-yellow")
//     }
//     // console.log(i+1);
//     // let current_star_level = i+1
//     // stars.forEach((star,j)=>{
//     //   console.log(j);
//     // })
//   }
//     // console.log(star);
//     // console.log(i+1);
    
    
  
//   }
// )
// // function showRating(e){
// //   let type= e.type;
// //   console.log(type);
// // }



document.querySelector(".camera-btn").addEventListener('click', () => {
    cameraPlayer.classList.remove("hide")
    captureButton.classList.remove("hide")
    camera.classList.add("camera-placement")
    canvas.classList.remove("hide")
    const player = document.getElementById('player');
    const context = canvas.getContext('2d');

  const constraints = {
    video: true,
  };

  captureButton.addEventListener('click', () => {
    cameraPlayer.classList.add("hide")
    player.srcObject.getVideoTracks().forEach(track => track.stop());
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    // console.log(dataURL);
    Urlaccess.value = dataURL
    console.log(Urlaccess.value);
    var img = new window.Image();
    img.addEventListener("load", function () {
        canvas.getContext("2d").drawImage(img, 0, 0);
    });
    img.setAttribute("src", dataURL);
  });

  // Attach the video stream to the video element and autoplay.
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });
})


function loader(){
    document.querySelector(".loader-container").classList.add('fade-out')
}
function fadeOut(){
    setInterval(loader, 2000)
}
window.onload = fadeOut;