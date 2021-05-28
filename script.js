window.addEventListener("DOMContentLoaded", () => {
    let calculation = [];
    let showingResult = false;

    const isNumberRegEx = /^\d+$/;
    const isIncompleteDecimalRegEx = /^\d+\.\d{0,1}$/;
    const isDecimalRegEx = /^\d+\.\d{0,2}$/;
    const isOperatorRegEx = /^\/|\*|\-|\+$/;

    const displayDiv = document.getElementById("display");

    const buttonsContainer = document.getElementById("buttons-container");

    buttonsContainer.addEventListener("click", getInput);
    window.addEventListener("keypress", getInput);

    function getInput(e) {
        const button = e.target;

        let value = e.target.value;
        let displayText = button.innerText;

        const key = e.key;
        if (key) {
            value = key;
            displayText = key;
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
            processNumber(value, displayText);
        }

        if (isPoint) {
            processPoint(value, displayText);
        }

        if (isOperator) {
            processOperator(value, displayText);
        }

        if (isEquals) {
            calculate(calculation);
            console.log("equals");
        }

        if (isClear) {
            calculation = [];
            displayDiv.innerText = "";
            console.log("clear");
        }
    }

    function displayInput(inputText) {
        switch (inputText) {
            case "/":
                inputText = "÷";
                break;
            case "*":
                inputText = "⨯";
                break;
            default:
                break;
        }
        if (displayDiv.innerText === "0") {
            displayDiv.innerText = inputText;
        } else {
            displayDiv.innerText += inputText;
        }
    }

    function getCalculationLast() {
        const last = {
            index: calculation.length - 1,
            element: calculation[calculation.length - 1],
        };
        return last;
    }

    function processNumber(inputValue, inputText) {
        const last = getCalculationLast();

        if (calculation.length === 0 || isOperatorRegEx.test(last.element)) {
            calculation.push(inputValue);
            displayInput(inputText);
            console.log(calculation);
        }

        if (
            showingResult === false &&
            (isNumberRegEx.test(last.element) ||
                isIncompleteDecimalRegEx.test(last.element))
        ) {
            calculation[last.index] += inputValue;
            displayInput(inputText);

            console.log(calculation);
        }

        if (showingResult) {
            calculation = [];
            displayDiv.innerText = "";
            calculation.push(inputValue);
            displayInput(inputText);
            console.log(calculation);
        }
    }

    function processPoint(inputValue, inputText) {
        const last = getCalculationLast();

        if (calculation.length > 0 && isNumberRegEx.test(last.element)) {
            calculation[last.index] += inputValue;
            displayInput(inputText);

            console.log(calculation);
        }
    }

    function processOperator(inputValue, inputText) {
        const last = getCalculationLast();
        if (
            calculation.length > 0 &&
            (isNumberRegEx.test(last.element) ||
                isDecimalRegEx.test(last.element))
        ) {
            calculation.push(inputValue);
            displayInput(inputText);

            showingResult = false;

            console.log(calculation);
        }
    }

    function calculate(inputs) {
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

        const resultToFixed = addZeroes(result);
        printResult(resultToFixed);

        calculation = [];
        calculation.push(resultToFixed);

        showingResult = true;

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
        displayDiv.innerText = result;
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
