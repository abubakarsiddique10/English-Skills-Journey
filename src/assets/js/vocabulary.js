
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
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
}
getVocabulary(category);


// Display vocabularies in the UI
const displayVocabularies = ({ metadata, vocabularyList }) => {
    const vocabularyHeader = document.getElementById('vocabulary-header');
    const vocabularyContainer = document.getElementById('vocabulary');

    if (!vocabularyHeader || !vocabularyContainer) return;

    vocabularyHeader.innerHTML = `
        <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold pb-4 md:pb-6 leading-tight">${metadata.title}</h1>
        <img src="${metadata.bannerImage}" class="border border-[#4755691a] object-cover" alt="">
    `;
    vocabularyContainer.innerHTML = ""; // Clear previous content

    // Create a fragment to improve DOM performance
    const fragment = document.createDocumentFragment();
    console.log(vocabularyList)
    vocabularyList.forEach(vocabulary => {
        fragment.appendChild(createVocabulariesCard(vocabulary));
    });
    vocabularyContainer.appendChild(fragment);
};


// Create a vocabulary card element: card-
/* const createVocabulariesCard = ({ word, imagePath, exampleSentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.className = 'h-full flex rounded-md sm:border border-[#F0F1F3]';
    vocabularyCard.title = `Click for details about ${word}`;
    vocabularyCard.innerHTML = `
        <button class="px-3 pt-8 pb-4 flex flex-col items-center w-full">
            <img id="svg" class="w-16" src="${imagePath}" alt="${word}">
            <div class="flex items-center mt-5 gap-1">
                <span class="text-lg font-medium leading-6 capitalize text-center">${word}</span>
                <img class="w-5 pronounce cursor-pointer" src="./assets/images/icons/volume_up.svg" title="Click for pronounced" alt="pronounce">
            </div>
            <span class="mt-1 text-sm first-letter:capitalize">${exampleSentence}</span>
        </button>
    `;
    return vocabularyCard
} */

const createVocabulariesCard = ({ word, imagePath, exampleSentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.classList.add('h-full', "sm:min-h-[202px]", 'flex', 'rounded-md', 'sm:border', 'border-[#F0F1F3]');
    vocabularyCard.title = `Click for details about ${word}`;

    // Create button element
    const button = document.createElement('button');
    button.classList.add('px-3', 'pt-8', 'pb-4', 'flex', 'flex-col', 'items-center', 'w-full');

    // Create image element
    const image = document.createElement('img');
    image.classList.add('w-16');
    image.src = imagePath;
    image.alt = `Illustration of ${word}`;

    // Create word container
    const wordContainer = document.createElement('div');
    wordContainer.classList.add('flex', 'items-center', 'mt-5', 'gap-1');

    const wordText = document.createElement('span');
    wordText.classList.add('text-lg', 'font-medium', 'leading-6', 'capitalize', 'text-center');
    wordText.textContent = word;

    // Create pronunciation button
    const pronounceButton = document.createElement('img');
    pronounceButton.classList.add('w-5', 'pronounce', 'cursor-pointer');
    pronounceButton.src = './assets/images/icons/volume_up.svg';
    pronounceButton.alt = `Play pronunciation for ${word}`;
    pronounceButton.title = 'Click to hear pronunciation';
    pronounceButton.setAttribute('role', 'button');
    pronounceButton.setAttribute('aria-label', `Pronounce ${word}`);

    // Create example sentence
    const exampleText = document.createElement('span');
    exampleText.classList.add('mt-1', 'text-sm', 'first-letter:capitalize');
    exampleText.textContent = exampleSentence;

    // Append elements
    wordContainer.appendChild(wordText);
    wordContainer.appendChild(pronounceButton);
    button.appendChild(image);
    button.appendChild(wordContainer);
    button.appendChild(exampleText);
    vocabularyCard.appendChild(button);

    return vocabularyCard;
};



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



/* const formattedDate = new Date("2024-11-07").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

console.log(formattedDate); // Output: "Nov 7, 2024" */
