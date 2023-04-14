class ErrorService {
    constructor() {
        this.errorBox = document.getElementById('error');
    }

    handleCalculationError(inputs, numbers) {
        const fullMessage = inputs.reduce((message, str, index) => {
            if (isValidInputs(numbers[index])) {
                return message + '';
            } else {
                return message + `${str} is not a number. `;
            }
        }, 'Please enter three valid numbers! ');

        this.errorBox.classList.remove('invisible');
        this.errorBox.innerText = fullMessage;
    }

    hideError() {
        this.errorBox.classList.add('invisible');
    }
}
