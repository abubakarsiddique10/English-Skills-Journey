
const presentationHeader = document.getElementById('presentation-header');
const presentationSubheader = document.getElementById('presentation-subheader');
const presentationContents = document.getElementById('presentation-contents');


// Display conversation in the UI
const displayConversation = ({ title, img, contents, datePublished }) => {
    presentationHeader.innerHTML = `
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold pb-4 md:pb-6 leading-tight">${title}</h1>
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
        <span class="min-w-fit text-lg font-medium">${name} :</span>
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
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold pb-4 md:pb-6 leading-tight">${title}</h1>
        <img src="${img}" class="border border-[#4755691a] object-cover" alt="${title}">
    `;

    contents.forEach((content) => {
        const createNiyatCard = createDailyUseSentencesCard(content);
        presentationContents.appendChild(createNiyatCard)
    })
}

// Create a presentation card element
const createDailyUseSentencesCard = ({ icon, text, color }) => {
    const presentationCard = document.createElement('div');
    presentationCard.className = "flex gap-3 items-start mb-2.5"
    presentationCard.innerHTML = `
        <span class="min-w-fit text-lg size-3.5 rounded-full my-auto" style="background-color: ${color};"></span>
        <div class="flex flex-col">
            <p class="font-medium text-lg ">${text}</p>
        </div>
    `;
    return presentationCard
}

const createContentCard = ({ id, title, blogImg, }) => {
    const container = document.createElement('div')

    const link = document.createElement("a");
    link.href = `grammar.html?topic=${title.split(' ').join('-')}-${id}`

    const flexDiv = document.createElement("div");
    flexDiv.className = "flex sm:flex-col";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "border border-[#4755691a] rounded-lg mr-3 sm:mr-0";

    const img = document.createElement("img");
    img.src = blogImg
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


// export all functions
export { displayConversation, displayPresentation, displayDailyUseSentences, createContentCard }


