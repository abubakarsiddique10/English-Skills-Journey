
// text to speech
const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance;

// Wait for the voices to be loaded
speechSynthesis.onvoiceschanged = () => {
    // Check if voices are available
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Select a voice (for example, the first one)
        utterance.voice = voices[0];
        // change the voice rate
        utterance.rate = 0.7;
    } else {
        console.error("No voices available.");
    }
};

function textToSpeech(text) {
    utterance.text = text;
    speechSynthesis.speak(utterance);
    utterance.text = "";
}





export { textToSpeech }



