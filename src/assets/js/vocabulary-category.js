import { createTags } from "./common.js";
import { setLoading } from "./main.js";

setLoading(true); // Show loading immediately


window.onload = () => {

    const tags = document.getElementById('tags');
    const cardsContainer = document.getElementById('category-cards');
    const cards = cardsContainer.querySelectorAll('a');

    const tagNames = ["All", "Animals", "Vegetables", "Fruits", "Jobs and Occupations", "Colors", "Body Parts", "Education", "Household Items", "Birds", "Vehicle & Transport", "Tools",];

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
    const tagsContainer = document.querySelector('.tags_container');

    vocabLeftArrow.addEventListener('click', () => {
        tags.scrollLeft -= 100;
    })

    vocabRightArrow.addEventListener('click', () => {
        tags.scrollLeft += 100;
    })

    let globalWidth = document.documentElement.clientWidth; // Initial width

    // Function to update the global width
    const updateWidth = () => {
        globalWidth = document.documentElement.clientWidth;
        updateArrowsAndStyles(); // Call the function when resizing
    };

    // Function to update arrow visibility, shadows, and margins
    const updateArrowsAndStyles = () => {
        const { scrollLeft, scrollWidth, clientWidth } = tags;
        const isAtStart = scrollLeft === 0;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        const isSmallScreen = globalWidth < 768;

        // Toggle visibility using classes
        vocabLeftArrow.classList.toggle("hidden", isAtStart || isSmallScreen);
        vocabRightArrow.classList.toggle("hidden", isAtEnd || isSmallScreen);

        // Update shadow color
        vocabLeftArrow.style.setProperty("--colorBefore", isAtStart ? "" : "#fefefe");
        vocabRightArrow.style.setProperty("--colorAfter", isAtEnd ? "" : "#fefefe");

        // Adjust margins
        tagsContainer.style.marginLeft = isAtStart || isSmallScreen ? "0px" : "16px";
        tagsContainer.style.marginRight = isAtEnd || isSmallScreen ? "0px" : "16px";

        // Set z-index
        vocabLeftArrow.style.zIndex = isAtStart ? "-1" : "1";
    };

    // Function to handle scroll smoothly
    const handleScroll = () => requestAnimationFrame(updateArrowsAndStyles);

    // Event Listeners
    window.addEventListener("resize", updateWidth);
    tags.addEventListener("scroll", handleScroll);

    // Initial function calls
    updateWidth();
    updateArrowsAndStyles();



    setLoading(false); // Hide loading when everything is loaded
};
