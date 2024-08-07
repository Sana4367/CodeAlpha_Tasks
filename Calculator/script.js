
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;

            if (this.id === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (this.id === 'backspace') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (this.id === 'equals') {
                if (currentInput && previousInput && operator) {
                    currentInput = operate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (this.id === 'sqrt') {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                display.textContent = currentInput;
            } else if (this.id === 'percent') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.textContent = currentInput;
            } else if (this.classList.contains('operator')) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function operate(num1, num2, operator) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return b === 0 ? 'Error' : (a / b).toString();
            default:
                return '';
        }
    }
});
