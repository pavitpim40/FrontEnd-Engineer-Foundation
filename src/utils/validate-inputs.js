// FN-2 : Validate
const isValidInputs = (...input) => {
    return input.every((num) => typeof num === 'number' && !isNaN(num));
};
