function formatTimestampToDate(timestamp) {
    const date = new Date(Number(timestamp)); // Convert to number
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
export { formatTimestampToDate }