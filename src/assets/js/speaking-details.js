const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get('category');
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";

let allData = null;

// Fetch presentation data and initialize the display
async function getPresentation() {
    setLoading(true)
    const url = `././assets/data/speaking/${category}.json`;
    try {
        const response = await fetchData(url);
        if (category === "conversation") {
            displayConversation(response[1]);
            allData = response[1];
            displayTag(response[0]);
            setLoading(false)
        } else if (category === "speakingtopics" || category === "presentation") {
            displayPresentation(response[1]);
            allData = response[1];
            displayTag(response[0]);
            setLoading(false)
        } else if (category === "dailyusesentences") {
            displayDailyUseSentences(response[1]);
            allData = response[1];
            displayTag(response[0]);
            setLoading(false)
        }
    } catch (error) {
        console.error(error)
    }
}




/* presentations template start */
// Display presentations in the UI
const displayPresentation = (presentation) => {
    const contentWrapper = document.getElementById('content_wrapper');
    contentWrapper.className = "mt-12 lg:mt-20 lg:flex flex-row-reverse justify-evenly gap-10 w-full max-w-[728px] lg:max-w-full mx-auto";
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = "";
    const innerContainer = document.createElement('div');
    innerContainer.className = "w-full max-w-[728px] mx-auto lg:mx-left  lg:mt-0"
    /* detailsContainer.innerHTML = ""; */
    presentation.forEach(item => {
        const presentationCardElement = createPresentationCard(item);
        innerContainer.appendChild(presentationCardElement)
    });
    detailsContainer.appendChild(innerContainer);
}

// Create a presentation card element
const createPresentationCard = ({ title, subtitle, content, id }) => {
    const truncatedContent = subtitle.length > 300 ? subtitle.slice(0, 300) : subtitle;
    const presentationCard = document.createElement('article');
    presentationCard.className = "py-6 border-b w-full article";
    presentationCard.innerHTML = `
        <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold capitalize">${title}</h2>
            <div>
                <button id="speak" data-id='${id}'>
                    <img class="w-[22px] play" src="./assets/images/icons/play-circle.svg" alt="">
                    <img class="w-[22px] pause hidden" src="./assets/images/icons/pause-circle.svg" alt="">
                </button>
            </div>
        </div>
        <div class="text-[#242424] text-lg leading-7 lg:text-xl lg:leading-8">
            <p>${truncatedContent}</p>
            <div class="hidden space-y-5">${content}</div>
            <button class="presentationBtn text-[#108a00] lg:text-lg">...Read more</button>
        </div>
    `;
    return presentationCard
}

// Add event listeners for "Read more/less" buttons using event delegation
const addReadMoreEventListeners = () => {
    const presentationContainer = document.getElementById('details');
    presentationContainer.addEventListener('click', (event) => {

        if (event.target.classList.contains('presentationBtn')) {
            const button = event.target;
            const previewContent = button.previousElementSibling;
            const hiddenContent = button.previousElementSibling.previousElementSibling;

            const isContentHidden = previewContent.classList.contains('hidden');
            button.innerHTML = isContentHidden ? "Read less" : "...Read more";
            previewContent.classList.toggle('hidden');
            hiddenContent.classList.toggle('hidden');
        }
    })
}
addReadMoreEventListeners()
/* presentations template end */





/* conversation template start */
// Display conversation in the UI
const displayConversation = (conversation) => {
    const contentWrapper = document.getElementById('content_wrapper');
    contentWrapper.className = "mt-12 lg:mt-24 lg:flex flex-row-reverse justify-evenly gap-10 w-full max-w-[728px] lg:max-w-full mx-auto";
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = "";
    const innerContainer = document.createElement('div');
    innerContainer.className = "lg:mx-left space-y-8 mt-4 lg:mt-0"
    conversation.forEach(({ title, img, contents }) => {
        const categoryCard = document.createElement('div');
        // create head
        const headingTwo = document.createElement('h2');
        headingTwo.className = 'text-2xl font-inter font-semibold mb-2 first-letter:uppercase';
        headingTwo.innerText = title;
        categoryCard.appendChild(headingTwo);
        // create image
        /* const image = document.createElement('img');
        image.className = 'mb-5 w-[400px]';
        image.src = img;
        categoryCard.appendChild(image); */

        // create dialouge dive
        const presentationCard = document.createElement('div');
        presentationCard.classList = "space-y-1"
        categoryCard.appendChild(presentationCard)
        contents.forEach((content) => {
            const createNiyatCard = createConversationCard(content);
            presentationCard.appendChild(createNiyatCard);
        })
        innerContainer.appendChild(categoryCard)
    });
    detailsContainer.appendChild(innerContainer)
}

// Create a presentation card element
const createConversationCard = ({ name, text }) => {
    const presentationCard = document.createElement('p');
    presentationCard.className = "flex gap-6"
    presentationCard.innerHTML = `
        <strong class="min-w-fit text-lg">${name} :</strong>
        <span class="text-lg">${text}</span>
    `;
    return presentationCard
}
/* conversation template end */




/* daily use sentences template start */
// Display sentences in the UI

