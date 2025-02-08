
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";



/* const getCategoryInHTML = document.querySelector('.categories');
getCategoryInHTML.innerHTML = category */

let allData = null;

async function getVocabulary() {

    setLoading(true);
    const url = `././assets/data/vocabulary/vocabulary.json`;
    try {
        const vocabularies = await fetchData(url);
        const { categories, vocabulary_data } = vocabularies
        const allVocabularies = vocabulary_data.map(category => category.vocabularies).flat();
        displayTag(categories)
        displayVocabularies(allVocabularies);
        allData = allVocabularies;
        activeFunction(allVocabularies)
        setLoading(false);
    } catch (error) {
        console.error(error)
    }

}
getVocabulary();


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
                <img class="w-5 pronounce" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm first-letter:capitalize">${sentence}</span>
        </button>
    `;
    return vocabularyCard
}



// display tags
const displayTag = (contents) => {
    const tags = document.getElementById('tags');
    contents.forEach((content, index) => {
        const button = document.createElement('button');
        button.className = `filter-button font-inter text-left py-3 px-4 capitalize flex items-center space-x-1.5 block border-b cursor-pointer border-white lg:border-white ${index == 0 ? "active" : ""}`
        button.innerHTML = `
            <img class="max-w-4 inline-block" src="./assets/images/tags/${content}.png" alt="">
            <span class="capitalize text-sm">${content}</span>
        `;
        tags.appendChild(button);
    })
    // activeFunction()
}

// Handle tag filtering
function handleTagClick(event) {
    const button = event.target.closest('.filter-button');
    if (button) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        button.classList.add('active');

        const buttonText = button.innerText.toLowerCase();
        const filterData = buttonText === "all" ? allData : allData.filter((data) => data.tags === buttonText);
        displayVocabularies(filterData)
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



function activeFunction(allVocab) {
    if (!category) return; // Early exit if no category

    const lowerCaseCategory = category.toLowerCase();
    const allButtons = document.querySelectorAll('.filter-button');

    const filterData = lowerCaseCategory === "all" ? allData : allData.filter((data) => data.tags === lowerCaseCategory);
    displayVocabularies(filterData)

    allButtons?.forEach((button) => {
        const buttonText = button.innerText?.toLowerCase();
        button.classList.toggle
        button.classList.toggle('active', buttonText === lowerCaseCategory);
    });

}



