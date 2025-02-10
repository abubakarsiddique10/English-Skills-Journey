import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";


// Load vocabularies for a given category
async function getVocabulary(part) {
    setLoading(true);
    const url = `././assets/data/verb/${part}.json`;
    try {
        const response = await fetchData(url);
        displayVerbs(response)
        setLoading(false)
    } catch (error) {
        console.error(error)
    }
}
getVocabulary("part-1");

// Display vocabularies in the UI
const displayVerbs = (verbs) => {
    const verbsContainer = document.getElementById('verb');
    verbsContainer.innerHTML = "";
    verbs.forEach(verb => {
        const verbCardElement = createVocabulariesCard(verb);
        verbsContainer.appendChild(verbCardElement)
    });
}

// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const verbCard = document.createElement('article');
    verbCard.className = 'min-h-[160px] h-full flex';
    verbCard.innerHTML = `
        <button class="pt-0 flex flex-col items-center w-full" aria-label="Details about camel">
            <img id="svg" class="w-[100px] bg-transparent" src="./assets/images/verbs/${image}.png" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce cursor-pointer" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm text-center first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return verbCard
}


// Handle tag filtering
function handleTagClick(event) {
    const button = event.target.closest('.filter-button');
    if (button) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');
        const buttonText = button.getAttribute('data-type').toLowerCase();
        getVocabulary(buttonText);
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);


document.addEventListener('DOMContentLoaded', () => {
    const verb = document.getElementById('verb');
    verb.addEventListener('click', (e) => {
        const isTrue = e.target.classList.contains('pronounce');
        if (isTrue) {
            let text = e.target.previousElementSibling.innerText;
            textToSpeech(text)
        }
    });
});