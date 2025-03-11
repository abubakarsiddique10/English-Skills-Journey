import { createTags } from "./common.js";
import { setLoading } from "./main.js";

setLoading(true); // Show loading immediately

window.onload = () => {

    const tags = document.getElementById('tags');
    const cardsContainer = document.getElementById('category-cards');
    const cards = cardsContainer.querySelectorAll('a');

    const tagNames = ["All", "Animals", "Vegetables", "Fruits", "Jobs and Occupations", "Colors", "Body Parts", "Education", "Household Items", "Birds", "Vehicle & Transport", "Hello world", "Tools",];

    if (tags) {
        tagNames.forEach((tag, index) => {
            tags.appendChild(createTags(tag, index));
        });
    }

    function handleTagClick(event) {
        const button = event.target;
        if (!button.classList.contains('filter-button')) return;

        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const buttonText = button.innerText.toLowerCase();
        cards.forEach(card => {
            card.style.display = buttonText === 'all' || card.getAttribute('data-type').toLowerCase() === buttonText ? 'block' : 'none';
        });
    }
    tags.addEventListener('click', handleTagClick);



    // this code click scroll left
    const vocabLeftArrow = document.getElementById('vocab-left-arrow');
    const vocabRightArrow = document.getElementById('vocab-right-arrow');

    vocabLeftArrow.addEventListener('click', () => {
        tags.scrollLeft -= 200;
    })
    vocabRightArrow.addEventListener('click', () => {
        tags.scrollLeft += 200
    })

    // this code for slide shadow
    const slideShow = () => {
        const scrollLeft = tags.scrollLeft;
        vocabLeftArrow.style.setProperty("--colorBefore", scrollLeft > 0 ? "#fefefe" : "");
        vocabRightArrow.style.setProperty("--colorAfter", tags.scrollLeft + tags.clientWidth >= tags.scrollWidth - 1 ? "" : "#fefefe")
        vocabLeftArrow.style.zIndex = scrollLeft > 0 ? 1 : -1;
    }
    slideShow()

    tags.addEventListener('scroll', slideShow)

    setLoading(false); // Hide loading when everything is loaded
};
