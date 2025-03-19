import { setLoading } from "./main.js";

setLoading(true); // Show loading immediately

window.onload = () => {

    /* // section vocabulary start
    //click slider
    const vocabularySlider = document.querySelector('#vocabulary_slider');
    const vocabArrows = document.querySelectorAll('#vocabulary .arrow');

    vocabArrows.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
            const arrow = e.target.closest('button').id;
            vocabularySlider.scrollLeft += arrow == "right" ? + 196 : - 196
        })
    })
    // section vocabulary end



    // section speaking start
    //click slider
    const speakingSlider = document.querySelector('#speaking_slider');
    const speakingbArrows = document.querySelectorAll('#speaking .arrow');

    speakingbArrows.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
            const arrow = e.target.closest('button').id;
            speakingSlider.scrollLeft += arrow == "right" ? + 196 : - 196
        })
    })
    // section speaking end


    // hero section start
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const tags = document.getElementById('tags');

    leftArrow.addEventListener('click', () => {
        console.log(tags)
        tags.scrollLeft -= 200
    })
    rightArrow.addEventListener('click', () => {
        tags.scrollLeft += 200;
    })

    tags.addEventListener('scroll', () => {
        leftArrow.style.display = tags.scrollLeft > 0 ? "block" : "none";
        leftArrow.style.opacity = tags.scrollLeft > 0 ? 1 : 0
        rightArrow.style.display = (tags.scrollLeft + tags.clientWidth >= tags.scrollWidth) ? "none" : "block";
        rightArrow.style.opacity = (tags.scrollLeft + tags.clientWidth >= tags.scrollWidth) ? 0 : 1;
    });

    // hero section end */

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
