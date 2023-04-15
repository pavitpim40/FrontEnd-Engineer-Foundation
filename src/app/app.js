import { isValidInputs } from '../utils/validate-inputs';
import { parseInputs } from '../utils/parse-inputs';

export const runApp = (errorService, componentService) => {
    errorService.hideError();
    componentService.onClick(() => {
        const inputs = componentService.getInputs();
        const parsedInputs = parseInputs(...inputs);

        console.log(inputs);
        if (isValidInputs(...parsedInputs)) {
            const [price, quantity, shipping] = parsedInputs;
            componentService.setTotalPrice(price * quantity + shipping);
            // resultDiv.innerText = price * quantity + shipping;
        } else {
            // resultDiv.innerText = '';
            // handleAdditionError(inputs, parsedInputs);
            componentService.setTotalPrice('');
            errorService.handleCalculationError(inputs, parsedInputs);
        }
    });
};
