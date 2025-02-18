import { setLoading } from "./main.js";

async function loadVerbForms() {
    setLoading(true);

    try {
        const response = await fetch("./assets/data/verb/verb-forms.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const tableBody = document.getElementById("table-body");

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();

        data.forEach(({ present, past, pastParticiple }) => {
            const row = document.createElement("tr");
            row.classList.add("border-b");

            [present, past, pastParticiple].forEach(value => {
                const cell = document.createElement("td");
                cell.classList.add("py-2", "px-4", "border", "border-[#4755691a]", "text-left");
                cell.textContent = value;
                row.appendChild(cell);
            });

            fragment.appendChild(row);
        });

        tableBody.appendChild(fragment); // Append all rows at once for better performance
    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
}

// Call the function
loadVerbForms();
