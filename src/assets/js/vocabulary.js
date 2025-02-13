
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";


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
getVocabulary(category);


// Display vocabularies in the UI
const displayVocabularies = ({ header, vocabularies }) => {
    const vocabularyHeader = document.getElementById('vocabulary-header');
    const vocabularyContainer = document.getElementById('vocabulary');

    if (!vocabularyHeader || !vocabularyContainer) return;

    vocabularyHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${header.title}</h1>
        <img src="${header.image}" class="border border-[#4755691a] object-cover" alt="">
    `;
    vocabularyContainer.innerHTML = ""; // Clear previous content

    // Create a fragment to improve DOM performance
    const fragment = document.createDocumentFragment();
    vocabularies.forEach(vocabulary => {
        fragment.appendChild(createVocabulariesCard(vocabulary));
    });
    vocabularyContainer.appendChild(fragment);
};


// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.className = 'h-full flex rounded-md sm:border border-[#F0F1F3]';
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



