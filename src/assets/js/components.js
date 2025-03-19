
const presentationHeader = document.getElementById('presentation-header');
const presentationSubheader = document.getElementById('presentation-subheader');
const presentationContents = document.getElementById('presentation-contents');


// Display conversation in the UI
const displayConversation = ({ title, img, contents, datePublished }) => {
    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${img}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;

    const createCard = document.createElement('div');
    createCard.className = 'mb-8';
    contents.forEach((conten) => {
        const subCard = createConversationCard(conten)
        createCard.appendChild(subCard)
    });
    presentationContents.appendChild(createCard)
}
const createConversationCard = ({ name, text }) => {
    const presentationCard = document.createElement('p');
    presentationCard.className = "flex gap-6 mb-1"
    presentationCard.innerHTML = `
        <strong class="min-w-fit text-lg">${name} :</strong>
        <span class="text-lg">${text}</span>
    `;
    return presentationCard
}



// Display presentaion in the UI
const displayPresentation = ({ title, image, contents, datePublished }) => {
    if (!presentationHeader || !presentationContents) return;
    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${image}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;

    // presentation subheader start
    presentationSubheader.className = 'flex items-center justify-between mt-8 border-y border-[#4755691a] py-2 px-2';
    presentationSubheader.innerHTML = `
        <div class="flex items-center">
            <img class="mr-2" src="./assets/images/icons/calendar.svg" alt="Share">
            <time class="text-[#6b6b6b] text-base">${new Date(datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
        </div>
        <div class="flex items-center">
        <button id="speak" class="cursor-pointer" aria-label="Play/Pause">
            <img class="w-[22px] play" src="./assets/images/icons/play-circle.svg" alt="Play">
            <img class="w-[22px] pause hidden" src="./assets/images/icons/pause-circle.svg" alt="Pause">
        </button>
        </div>
    `;
    // presentation subheader end

    // Clear previous contents
    presentationContents.innerHTML = '';

    contents.forEach(content => {
        const p = document.createElement('p');
        p.className = 'text-[#242424] text-lg text-justify pb-6 leading-7 lg:text-xl lg:leading-8';
        p.innerText = content;
        presentationContents.appendChild(p);
    });
};



// Display sentences in the UI
function displayDailyUseSentences({ title, img, contents, datePublished }) {

    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold capitalize pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${img}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;

    contents.forEach((content) => {
        const createNiyatCard = createDailyUseSentencesCard(content);
        presentationContents.appendChild(createNiyatCard)
    })
}

// Create a presentation card element
const createDailyUseSentencesCard = ({ icon, text }) => {
    const presentationCard = document.createElement('div');
    presentationCard.className = "flex gap-3 items-start mb-2.5"
    presentationCard.innerHTML = `
        <span class="min-w-fit lg:text-lg">${icon}</span>
        <div class="flex flex-col">
            <p class="font-medium lg:text-lg">${text}</p>
        </div>
    `;
    return presentationCard
}


// export all functions
export { displayConversation, displayPresentation, displayDailyUseSentences }