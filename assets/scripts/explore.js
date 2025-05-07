// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO

  //populate Voice List: code adapted closely from MDN Speech Synthesis docs 

  function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      return;
    }
  
    const voices = speechSynthesis.getVoices();
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      document.getElementById("voice-select").appendChild(option);
    }
  }

speechSynthesis.addEventListener("voiceschanged", function (event){
  populateVoiceList(); 
});

 //speak text that is typed into "Text to speak here" input box
 const textToSpeakBox = document.getElementById("text-to-speak")
 let speech = ""; 

 textToSpeakBox.addEventListener("selectionchange", function (event) {
 speech = event.target.value; 
 curUtterance.text = speech; 
 })
//make sure voice is updated with every new selection 
let curUtterance = new SpeechSynthesisUtterance(); 
const pressToTalkBtn = document.querySelector("button"); 
const smilingFriend = document.querySelector("img")
const smilingFriendPath = "assets/images/smiling.png"
const speakingFriendPath = "assets/images/smiling-open.png"

pressToTalkBtn.addEventListener("click", function(){
  
  speechSynthesis.speak(curUtterance); 
})

curUtterance.addEventListener("start", function(){
  smilingFriend.src = speakingFriendPath; 
})

curUtterance.addEventListener("end", function() {
  smilingFriend.src = smilingFriendPath; 
})
  
}