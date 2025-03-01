import { fetchData } from "./common.js";
import { setLoading } from "./main.js";

const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
const topic = queryParams.get('topic');

const presentationHeader = document.getElementById('presentation-header');
const presentationSubheader = document.getElementById('presentation-subheader');
const presentationContents = document.getElementById('presentation-contents');


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

const displayPresentation = ({ title, image, contents, datePublished }) => {
    if (!presentationHeader || !presentationContents) return;
    // Clear previous content
    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${image}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;

    presentationSubheader.innerHTML = `
        <div class="flex items-center">
            <img class="mr-2" src="./assets/images/icons/calendar.svg" alt="Share">
            <time class="text-[#6b6b6b] text-base">${new Date(datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
        </div>
        <div class="flex items-center">
        <button id="speak" class="cursor-pointer" aria-label="Play/Pause">
            <img class="w-[22px] play" src="./assets/images/icons/play-circle.svg" alt="Play">
            <img class="w-[22px] pause hidden" src="./assets/images/icons/pause-circle.svg" alt="Pause">
        </button>
        </div>
    `;

    // Clear previous contents
    presentationContents.innerHTML = '';

    contents.forEach(content => {
        const p = document.createElement('p');
        p.className = 'text-[#242424] text-lg text-justify pb-6 leading-7 lg:text-xl lg:leading-8';
        p.innerText = content;
        presentationContents.appendChild(p);
    });
};



// Display conversation in the UI
const displayConversation = ({ title, img, contents, datePublished }) => {

    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${img}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;
    console.log(datePublished)

    presentationSubheader.innerHTML = `
        <div>
            <time class="text-[#6b6b6b] text-base">${new Date(datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
        </div>
        <div class="flex items-center">
        <button class="mr-6 cursor-pointer" aria-label="Share">
            <img src="./assets/images/icons/share.svg" alt="Share">
        </button>
        <button id="speak" class="cursor-pointer" aria-label="Play/Pause">
            <img class="w-[22px] play" src="./assets/images/icons/play-circle.svg" alt="Play">
            <img class="w-[22px] pause hidden" src="./assets/images/icons/pause-circle.svg" alt="Pause">
        </button>
        </div>
    `;

    const createCard = document.createElement('div');
    createCard.className = 'mb-8';
    contents.forEach((conten) => {
        const subCard = createConversationCard(conten)
        createCard.appendChild(subCard)
    });
    presentationContents.appendChild(createCard)
}

const createConversationCard = ({ name, text }) => {
    const presentationCard = document.createElement('p');
    presentationCard.className = "flex gap-6 mb-1"
    presentationCard.innerHTML = `
        <strong class="min-w-fit text-lg">${name} :</strong>
        <span class="text-lg">${text}</span>
    `;
    return presentationCard
}







/* daily use sentences template start */
// Display sentences in the UI
function displayDailyUseSentences({ title, img, contents, datePublished }) {

    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${img}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;

    presentationSubheader.innerHTML = `
        <div>
            <time class="text-[#6b6b6b] text-base">${new Date(datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
        </div>
        <div class="flex items-center">
        <button class="mr-6 cursor-pointer" aria-label="Share">
            <img src="./assets/images/icons/share.svg" alt="Share">
        </button>
        <button id="speak" class="cursor-pointer" aria-label="Play/Pause">
            <img class="w-[22px] play" src="./assets/images/icons/play-circle.svg" alt="Play">
            <img class="w-[22px] pause hidden" src="./assets/images/icons/pause-circle.svg" alt="Pause">
        </button>
        </div>
    `;

    contents.forEach((content) => {
        const createNiyatCard = createDailyUseSentencesCard(content);
        presentationContents.appendChild(createNiyatCard)
    })



}
// Create a presentation card element
const createDailyUseSentencesCard = ({ icon, text }) => {
    const presentationCard = document.createElement('div');
    presentationCard.className = "flex gap-3 items-start mb-2.5"
    presentationCard.innerHTML = `
        <span class="min-w-fit lg:text-lg">${icon}</span>
        <div class="flex flex-col">
            <p class="font-medium lg:text-lg">${text}</p>
        </div>
    `;
    return presentationCard
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


/* const formattedDate = new Date("2024-11-07").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

console.log(formattedDate); // Output: "Nov 7, 2024" */