function displayDailyUseSentences(conversation) {
    const contentWrapper = document.getElementById('content_wrapper');
    contentWrapper.className = "mt-12 lg:mt-24 mb-5 lg:flex flex-row-reverse justify-evenly gap-10 w-full max-w-[728px] lg:max-w-full mx-auto";
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = "";
    const innerContainer = document.createElement('div');
    innerContainer.className = "lg:mx-left space-y-8 mt-8 lg:mt-0"
    conversation.forEach(({ title, contents }) => {
        const categoryCard = document.createElement('div');
        // create head
        const headingTwo = document.createElement('h2');
        headingTwo.className = 'text-2xl font-semibold mb-2.5 first-letter:uppercase';
        headingTwo.innerText = title;
        categoryCard.appendChild(headingTwo);

        // create dialouge div
        const presentationCard = document.createElement('div');
        presentationCard.classList = "space-y-2.5"
        categoryCard.appendChild(presentationCard)
        contents.forEach((content) => {
            const createNiyatCard = createDailyUseSentencesCard(content);
            presentationCard.appendChild(createNiyatCard);
        })
        innerContainer.appendChild(categoryCard)
    });
    detailsContainer.appendChild(innerContainer)
}
// Create a presentation card element
const createDailyUseSentencesCard = ({ icon, text, example }) => {
    const presentationCard = document.createElement('div');
    presentationCard.className = "flex gap-3 items-start"
    presentationCard.innerHTML = `
        <span class="min-w-fit lg:text-lg">${icon}</span>
        <div class="flex flex-col">
            <p class="font-medium lg:text-lg">${text}</p>
        </div>
    `;
    return presentationCard
}
//<p class="text-5xl">• ${example}</p>


// display tags
const displayTag = (contents,) => {
    const tags = document.getElementById('tags');
    tags.className = "bg-white border-b lg:border-b-0 sticky top-14 lg:top-24 flex lg:mx-0 lg:block overflow-auto lg:pt-0 w-full lg:max-w-[368px] lg:border-l lg:h-full lg:pl-10 lg:min-h-10"
    contents.forEach((content, index) => {
        const button = document.createElement('button');
        button.className = `filter-button font-inter text-left py-2 lg:py-3 px-4 capitalize flex items-center space-x-1.5 block border-b border-white lg:border-white lg:w-full ${index == 0 ? "active" : ""}`
        button.innerText = content;
        tags.appendChild(button);
    })
}

// Handle tag filtering
function handleTagClick(event) {
    if (event.target.matches('button')) {
        const allButtons = document.querySelectorAll('.filter-button');
        allButtons.forEach((button) => button.classList.remove('active'));
        event.target.classList.add('active');

        const buttonText = event.target.innerText.toLowerCase();
        const filterData = buttonText === "all" ? allData : allData.filter((data) => data.tag === buttonText);

        if (category === "conversation") {
            displayConversation(filterData);
        } else if (category === "presentation") {
            displayPresentation(filterData);
        } else if (category === "dailyusesentences") {
            displayDailyUseSentences(filterData)
        }
    }
}

// Add event listener for tag clicks
const tags = document.getElementById('tags');
tags.addEventListener('click', handleTagClick);




const speechSynthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();
// Wait for the voices to be loaded
speechSynthesis.onvoiceschanged = () => {
    // Check if voices are available
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Select a voice (for example, the first one)
        utterance.voice = voices[0];

        // change the voice rate
        utterance.rate = 0.9;
    } else {
        console.error("No voices available.");
    }
};

function speak() {
    const presentationContainer = document.getElementById('details');
    presentationContainer.addEventListener('click', (event) => {
        const speakButton = event.target.closest('#speak');
        const isPlay = event.target.classList.contains('play');
        const isPause = event.target.classList.contains('pause');
        const dataId = speakButton?.dataset.id;
        ;

        if (isPlay) {
            event.target.classList.add('hidden');
            event.target.nextElementSibling.classList.remove('hidden');

            speechSynthesis.cancel();

            const allPause = document.querySelectorAll('.pause');
            const allPlay = document.querySelectorAll('.play');
            allPlay.forEach((element) => element.classList.remove('hidden'))
            allPause.forEach((element) => element.classList.add('hidden'))

            event.target.classList.add('hidden')
            event.target.nextElementSibling.classList.remove('hidden');
            const findTextContent = allData.find(({ id }) => id == dataId);
            const removeParagraphTags = findTextContent.content.replace(/<\/?p>/g, '');
            utterance.text = removeParagraphTags
            speechSynthesis.speak(utterance);


        } else if (isPause) {
            event.target.classList.add('hidden');
            event.target.previousElementSibling.classList.remove('hidden');

            speechSynthesis.cancel();
        }
    })
}
speak()




/* conversation template end */

// Initialize the application
document.addEventListener('DOMContentLoaded', getPresentation)







/* // Wait for the voices to be loaded
speechSynthesis.onvoiceschanged = () => {
    // Check if voices are available
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        // Select a voice (for example, the first one)
        utterance.voice = voices[0];

        // change the voice rate
        utterance.rate = 1;
    } else {
        console.error("No voices available.");
    }
};


speechSynthesis.speak(utterance);



button.addEventListener('click', () => {
    speechSynthesis.speak(utterance);

});
 */


