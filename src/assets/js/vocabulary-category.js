import { createTags } from "./common.js";
import { setLoading } from "./main.js";

setLoading(true); // Show loading immediately

window.onload = () => {

    const tags = document.getElementById('tags');
    const cardsContainer = document.getElementById('category-cards');
    const cards = cardsContainer.querySelectorAll('a');

    const tagNames = ["All", "Animals", "Vegetables", "Fruits", "Jobs and Occupations", "Colors", "Body Parts", "Education", "Household Items", "Birds", "Vehicle & Transport", "Tools"];

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

    setLoading(false); // Hide loading when everything is loaded
};
