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


