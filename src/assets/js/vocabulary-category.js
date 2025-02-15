import { createTags } from "./common.js";
const tags = document.getElementById('tags');
const cardsContainer = document.getElementById('category-cards');
const cards = cardsContainer.querySelectorAll('a');


/* const tagNames = ["All", "Animals", "Vegetables", "Education", "Fruits", "Food", "Clothing", "Nature", "Weather", "Transportation", "Sports", "Technology", "Household Items"]; */

const tagNames = ["All", "Animals", "Vegetables", "Fruits", "Jobs and Occupations", "Colors"];

if (tags) {
    for (let index = 0; index < tagNames.length; index++) {
        tags.appendChild(createTags(tagNames[index], index));
    }
}

function handleTagClick(event) {
    const button = event.target;
    const filterButtons = tags.querySelectorAll('.filter-button');
    if (!button.classList.contains('filter-button')) return;

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const buttonText = button.innerText.toLowerCase();


    // Filter cards efficiently
    cards.forEach(card => {
        const cardType = card.getAttribute('data-type').toLowerCase();
        const isMatch = buttonText === 'all' || cardType === buttonText;
        card.style.display = isMatch ? 'block' : 'none';

    });
}

// Event delegation for filtering
tags.addEventListener('click', handleTagClick);
