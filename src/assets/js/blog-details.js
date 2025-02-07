import {fetchData} from "./common.js";
const queryParams = new URLSearchParams(window.location.search);
const blogId = queryParams.get('id');


// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        const filterData = response[1].find(({id}) => id == blogId)
        blogDetailsDisplay(filterData)
    } catch (error) {
        console.error(error);
    }
}

const blogDetailsDisplay = ({title, blogImg, content, publicationDate}) => {
    const blogDetails = document.getElementById('blog_details');
    blogDetails.innerHTML = `
        <div class="sm:flex items-center justify-between mb-8">
            <h1 id="blog_title" class="text-3xl font-bold text-[#242424] mb-2 sm:mb-0">${title}</h2>
            <span class="text-[#6B6B6B] text-sm">${publicationDate}</span>
        </div>
        <img id="blog_img" class="w-full" src="${blogImg}" alt="">
        <div  class="mt-10 mb-4 text-[#242424] text-lg font-normal">${content}
        </div>
    `
}

// Initialize the application
document.addEventListener('DOMContentLoaded', getBlogData)