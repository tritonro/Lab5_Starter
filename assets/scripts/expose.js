// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  // update horn image when horn is selected
  const hornSelector = document.querySelector("select"); 
  const volumeInputSelector = document.querySelector("input");
  console.log(hornSelector); 

  /*
    we specify the event parameter instead of using the event prop for portability:
    https://stackoverflow.com/questions/58341832/event-is-deprecated-what-should-be-used-instead 
  */
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
  
  }); 

  //play horn at specified volume when button is clicked 

  const playButton = document.querySelector("button"); 
  const audioFile = document.querySelector("audio.hidden"); 
  console.log(audioFile); 
  playButton.addEventListener("click", function(event){

    /*this function is adapted from https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play */
    async function tootHorn(){ 
      try {
        await audioFile.play(); 
      }
      catch (err){
        //doing nothing :D 
      }
    }

    tootHorn(); 

  }
);
}