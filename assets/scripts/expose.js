// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const jsConfetti = new JSConfetti();
  // update horn image when horn is selected
  const hornSelector = document.querySelector("select");

  /*
    we specify the event parameter instead of using the event prop for portability:
    https://stackoverflow.com/questions/58341832/event-is-deprecated-what-should-be-used-instead 
  */

  let isPartyHorn = false; 
  hornSelector.addEventListener("input", function(event) {
    function genPath (fileType){
      let assetType = ""
      if (fileType == "mp3"){
        assetType = "audio"
      }
      else if (fileType == "svg"){
        assetType = "images"
      }
      else{
        console.log("invalid fileType")
      }
      return `assets/${assetType}/${hornName}.${fileType}`
    }

    //change horn image 
    const hornImg = document.querySelector("img"); 
    let hornName = event.target.value // the name of the selected horn 
    hornImg.src = genPath("svg") // .src selects src html property 

    //change horn sound 
    const hornSound = document.getElementsByClassName("hidden")[0]
    hornSound.src = genPath("mp3")
    if (hornName == "party-horn"){
      isPartyHorn = true; 
    }
    else{isPartyHorn=false;}
  
  }); 

  /* adjust volume 
  update speaker image that displays when volume is adjusted */

  const playButton = document.querySelector("button"); 
  const audioFile = document.querySelector("audio.hidden");
  const volumeInputSelector = document.getElementById("volume"); 
  const volumeImage = document.querySelectorAll("img")[1]; 

  console.log(volumeImage); 
  let vol = 50; 

  volumeInputSelector.addEventListener("input", function (event){
    vol = event.target.value; 
    console.log(vol)
    let decimalVol = vol / 100; 
    audioFile.volume = decimalVol; 
    console.log(audioFile); 
    console.log (audioFile.volume);
    let volumeLevelString = ""

    if(vol == 0){
      volumeLevelString = "0"; 
    } 
    else if (vol < 33){
      volumeLevelString = "1"; 
    }
    else if (vol < 67){
      volumeLevelString = "2";
    }
    else{
      volumeLevelString = "3";
    }

    let audioIconFilePath = `assets/icons/volume-level-${volumeLevelString}.svg`
    volumeImage.setAttribute("src", audioIconFilePath);
  }); 

  //play horn when button is clicked, shoot confetti if it's a party horn 
  playButton.addEventListener("click", function(event){

    /*this function is adapted from https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play */
    async function tootHorn(){ 
      try {
        await audioFile.play(); 
        if (isPartyHorn){
          jsConfetti.addConfetti(); 
        }
      }
      catch (err){
        //doing nothing :D 
      }
    }

    tootHorn(); 

  }

  
);
}