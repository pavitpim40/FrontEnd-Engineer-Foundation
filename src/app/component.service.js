class ComponentService {
    constructor() {
        this.priceInput = document.getElementById('product-price');
        this.quantityInput = document.getElementById('product-quantity');
        this.shippingInput = document.getElementById('product-shipping');
        this.totalBtn = document.getElementById('total-price');
        this.resultDiv = document.getElementById('result');
    }

    getInputs() {
        console.log(this.priceInput);
        return [this.priceInput.value, this.quantityInput.value, this.shippingInput.value];
    }

    setTotalPrice(price) {
        this.resultDiv.innerText = price;
    }

    onClick(cb) {
        this.totalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cb();
        });
    }
}
