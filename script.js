window.addEventListener("DOMContentLoaded", () => {
    let currentValue = 0;
    let calculation = [];
    // let calcLastIndex;
    // let calcLastElement;
    const isNumberRegEx = /^\d+$/;
    const isIncompleteDecimalRegEx = /^\d+\.\d{0,1}$/;
    const isDecimalRegEx = /^\d+\.\d{0,2}$/;
    const isOperatorRegEx = /^\/|\*|\-|\+$/;

    const display = document.getElementById("display");
    display.innerText = "";

    const buttonsContainer = document.getElementById("buttons-container");

    buttonsContainer.addEventListener("click", getInput);
    window.addEventListener("keypress", getInput);

    function getInput(e) {
        const button = e.target;

        let value = e.target.value;
        let display = button.innerText;

        const key = e.key;
        if (key) {
            value = key;
            display = key;
        }

        const isKeyNumber = isNumberRegEx.test(key);
        const isKeyPoint = key === ".";
        const isKeyOperator =
            key === "/" || key === "*" || key === "-" || key === "+";
        const isKeyEquals = key === "Enter";
        const isKeyClear = key === " ";

        const classes = Array.from(button.classList);
        const isNumber = isKeyNumber || classes.includes("btn-number");
        const isPoint = isKeyPoint || classes.includes("btn-point");
        const isOperator = isKeyOperator || classes.includes("btn-operator");
        const isEquals = isKeyEquals || classes.includes("btn-equals");
        const isClear = isKeyClear || classes.includes("btn-clear");

        if (isNumber) {
            processNumber(value, display);
        }

        if (isPoint) {
            processPoint(value, display);
        }

        if (isOperator) {
            processOperator(value, display);
        }

        if (isEquals) {
            solveCalculation(calculation);
            console.log("equals");
        }

        if (isClear) {
            calculation = [];
            display.innerText = "";
            console.log("clear");
        }
    }

    function displayInput(buttonText) {
        switch (buttonText) {
            case "/":
                buttonText = "÷";
                break;
            case "*":
                buttonText = "⨯";
                break;
            default:
                break;
        }

        display.innerText += buttonText;
    }

    function getCalculationLast() {
        const last = {
            index: calculation.length - 1,
            element: calculation[calculation.length - 1],
        };
        return last;
    }

    function processNumber(buttonValue, buttonText) {
        const last = getCalculationLast();

        if (calculation.length === 0 || isOperatorRegEx.test(last.element)) {
            calculation.push(buttonValue);
            displayInput(buttonText);
            console.log(calculation);
        }

        if (
            isNumberRegEx.test(last.element) ||
            isIncompleteDecimalRegEx.test(last.element)
        ) {
            calculation[last.index] += buttonValue;
            displayInput(buttonText);

            console.log(calculation);
        }
    }

    function processPoint(buttonValue, buttonText) {
        const last = getCalculationLast();

        if (calculation.length > 0 && isNumberRegEx.test(last.element)) {
            calculation[last.index] += buttonValue;
            displayInput(buttonText);

            console.log(calculation);
        }
    }

    function processOperator(buttonValue, buttonText) {
        const last = getCalculationLast();
        if (
            calculation.length > 0 &&
            (isNumberRegEx.test(last.element) ||
                isDecimalRegEx.test(last.element))
        ) {
            calculation.push(buttonValue);
            displayInput(buttonText);
            console.log(calculation);
        }
    }

    function solveCalculation(inputs) {
        const a = Number(inputs[0]);
        const sign = inputs[1];
        const b = Number(inputs[2]);
        let result;

        switch (sign) {
            case "/":
                result = divide(a, b);
                break;
            case "*":
                result = multiply(a, b);
                break;
            case "-":
                result = substract(a, b);
                break;
            case "+":
                result = add(a, b);
                break;
            default:
                console.log("BUG!");
                break;
        }

        console.log(`Result: ${result}`);

        printResult(addZeroes(result));
        calculation = [];
        console.log(calculation);
    }

    function addZeroes(num) {
        let numToString = num.toString();
        let res = numToString.split(".");

        if (res.length > 1) {
            num = num.toFixed(2);
        }
        return num;
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
