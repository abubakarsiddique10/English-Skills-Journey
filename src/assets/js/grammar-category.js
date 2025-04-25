import { fetchData } from "./common.js";
import { setLoading } from "./main.js";
import { createContentCard } from "./components.js";

const GRAMMAR_DATA_URL = "./assets/data/grammar/grammar.json";

// Fetches grammar data from JSON and displays it as cards.
async function getGrammarData() {
    setLoading(true);
    try {
        const response = await fetchData(GRAMMAR_DATA_URL);
        const grammarItems = response.reduce((acc, curr) => acc.concat(curr.blogs), []);
        renderGrammarCards(grammarItems);
    } catch (error) {
        console.error("Failed to fetch grammar data:", error);
    } finally {
        setLoading(false);
    }
}

// 
function renderGrammarCards(grammarItems) {
    console.log(grammarItems)
    const grammarContainer = document.getElementById("grammar");
    if (!grammarContainer) {
        console.warn("No element with id 'grammar' found.");
        return;
    }

    const fragment = document.createDocumentFragment();
    grammarItems.forEach(grammarItem => {
        const grammarCard = createContentCard(grammarItem);
        fragment.appendChild(grammarCard);
    });

    grammarContainer.appendChild(fragment);
}
// Initialize on load
getGrammarData();
