let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.8;
    text_speak.pitch = 1.1;
    text_speak.volume = 1;
    text_speak.lang = "ur-pk";
    window.speechSynthesis.speak(text_speak);
}

function greeting(){
    let day = new Date();
    let hours = day.getHours();

    if(hours>=0 && hours<12){
        speak("Good Morning Mr.ZR");
        
    }else if(hours>=12 && hours< 16){
        speak("Good Afternoon Mr.ZR");
    }
    else if(hours>=16 && hours<20){
        speak("Good Evening Mr.ZR");
    }else{
        speak("Good Night Mr. ZR");
    }
}

window.addEventListener('load', ()=> {
    greeting();
});

let speechRecongnition = window.SpeechRecognition;
let recognition = new speechRecongnition();
recognition.onresult=(event)=>{
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click",()=>{
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
})

function takeCommand(message){
    btn.style.display = "flex";
    voice.style.display = "none";
    if(message.includes("hello")){
        speak("Hello Mr. ZR how can I help you?");
    }

    else if(message.includes("who are you")||message.includes("hu r u")){
        speak("I am Sparky a virtual assistant created by Mr. ZR");
    }
    else if(message.includes("ok")||message.includes("okay")){
        speak("thank you for talking to me tell me whats your next move")
    }
    else if(message.includes("youtube")){
        speak("ok sir You tube is openning");
        window.open("https://youtube.com/", "_blank");
    }
    else if(message.includes("google")){
        speak("ok sir google is openning ")
        window.open("https://google.com/", "_blank");
    }
    else if(message.includes("microsoft chat ")){
    speak("ok sir it is opening");
    window.open("https://m365.cloud.microsoft/chat?fromCode=cmmtg6p9vp9&auth=2");
    }
    else if(message.includes("whatsapp")){
    speak("ok sir whatsapp is opening");
    window.open("whatsapp://");
    }
    else if(message.includes("calculator")){
    speak("ok sir calculator is opening");
    window.open("calculator://");
    }
    else if(message.includes("time")){
    let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric",second:"numeric"});
    speak(time);
    }
    else if(message.includes("date")){
    let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"});
    speak(date);
    }
    else{
        let finalResult = "This is what I found on Internet regarding to" + message.replace("eve","")
        speak(finalResult);
        window.open(`https://www.google.com/search?q= ${message.replace("ok","")}`,"_blank");
    }
}
