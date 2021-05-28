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
    buttonsContainer.addEventListener("click", getButtonValue);

    window.addEventListener("keypress", getKeyValue);

    function getKeyValue(e) {
        const key = e.key;

        // return console.log(key);

        const isKeyNumber = isNumberRegEx.test(key);
        const isKeyPoint = key === ".";
        const isKeyOperator =
            key === "/" || key === "*" || key === "-" || key === "+";
        const isKeyEquals = key === "Enter";
        const isKeyClear = key === " ";

        // return console.log(isKeyClear);

        if (isKeyNumber) {
            processBtnNumber(key, key);
        }

        if (isKeyPoint) {
            processBtnPoint(key, key);
        }

        if (isKeyOperator) {
            processBtnOperator(key, key);
        }

        if (isKeyEquals) {
            solveCalculation(calculation);
            console.log("equals");
        }

        if (isKeyClear) {
            calculation = [];
            display.innerText = "";
            console.log("clear");
        }
    }

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
