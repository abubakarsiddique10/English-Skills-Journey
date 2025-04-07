import { setLoading } from "./main.js";

setLoading(true); // Show loading immediately

window.onload = () => {
    // this code click scroll left
    const tags = document.getElementById('tags');
    const vocabLeftArrow = document.getElementById('vocab-left-arrow');
    const vocabRightArrow = document.getElementById('vocab-right-arrow');
    const tagsContainer = document.querySelector('.tags_container');

    vocabLeftArrow.addEventListener('click', () => {
        tags.scrollLeft -= 120;
    })

    vocabRightArrow.addEventListener('click', () => {
        tags.scrollLeft += 120;
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
        console.log(isAtStart)
        // Adjust margins
        tagsContainer.style.paddingLeft = isAtStart || isSmallScreen ? "0" : "24px";
        tagsContainer.style.paddingRight = isAtEnd || isSmallScreen ? "0" : "24px";

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
}
