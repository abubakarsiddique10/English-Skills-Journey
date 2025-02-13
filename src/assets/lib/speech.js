// Initialize Speech Synthesis
const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();
utterance.rate = 0.7;

// Function to load and set the best available voice
function setVoice() {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Choose an English voice if available; otherwise, use the first voice
        utterance.voice = voices.find(voice => voice.lang.startsWith("en")) || voices[0];

        // Remove event listener after setting the voice (prevents multiple calls)
        speechSynthesis.onvoiceschanged = null;
    } else {
        console.error("No voices available.");
    }
}

// Ensure voices are loaded before setting
if (speechSynthesis.getVoices().length > 0) {
    setVoice(); // If voices are already available, set them immediately
} else {
    speechSynthesis.onvoiceschanged = setVoice;
}

// Function to handle Text-to-Speech
function textToSpeech(text) {
    if (!text.trim()) return; // Prevent speaking empty text
    speechSynthesis.cancel(); // Stop any ongoing speech before starting new
    utterance.text = text;
    speechSynthesis.speak(utterance);
}

export { textToSpeech };
