window.addEventListener("DOMContentLoaded", () => {
    // let currentValue = 0;
    let calculation = [];
    // const lastIndex = calculation.length - 1;
    // const lastElement = calculation[lastIndex];
    // const isNumberRegEx = /^[\d]+$/;

    const display = document.getElementById("display");
    display.innerText = "";

    const buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.addEventListener("click", getButtonValue);

    function getButtonValue(e) {
        const button = e.target;
        const buttonValue = button.value;
        const buttonText = button.innerText;

        if (button != e.currentTarget) {
            if (buttonValue === "equals") {
                operator(calculation);
            } else if (buttonValue === "clear") {
                calculation = [];
                display.innerText = "";
            } else {
                calculation.push(buttonValue);
                console.log(calculation);
                printButtonValue(buttonText);
                // processButtonValue(e);
            }
        }
    }

    function processButtonValue(e) {
        const button = e.target;
        const buttonValue = e.target.value;
        const classes = Array.from(button.classList);
        const isBtnNumber = classes.includes("btn-number");
        const isBtnPoint = classes.includes("btn-point");
        const isBtnOperator = classes.includes("btn-operator");
        const isBtnEquals = classes.includes("btn-equals");
        const isBtnClear = classes.includes("btn-clear");

        if (isBtnNumber) {
            processBtnNumber(buttonValue);
        }

        if (isBtnPoint) {
            processBtnPoint(buttonValue);
        }

        if (isBtnOperator) {
            console.log("operator");
        }

        if (isBtnEquals) {
            console.log("equals");
        }

        if (isBtnClear) {
            console.log("clear");
        }
    }

    function processBtnNumber(buttonValue) {
        if (!lastElement) {
            calculation.push(buttonValue);
        }

        if (isNumberRegEx.test(lastElement)) {
            calculation[lastIndex] += buttonValue;
        }
        console.log(calculation);
    }

    function processBtnPoint(buttonValue) {}

    function printButtonValue(buttonText) {
        display.innerText += buttonText;
    }

    function operator(inputs) {
        const a = inputs[0];
        const sign = inputs[1];
        const b = inputs[2];
        let result;

        switch (sign) {
            case "divide":
                result = divide(a, b);
                break;
            case "multiply":
                result = multiply(a, b);
                break;
            case "substract":
                result = substract(a, b);
                break;
            case "add":
                result = add(a, b);
                break;
            default:
                console.log("BUG!");
                break;
        }

        printResult(result);
    }

    function printResult(result) {
        display.innerText = result;
        console.log(result);
    }

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
