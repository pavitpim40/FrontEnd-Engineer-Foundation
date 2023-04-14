const errorService = new ErrorService();
const componentService = new ComponentService();

const runApp = (errorService, componentService) => {
    errorService.hideError();
    componentService.onClick(() => {
        const inputs = componentService.getInputs();
        const parsedInputs = parseInputs(...inputs);

        console.log(inputs);
        if (isValidInputs(...parsedInputs)) {
            const [price, quantity, shipping] = parsedInputs;
            console.log('s');
            componentService.setTotalPrice(price * quantity + shipping);
            // resultDiv.innerText = price * quantity + shipping;
        } else {
            console.log('l');
            // resultDiv.innerText = '';
            // handleAdditionError(inputs, parsedInputs);
            componentService.setTotalPrice('');
            errorService.handleCalculationError(inputs, parsedInputs);
        }
    });
};

runApp(errorService, componentService);
