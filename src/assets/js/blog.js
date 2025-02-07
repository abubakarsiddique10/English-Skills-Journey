import {fetchData} from "./common.js";

// Fetch Namaz Niyat data
async function getBlogData() {
    const url = `././assets/data/blogs/blogs.json`;
    try {
        const response = await fetchData(url);
        displayBlog(response[1]);
    } catch (error) {
        console.error('Error fetching Namaz Niyat data:', error);
    }
}
getBlogData()

// Display Namaz Niyat data in the UI
const displayBlog = (contents) => {
    let blogContainer = document.getElementById('blog');
    contents.forEach((content) => {
        const createBLogCard = createArticleCard(content);
        blogContainer.appendChild(createBLogCard);
    });
    setupCategoryClickListener()
}


// Create a article card element
const createArticleCard = ({id, title, subtitle, content, blogImg, publicationDate }) => {
    const cardElement = document.createElement('article');
    cardElement.className = 'blog__card border-b py-6 cursor-pointer';
    cardElement.setAttribute('data-id', `${id}`)
    cardElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-xl md:text-2xl text-[#242424] font-bold pb-2">${title}</h2>
                <p class="text-base font-normal text-[#6B6B6B]">${subtitle.length > 105 ? subtitle.slice(0, 105) + " ..." : subtitle + "."}</p>
            </div>
            <div class="w-full max-w-20 h-20 lg:max-w-[160px] lg:h-[100px] ml-8 lg:ml-14">
                <img class="w-full h-full object-cover" src="../src/assets/images/blog/blog.webp" alt="img" />
            </div>
        </div>
        <div class="mt-[10px]">
            <span class="text-[#6B6B6B] text-sm">${publicationDate}</span>
        </div>
    `;
    return cardElement
}

const setupCategoryClickListener = () => {
    // Use event delegation on a parent element that exists when the page loads
    const blogs = document.getElementById('blog');
    blogs.addEventListener('click', (event) => {
        const blogCard = event.target.closest('.blog__card');
        if(blogCard) {
           const blogId = blogCard.dataset.id;
           window.location.href = "blog-details.html?id=" + blogId;
        }
    })
}