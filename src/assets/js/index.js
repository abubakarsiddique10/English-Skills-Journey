import { setLoading } from "./main.js";

setLoading(true); // Show loading immediately

window.onload = () => {

    /* section vocabulary start */
    //click slider
    const vocabularySlider = document.querySelector('#vocabulary_slider');
    const vocabArrows = document.querySelectorAll('#vocabulary .arrow');

    vocabArrows.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
            const arrow = e.target.closest('button').id;
            vocabularySlider.scrollLeft += arrow == "right" ? + 196 : - 196
        })
    })
    /* section vocabulary end */



    /* section speaking start */
    //click slider
    const speakingSlider = document.querySelector('#speaking_slider');
    const speakingbArrows = document.querySelectorAll('#speaking .arrow');

    speakingbArrows.forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
            const arrow = e.target.closest('button').id;
            speakingSlider.scrollLeft += arrow == "right" ? + 196 : - 196
        })
    })
    /* section speaking end */


    /* hero section start */
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const tags = document.getElementById('tags');

    leftArrow.addEventListener('click', () => {
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

    /* hero section end */


    setLoading(false); // Hide loading when everything is loaded
}
