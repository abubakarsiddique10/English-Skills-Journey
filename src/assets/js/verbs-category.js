import { setLoading } from "./main.js";



setLoading(true); // Show loading immediately
window.onload = () => {
    setLoading(false); // Hide loading when everything is loaded
}