window.addEventListener("DOMContentLoaded", () => {
    function add(...numbers) {
        const result = numbers.reduce((accum, item) => {
            return accum + item;
        }, 0);
        return result;
    }
});
