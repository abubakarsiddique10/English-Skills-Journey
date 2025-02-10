
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";



/* const getCategoryInHTML = document.querySelector('.categories');
getCategoryInHTML.innerHTML = category */

let allData = null;

async function getVocabulary(category) {
    setLoading(true);
    const url = `././assets/data/vocabulary/${category}.json`;
    try {
        const vocabularies = await fetchData(url);
        displayVocabularies(vocabularies)
        setLoading(false);
    } catch (error) {
        console.error(error)
    }

}
getVocabulary("animals");


// Display vocabularies in the UI
const displayVocabularies = (vocabularies) => {
    const vocabularyContainer = document.getElementById('vocabulary');
    vocabularyContainer.innerHTML = "";
    vocabularies.forEach(vocabulary => {
        const vocabularyCardElement = createVocabulariesCard(vocabulary);
        vocabularyContainer.appendChild(vocabularyCardElement)
    });
}



// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.className = 'min-h-[160px] h-full flex rounded-md sm:border border-[#F0F1F3]';
    vocabularyCard.title = `Click for details about ${word}`;
    vocabularyCard.innerHTML = `
        <button class="px-3 pt-8 pb-4 flex flex-col items-center w-full">
            <img id="svg" class="w-16" src="./assets/images/vocabulary/${image}.png" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce cursor-pointer" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return vocabularyCard
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
    const vocabulary = document.getElementById('vocabulary');
    vocabulary.addEventListener('click', (e) => {
        const isTrue = e.target.classList.contains('pronounce');
        if (isTrue) {
            let text = e.target.previousElementSibling.innerText;
            textToSpeech(text)
        }
    });
});




