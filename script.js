window.addEventListener("DOMContentLoaded", () => {
    let currentValue = 0;
    let calculation = [];
    // let calcLastIndex;
    // let calcLastElement;
    const isNumberRegEx = /^\d+$/;
    const isIncompleteDecimalRegEx = /^\d+\.\d{0,1}$/;
    const isDecimalRegEx = /^\d+\.\d{0,2}$/;
    const isOperatorRegEx = /^divide|multiply|substract|add$/;

    const display = document.getElementById("display");
    display.innerText = "";

    const buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.addEventListener("click", getButtonValue);

    function getButtonValue(e) {
        const button = e.target;
        const buttonValue = e.target.value;
        const buttonText = button.innerText;

        const classes = Array.from(button.classList);
        const isBtnNumber = classes.includes("btn-number");
        const isBtnPoint = classes.includes("btn-point");
        const isBtnOperator = classes.includes("btn-operator");
        const isBtnEquals = classes.includes("btn-equals");
        const isBtnClear = classes.includes("btn-clear");

        if (isBtnNumber) {
            processBtnNumber(buttonValue, buttonText);
        }

        if (isBtnPoint) {
            processBtnPoint(buttonValue, buttonText);
        }

        if (isBtnOperator) {
            processBtnOperator(buttonValue, buttonText);
        }

        if (isBtnEquals) {
            solveCalculation(calculation);
            console.log("equals");
        }

        if (isBtnClear) {
            calculation = [];
            display.innerText = "";
            console.log("clear");
        }
    }

    function printButtonValue(buttonText) {
        display.innerText += buttonText;
    }

    function getCalculationLast() {
        const last = {
            index: calculation.length - 1,
            element: calculation[calculation.length - 1],
        };
        return last;
    }

    function processBtnNumber(buttonValue, buttonText) {
        const last = getCalculationLast();

        if (calculation.length === 0 || isOperatorRegEx.test(last.element)) {
            calculation.push(buttonValue);
            printButtonValue(buttonText);
            console.log(calculation);
        }

        if (
            isNumberRegEx.test(last.element) ||
            isIncompleteDecimalRegEx.test(last.element)
        ) {
            calculation[last.index] += buttonValue;
            printButtonValue(buttonText);

            console.log(calculation);
        }
    }

    function processBtnPoint(buttonValue, buttonText) {
        const last = getCalculationLast();

        if (calculation.length > 0 && isNumberRegEx.test(last.element)) {
            calculation[last.index] += buttonValue;
            printButtonValue(buttonText);

            console.log(calculation);
        }
    }

    function processBtnOperator(buttonValue, buttonText) {
        const last = getCalculationLast();
        if (
            calculation.length > 0 &&
            (isNumberRegEx.test(last.element) ||
                isDecimalRegEx.test(last.element))
        ) {
            calculation.push(buttonValue);
            printButtonValue(buttonText);
            console.log(calculation);
        }
    }

    function solveCalculation(inputs) {
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

        printResult(result.toFixed(2));
        calculation = [];
        console.log(calculation);
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
