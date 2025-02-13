const queryParams = new URLSearchParams(window.location.search);
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";
const category = queryParams.get('verbs');


// Load vocabularies for a given category
async function getVocabulary(category) {
    setLoading(true);
    const url = `././assets/data/verb/${category}.json`;
    try {
        const response = await fetchData(url);
        displayVerbs(response)
        setLoading(false)
    } catch (error) {
        console.error(error)
    }
}
getVocabulary(category);

// Display vocabularies in the UI
const displayVerbs = ({ header, verbs }) => {
    const verbHeader = document.getElementById('verb-header');
    const verbsContainer = document.getElementById('verb');

    if (!verbHeader || !verbsContainer) return;
    verbHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${header.title}</h1>
        <img src="${header.image}" class="border border-[#4755691a] object-cover" alt="">
    `;

    verbsContainer.innerHTML = "";
    // Create a fragment to improve DOM performance
    const fragment = document.createDocumentFragment();

    verbs.forEach(verb => {
        fragment.appendChild(createVocabulariesCard(verb));
    });
    verbsContainer.appendChild(fragment);
}

// Create a vocabulary card element: card-
const createVocabulariesCard = ({ word, image, sentence }) => {
    const verbCard = document.createElement('article');
    verbCard.className = 'h-full flex rounded-md sm:border border-[#F0F1F3]';
    verbCard.innerHTML = `
        <button class="p-5 flex flex-col items-center w-full" aria-label="Details about camel">
            <img id="svg" class="w-[100px] bg-transparent" src="./assets/images/verbs/${image}.png" alt="${image}">
            <div class="flex items-center mt-4 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce cursor-pointer" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm text-center first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return verbCard
}



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
