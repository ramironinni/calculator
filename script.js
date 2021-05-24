window.addEventListener("DOMContentLoaded", () => {
    function add(...numbers) {
        const result = numbers.reduce((accum, item) => {
            return accum + item;
        }, 0);
        return result;
    }

    function substract(...numbers) {
        if (numbers.length < 1) {
            return 0;
        }
        const result = numbers.reduce((accum, item) => {
            return accum - item;
        });
        return result;
    }

    function multiply(...numbers) {
        const result = numbers.reduce((accum, item) => {
            return accum * item;
        });
        return result;
    }

    function divide(...numbers) {
        const result = numbers.reduce((accum, item) => {
            return accum / item;
        });
        return result;
    }
});
