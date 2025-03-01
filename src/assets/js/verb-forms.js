import { setLoading } from "./main.js";

async function loadVerbForms() {
    setLoading(true);

    try {
        const response = await fetch("./assets/data/verb/verb-forms.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const verbsList = document.getElementById("verbs-list");

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();

        data.forEach(({ present, past, pastParticiple }) => {

            [present, past, pastParticiple].forEach(value => {
                const li = document.createElement("li");
                li.classList.add("py-2", "px-4", "border-b", "border-l", "border-[#4755691a]", "text-left");
                li.textContent = value;
                fragment.appendChild(li);
            });
        });

        verbsList.appendChild(fragment);
    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
}

// Call the function
loadVerbForms();
