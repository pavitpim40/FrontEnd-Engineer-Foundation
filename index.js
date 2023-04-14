const priceInput = document.getElementById('product-price');
const quantityInput = document.getElementById('product-quantity');
const shippingInput = document.getElementById('product-shipping');

const totalBtn = document.getElementById('total-price');
const resultDiv = document.getElementById('result');
const errorBox = document.getElementById('error');

// FN-1 : Parse Array String -> Array Number
const parseInputs = (...input) => {
    return input.map((str) => parseInt(str));
};

// FN-2 : Validate
const isValidInputs = (...input) => {
    return input.every((num) => typeof num === 'number' && !isNaN(num));
};

// FN-3: Hide Error
const hideErrors = () => {
    errorBox.classList.add('invisible');
};
hideErrors();

// FN-4 : CreateOrder
function createOrder() {
    hideErrors();
    const inputs = [priceInput.value, quantityInput.value, shippingInput.value];
    const parsedInputs = parseInputs(...inputs);

    if (isValidInputs(...parsedInputs)) {
        const [price, quantity, shipping] = parsedInputs;
        resultDiv.innerText = price * quantity + shipping;
    } else {
        resultDiv.innerText = '';
        handleAdditionError(inputs, parsedInputs);
    }
}
// Binding
totalBtn.addEventListener('click', createOrder);

// FN-5 : HandleError
function handleAdditionError(inputs, numbers) {
    const fullMessage = inputs.reduce((message, str, index) => {
        if (isValidInputs(numbers[index])) {
            return message + '';
        } else {
            return message + `${str} is not a number. `;
        }
    }, 'Please enter three valid numbers! ');

    errorBox.classList.remove('invisible');
    errorBox.innerText = fullMessage;
}
