import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { textToSpeech } from "../lib/speech.js";
import { formatTimestampToDate } from "../lib/format-date.js";

const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("topic");

if (category) {
    getVocabulary(category);
} else {
    console.warn("No category specified in the query parameters.");
}



// Load vocabularies for a given category
async function getVocabulary(category) {
    setLoading(true);
    const url = `././assets/data/verb/${category}.json`;
    try {
        const response = await fetchData(url);
        displayVerbs(response);
    } catch (error) {
        console.error(`Error fetching vocabulary for category "${category}":`, error);
    } finally {
        setLoading(false); // Ensure loading state resets even if an error occurs
    }
}


const displayVerbs = ({ header, verbs, recommends = [] }) => {
    if (!verbs?.length) return; // Ensure verbs exist before proceeding
    const verbHeader = document.getElementById("verb-header");
    const verbsContainer = document.getElementById("verb");
    const container = document.getElementById("recommends");

    if (!verbHeader || !verbsContainer) return;

    // Set header content safely
    verbHeader.innerHTML = ""; // Clear previous content

    // Create header element
    const headerTitle = document.createElement("h1");
    headerTitle.className = "text-3xl md:text-4xl lg:text-5xl font-bold pb-4 md:pb-6 leading-tight";
    headerTitle.textContent = header.title;

    // Create header image element
    const headerImage = document.createElement("img");
    headerImage.className = "border border-[#4755691a] object-cover";
    headerImage.src = header.image;
    headerImage.alt = `Illustration of ${header.title}`;
    headerImage.loading = "lazy";


    // description section start
    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'flex items-center gap-x-1.5 text-sm mt-5 mb-2';
    const dateLabel = document.createElement('span');
    dateLabel.className = 'font-medium';
    dateLabel.textContent = 'Posted on:';
    const time = document.createElement('time');
    time.className = 'text-nowrap';
    time.textContent = formatTimestampToDate(header.createdAt)
    dateWrapper.append(dateLabel, time);

    // Create and append subtitle and description
    const descriptionWrapper = document.createElement('div');
    const subtitle = document.createElement('h3');
    subtitle.className = "float-left mr-1 text-base lg:text-lg font-medium";
    const p = document.createElement('p');
    subtitle.innerText = header.subtitle;
    p.className = "text-base lg:text-lg";
    p.innerHTML = header.description;
    descriptionWrapper.appendChild(subtitle)
    descriptionWrapper.appendChild(p)
    // description section end


    // recommended cards start
    const recommendedTitle = document.getElementById('recommended-title');
    recommendedTitle.textContent = "Recommended Verbs";
    const cardFragment = document.createDocumentFragment();
    recommends.forEach(item => {
        const recommendCard = createRecommendedCard(item);
        cardFragment.appendChild(recommendCard);
    });
    container.appendChild(cardFragment);
    // recommended cards end


    verbHeader.append(headerTitle, headerImage, dateWrapper, descriptionWrapper);

    // Clear previous vocabulary list
    verbsContainer.innerHTML = "";

    // Use a document fragment to optimize rendering
    const fragment = document.createDocumentFragment();
    verbs.forEach(verb => fragment.appendChild(createVocabulariesCard(verb)));

    verbsContainer.appendChild(fragment);
};


const createVocabulariesCard = ({ word, image, sentence }) => {
    // Create main article element
    const verbCard = document.createElement("article");
    verbCard.className = "h-full flex rounded-md sm:border border-[#F0F1F3]";

    // Create button
    const div = document.createElement("div");
    div.className = "p-5 flex flex-col items-center w-full";

    // Create image element
    const img = document.createElement("img");
    img.className = "w-[100px] bg-transparent";
    img.src = image
    img.alt = `Illustration of ${word}`;
    img.loading = "lazy"; // Lazy loading for better performance

    // Create text container
    const textContainer = document.createElement("div");
    textContainer.className = "flex items-center mt-4 gap-1";

    // Create word span
    const wordSpan = document.createElement("span");
    wordSpan.className = "text-lg font-medium leading-6 capitalize text-center";
    wordSpan.textContent = word;

    // Create pronunciation icon
    const pronounceIcon = document.createElement("img");
    pronounceIcon.className = "w-5 pronounce cursor-pointer";
    pronounceIcon.src = "./assets/images/icons/volume_up.svg";
    pronounceIcon.title = "Click to hear pronunciation";
    pronounceIcon.alt = "pronounce";
    pronounceIcon.dataset.word = word; // Store word for event listener

    // Create sentence span
    const sentenceSpan = document.createElement("span");
    sentenceSpan.className = "mt-1 text-sm text-center first-letter:capitalize";
    sentenceSpan.textContent = sentence;

    // Assemble elements
    textContainer.appendChild(wordSpan);
    textContainer.appendChild(pronounceIcon);
    div.appendChild(img);
    div.appendChild(textContainer);
    div.appendChild(sentenceSpan);
    verbCard.appendChild(div);

    return verbCard;
};



// Create RecommendedCard Card
const createRecommendedCard = ({ image, title, url }) => {
    const container = document.createElement('div')

    const link = document.createElement("a");
    link.href = url;

    const flexDiv = document.createElement("div");
    flexDiv.className = "flex sm:flex-col";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "border border-[#4755691a] rounded-lg mr-3 sm:mr-0";

    const img = document.createElement("img");
    img.src = image
    img.alt = "fruit thumbnail";
    img.className = "rounded-lg w-full max-w-[150px] sm:max-w-full";

    imageWrapper.appendChild(img);

    const heading = document.createElement("h3");
    heading.className = "font-medium text-base sm:text-lg sm:mt-3 leading-6 flex-1";
    heading.textContent = title

    flexDiv.appendChild(imageWrapper);
    flexDiv.appendChild(heading);

    link.appendChild(flexDiv);
    container.appendChild(link);
    return container
}



document.addEventListener('DOMContentLoaded', () => {
    const verb = document.getElementById('verb');

    if (!verb) {
        console.warn("Element with ID 'verb' not found.");
        return;
    }

    verb.addEventListener('click', (e) => {
        const pronounceBtn = e.target.closest('.pronounce'); // Ensures only elements with .pronounce class trigger
        if (!pronounceBtn) return;

        const textElement = pronounceBtn.previousElementSibling;
        if (!textElement) {
            console.warn("No text element found before the button.");
            return;
        }
        let text = textElement.innerText.trim();
        if (!text) {
            console.warn("Text is empty or invalid.");
            return;
        }
        textToSpeech(text);
    });
});

