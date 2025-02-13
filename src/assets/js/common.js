// Data fetch example: 1
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
    }
    return response.json()
}

function createTags(tagName, index) {
    const li = document.createElement('li');
    li.className = `filter-button px-3 py-1.5 text-sm font-medium bg-[#0000000d] text-[#0f0f0f] rounded-md capitalize mr-3 text-nowrap cursor-pointer ${index === 0 ? 'active' : ""}`;
    li.innerText = tagName;
    return li
}




export { fetchData, createTags }


