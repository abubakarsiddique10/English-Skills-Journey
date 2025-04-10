
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

    // Early return if elements do not exist
    if (!vocabularyHeader || !vocabularyContainer || !metadata || !vocabularyList) {
        console.warn("Missing required data or DOM elements.");
        return;
    }

    // Clear existing content before appending new data
    vocabularyHeader.innerHTML = '';

    // Create header element
    const headerTitle = document.createElement('h1');
    headerTitle.classList.add('text-3xl', 'md:text-4xl', 'lg:text-5xl', 'font-bold', 'pb-4', 'md:pb-6', 'leading-tight');
    headerTitle.textContent = metadata.title;

    // Create banner image element
    const bannerImage = document.createElement('img');
    bannerImage.src = metadata.bannerImage;
    bannerImage.alt = 'Vocabulary Banner';
    bannerImage.classList.add('border', 'border-[#4755691a]', 'object-cover');
    bannerImage.loading = "lazy"; // Lazy loading for better performance

    vocabularyHeader.appendChild(headerTitle);
    vocabularyHeader.appendChild(bannerImage);

    vocabularyContainer.innerHTML = ''; // Clear previous content

    // Create a fragment for better DOM performance
    const fragment = document.createDocumentFragment();
    vocabularyList.forEach(vocabulary => {
        fragment.appendChild(createVocabulariesCard(vocabulary));
    });

    // Append the fragment to the container
    vocabularyContainer.appendChild(fragment);
};

const createVocabulariesCard = ({ word, imagePath, exampleSentence }) => {
    const vocabularyCard = document.createElement('div');
    vocabularyCard.classList.add('h-full', "sm:min-h-[202px]", 'flex', 'rounded-md', 'sm:border', 'border-[#F0F1F3]');
    vocabularyCard.title = `Click for details about ${word}`;

    // Create div element
    const div = document.createElement('div');
    div.classList.add('px-3', 'pt-8', 'pb-4', 'flex', 'flex-col', 'items-center', 'w-full');

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
    exampleText.classList.add('mt-1', 'text-sm', 'text-center', 'first-letter:capitalize');
    exampleText.textContent = exampleSentence;

    // Append elements
    wordContainer.appendChild(wordText);
    wordContainer.appendChild(pronounceButton);
    div.appendChild(image);
    div.appendChild(wordContainer);
    div.appendChild(exampleText);
    vocabularyCard.appendChild(div);

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
