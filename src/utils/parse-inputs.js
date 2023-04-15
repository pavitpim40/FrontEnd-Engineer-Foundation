// FN-1 : Parse Array String -> Array Number
export const parseInputs = (...input) => {
    return input.map((str) => parseInt(str));
};
