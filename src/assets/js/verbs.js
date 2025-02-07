import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";


let allData = null;
// Load vocabularies for a given category
async function getVocabulary() {
    setLoading(true);
    const url = `././assets/data/verb/verbs.json`;
    try {
        const response = await fetchData(url);
        const { categories, verb_data } = response;
        const allVerbs = verb_data.map(category => category.verbs).flat();
        displayVerbs(allVerbs);
        allData = allVerbs;
        // displayTag(categories);
        setLoading(false)
    } catch (error) {
        console.error(error)
    }
}
getVocabulary();


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
    verbCard.title = `Click for details about ${word}`;
    verbCard.innerHTML = `
        <button class="pt-0 flex flex-col items-center w-full" aria-label="Details about camel">
            <img id="svg" class="w-[100px] bg-transparent" src="./assets/images/verbs/${image}.png" alt="${image}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm text-center first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return verbCard
}



// display tags
/* const displayTag = (contents) => {
    const tags = document.getElementById('tags');
    tags.className = `bg-white pt-6 lg:pt-8 !pb-4 flex overflow-auto w-full space-x-3`
    contents.forEach((content, index) => {
        const button = document.createElement('button');
        button.className = `filter-button font-inter text-left py-1 px-3 pr-3 rounded-md capitalize border flex items-center space-x-1.5 block ${index == 0 ? "active" : ""}`
        button.innerHTML = `
            <span class="capitalize text-sm">${content}</span>
        `;
        tags.appendChild(button);
    })
} */

// Handle tag filtering
function handleTagClick(event) {
    const button = event.target.closest('.filter-button');
    if (button) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');

        const buttonText = button.innerText.toLowerCase();
        const filterData = buttonText === "all" ? allData : allData.filter((data) => data.tags === buttonText);
        displayVerbs(filterData)
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