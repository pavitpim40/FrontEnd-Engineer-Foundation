const priceInput = document.getElementById('coffee-price');
const quantity = document.getElementById('coffee-quantity');
const confirmBtn = document.getElementById('confirm-order');
const resultDiv = document.getElementById('result');
const errorBox = document.getElementById('error');

// FN-1 : Parse Array String -> Array Number
const parseInputs = (...input) => {
    return input.map((str) => parseInt(str));
};

// FN- : Hide Error
const hideErrors = () => {
    errorBox.classList.add('invisible');
};
