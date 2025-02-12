const queryParams = new URLSearchParams(window.location.search);
const topic = queryParams.get('topic');
import { fetchData } from "./common.js";
import { setLoading } from "./main.js";

// Fetch presentation data and initialize the display
async function getPresentation(category) {
    setLoading(true)
    const url = `././assets/data/speaking/${category}.json`;
    try {
        const response = await fetchData(url)
        const topicName = response.find((content) => content.topicName === topic);
        displayPresentation(topicName);
        setLoading(false)
    } catch (error) {
        console.error(error)
    }
}

const displayPresentation = ({ title, image, contents }) => {
    const presentationHeader = document.getElementById('presentation-header');
    const presentationSubheader = document.getElementById('presentation-subheader');
    const presentationContents = document.getElementById('presentation-contents');
    if (!presentationHeader || !presentationContents) return;

    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${image}" class="border border-[#4755691a] object-cover" alt="">
    `;

    presentationSubheader.innerHTML = `
        <button>
            <img src="./assets/images/icons/share.svg" alt="">
        </button>
        <button id="speak" data-id="1">
            <img class="w-[22px] play cursor-pointer" src="./assets/images/icons/play-circle.svg" alt="">
            <img class="w-[22px] pause hidden cursor-pointer" src="./assets/images/icons/pause-circle.svg" alt="">
        </button>
    `
    contents.forEach((content) => {
        const p = document.createElement('p');
        p.className = 'text-[#242424] text-lg pb-6 text-[#242424] leading-7 lg:text-xl lg:leading-8'
        p.innerText = content;
        presentationContents.appendChild(p)
    })
};





function speak() {
    const presentationContainer = document.getElementById('presentation-contents');

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



// Initialize the application
document.addEventListener('DOMContentLoaded', getPresentation("speakingtopics"))
