console.log("it works!");

function goingHome(){
  window.location.href = window.location.href.substring(0, window.location.href.indexOf('/helloWorld/'));
}

var allImages = document.querySelectorAll("img");

for (var i = 0; i < allImages.length; i++) {
  allImages[i].addEventListener("click", function() {
    var currentElement = this;
    console.log("clicked on", currentElement);
    currentElement.classList.add("do-flip");
    setTimeout(function() {
      currentElement.classList.remove("do-flip");
    }, 1000);
  });
}

var allCatImages = document.querySelectorAll("#cat-container img");
allCatImages.forEach(catImage =>{
  catImage.addEventListener("click",function(){
    var audio = new Audio('./media/meow.mp3');
    audio.play();
  })
});

var allDogImages = document.querySelectorAll("#dog-container img");
allDogImages.forEach(dogImage =>{
  dogImage.addEventListener("click",function(){
    var audio = new Audio('./media/bark.mp3');
    audio.play();
  })
});

