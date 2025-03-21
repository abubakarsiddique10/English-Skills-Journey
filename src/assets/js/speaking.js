import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { displayConversation, displayPresentation, displayDailyUseSentences } from "./components.js";


// select category
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
const topic = queryParams.get('topic');


// Fetch and display presentation data
async function getPresentation(category) {

    setLoading(true);
    const url = `././assets/data/speaking/${category}.json`;

    try {
        const response = await fetchData(url);
        const topicName = response.find((content) => content.topicName === topic);

        if (topicName) {
            if (category === "speakingtopics") {
                displayPresentation(topicName);
            } else if (category === "conversation") {
                displayConversation(topicName)
            } else if (category === "dailyusesentences") {
                displayDailyUseSentences(topicName)
            }
        } else {
            throw new Error('Topic not found');
        }
    } catch (error) {
        console.log(error)
        presentationContents.innerHTML = `<p class="error-message">Failed to load presentation. Please try again later.</p>`;
    } finally {
        setLoading(false);
    }
}


/* Text-to-Speech Initialization */
const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();
utterance.rate = 0.9; // Adjust speech rate

let isPaused = false; // Track if speech is paused
let charIndex = 0; // Track where speech was paused
let textToSpeak = ""; // Store full text

// Select a suitable voice once voices are available
function setVoice() {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices.find(voice => voice.lang.startsWith("en")) || voices[0];
    } else {
        console.error("No voices available.");
    }
}

// Ensure voices are loaded before setting
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = setVoice;
}

// Event listener to track progress and store pause position
utterance.onboundary = (event) => {
    charIndex = event.charIndex; // Save the position of the spoken text
};

// Function to handle speech synthesis play/pause
function handleSpeech(event) {
    const target = event.target;
    const isPlay = target.classList.contains('play');
    const isPause = target.classList.contains('pause');

    if (isPlay) {
        // Reset all play/pause buttons
        document.querySelectorAll('.play').forEach(btn => btn.classList.remove('hidden'));
        document.querySelectorAll('.pause').forEach(btn => btn.classList.add('hidden'));

        // Toggle current button
        target.classList.add('hidden');
        target.nextElementSibling.classList.remove('hidden');

        if (isPaused) {
            // Resume from paused position
            utterance.text = textToSpeak.substring(charIndex);
            isPaused = false;
        } else {
            // Start fresh
            textToSpeak = document.getElementById('presentation-contents').innerText;
            charIndex = 0;
            utterance.text = textToSpeak;
        }

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);

    } else if (isPause) {
        target.classList.add('hidden');
        target.previousElementSibling.classList.remove('hidden');

        // Pause speech
        isPaused = true;
        speechSynthesis.cancel();
    }
}
// Attach event listener once
document.getElementById('presentation-subheader')?.addEventListener('click', handleSpeech);

// Stop speech when leaving the page
window.addEventListener("beforeunload", () => {
    speechSynthesis.cancel();
});

/* Text-to-Speech end */

// Initialize the application
document.addEventListener('DOMContentLoaded', getPresentation(category))
