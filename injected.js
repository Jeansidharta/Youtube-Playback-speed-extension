function urlChangeEvent(){
   if(location.href.indexOf("/watch") == -1){
      chrome.runtime.sendMessage({"message": "inactivate_icon"});
   }
   else{
      chrome.runtime.sendMessage({"message": "activate_icon"});
   }
}
urlChangeEvent();

{
   let lastURL = location.href;
   setInterval(()=>{
      if(location.href != lastURL){
         urlChangeEvent();
         lastURL = location.href;
      }
   }, 1000);
}

let video;

function setSpeed(speed){
   if(speed >= 17 || speed < 0){
      console.log(`invalid speed ${speed}`);
      return;
   }
   video.playbackRate = speed;
}


window.addEventListener("load", ()=>{
   video = document.getElementsByTagName("video")[0];
   let intervalHandler = setInterval(()=>{
      if(video !== undefined){
         clearInterval(intervalHandler);
         chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
            if(message.message == "set playback speed"){
               setSpeed(message.speed);
            }
            else if(message.message == "get playback speed"){
               sendResponse({"speed" : video.playbackRate});
            }
         });
         return;
      }
      video = document.getElementsByTagName("video")[0];
   }, 100);
});