window.addEventListener("DOMContentLoaded", () => {
    let calculation = [];
    let showingResult = false;

    const isNumberRegEx = /^-?\d+$/;
    const isIncompleteDecimalRegEx = /^-?\d+\.\d{0,1}$/;
    const isDecimalRegEx = /^-?\d+\.\d{0,2}$/;
    const isOperatorRegEx = /^\/|\*|-|\+$/;

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
        const isKeyBackspace = key === "z";
        const isKeyPlusMinus = key === "x";

        const classes = Array.from(button.classList);
        const isNumber = isKeyNumber || classes.includes("btn-number");
        const isPoint = isKeyPoint || classes.includes("btn-point");
        const isOperator = isKeyOperator || classes.includes("btn-operator");
        const isEquals = isKeyEquals || classes.includes("btn-equals");
        const isClear = isKeyClear || classes.includes("btn-clear");
        const isBackspace = isKeyBackspace || classes.includes("btn-backspace");
        const isPlusMinus =
            isKeyPlusMinus || classes.includes("btn-plus-minus");

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
            processEquals();
        }

        if (isClear) {
            calculation = [];
            displayDiv.innerText = "";
        }

        if (isBackspace) {
            processBackspace();
        }

        if (isPlusMinus) {
            processPlusMinus();
        }
    }

    function displayInput(inputText) {
        switch (inputText) {
            case "/":
                inputText = "??";
                break;
            case "*":
                inputText = "???";
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
        }

        if (
            showingResult === false &&
            (isNumberRegEx.test(last.element) ||
                isIncompleteDecimalRegEx.test(last.element))
        ) {
            calculation[last.index] += inputValue;
            displayInput(inputText);
        }

        if (showingResult) {
            calculation = [];
            displayDiv.innerText = "";
            calculation.push(inputValue);
            displayInput(inputText);
            showingResult = false;
        }
    }

    function processPoint(inputValue, inputText) {
        const last = getCalculationLast();

        if (
            calculation.length > 0 &&
            isNumberRegEx.test(last.element) &&
            showingResult === false
        ) {
            calculation[last.index] += inputValue;
            displayInput(inputText);
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
        }
    }

    function processEquals() {
        if (calculation.length >= 3) {
            calculate(calculation);
        }
    }

    function processBackspace() {
        const last = getCalculationLast();

        if (typeof last.element == "undefined") {
            return;
        }

        if (last.element.length === 1) {
            calculation.pop();
            deleteLastInDisplay();
            return;
        }

        calculation[last.index] = last.element.substring(
            0,
            last.element.length - 1
        );

        deleteLastInDisplay();
    }

    function deleteLastInDisplay() {
        displayDiv.innerText = displayDiv.innerText.substring(
            0,
            displayDiv.innerText.length - 1
        );
    }

    function processPlusMinus() {
        const last = getCalculationLast();
        if (typeof last.element == "undefined") {
            return;
        }

        if (
            calculation.length === 1 &&
            (isNumberRegEx.test(last.element) ||
                isDecimalRegEx.test(last.element))
        ) {
            if (Math.sign(last.element) === 1) {
                calculation[last.index] = `-${last.element}`;

                displayDiv.innerText = "-" + displayDiv.innerText;
            }

            if (Math.sign(last.element) === -1) {
                calculation[last.index] = last.element.substring(
                    1,
                    last.element.length
                );
                displayDiv.innerText = displayDiv.innerText.substring(
                    1,
                    displayDiv.innerText.length
                );
            }

            console.log(calculation);
        }
    }

    function calculate(inputs) {
        let a;
        let sign;
        let b;
        let result;

        let indexesWithPrevalence = [];

        function getIndexesWithPrevalence(inputs, sign) {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i] === sign) {
                    indexesWithPrevalence.push(i);
                }
            }
        }

        getIndexesWithPrevalence(inputs, "*");
        getIndexesWithPrevalence(inputs, "/");

        function solvePrecedence() {
            for (let i = indexesWithPrevalence.length - 1; i >= 0; i--) {
                let signIndex = indexesWithPrevalence[i];
                sign = inputs[signIndex];
                a = Number(inputs[signIndex - 1]);
                b = Number(inputs[signIndex + 1]);

                switch (sign) {
                    case "/":
                        result = divide(a, b);
                        break;
                    case "*":
                        result = multiply(a, b);
                        break;
                    default:
                        break;
                }

                inputs.splice(signIndex - 1, 3, result);
            }
        }

        solvePrecedence();

        while (inputs.length >= 3) {
            a = Number(inputs[0]);
            sign = inputs[1];
            b = Number(inputs[2]);

            switch (sign) {
                case "-":
                    result = substract(a, b);
                    break;
                case "+":
                    result = add(a, b);
                    break;
                default:
                    break;
            }

            inputs.splice(0, 3, result);
        }

        const resultToFixed = addZeroes(result);
        printResult(resultToFixed);

        calculation = [];
        calculation.push(resultToFixed);

        showingResult = true;
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

    function divide(a, b) {
        let result;

        if (b === 0) {
            result = "error";
            return result;
        } else {
            result = a / b;
            return result;
        }
    }
});
