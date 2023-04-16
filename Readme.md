# TASK 1 : Develop Website Using HTML,CSS,JS

-   **ST1** : create index.html
-   **ST2** : using bootstrap CDN [docs](https://getbootstrap.com/) in index.html
-   **ST3** : Develop UI

Body

```html
<body class="container"></body>
```

Navbar : Get Code from Bootstrap Docs & Change content

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">CC-KOFF</a>
        <!-- What's data-bs-toggle ? -->
        <!-- FOR MOBILE -->
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- FOR DESKTOP -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Order</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Stock</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Dashboard</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

Main

```html
<main class="row mt-5">
    <div class="col"></div>
    <div class="col"></div>
</main>
```

Main - Image,form

```html
<main class="row mt-5">
    <div class="col">
        <img src="../assets/coffee.png" class="rounded mx-auto d-block" />
    </div>
    <div class="col">
        <form class="row gy-3 mt-5">
            <!-- FORM CONTENT -->
        </form>
    </div>
</main>
```

Form content : Read Doc Input group

```html
<form class="row gy-3 mt-5">
    <!-- HEAD -->
    <h1 class="text-center my-5" id="head">Ethiopia - Yirgacheffe</h1>

    <!-- GROUP-1 -->
    <div class="input-group mb-3">
        <span class="input-group-text">$$</span>
        <input type="text" class="form-control" placeholder="price" aria-label="price" />
        <span class="input-group-text"></span>
        <input type="text" class="form-control" placeholder="quantity" aria-label="quantity" />
    </div>

    <!-- GROUP-2 -->
    <div class="input-group input-group-md mb-3">
        <span class="input-group-text" id="inputGroup-sizing-sm">$$</span>
        <input
            type="text"
            class="form-control"
            placeholder="shipping"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
        />
    </div>

    <!-- ERROR -->
    <div class="px-3">
        <div class="alert alert-danger w-100" role="alert"></div>
    </div>

    <!-- BTN -->
    <div class="px-3">
        <button class="btn btn-primary w-100">Total</button>
    </div>
</form>

`Total`html

<div class="card mt-2">
    <div class="card-body">Total: <span></span></div>
</div>
```

-   **ST4** : Dynamics Website with JSDOM
    -   create main.js
    -   append script to index.html
    -   write JS-DOM

Select DOM - Don't forget add ID in HTML

```js
const priceInput = document.getElementById('product-price');
const quantityInput = document.getElementById('product-quantity');
const shippingInput = document.getElementById('product-shipping');

const totalBtn = document.getElementById('total-price');
const resultDiv = document.getElementById('result');
const errorBox = document.getElementById('error');
```

FN for Parse Input

```js
const parseInputs = (...input) => {
    return input.map((str) => parseInt(str));
};
```

FN for Validate Input

```js
const isValidInputs = (...input) => {
    return input.every((num) => typeof num === 'number' && !isNaN(num));
};
```

FN for Hide Error

```js
const hideErrors = () => {
    errorBox.classList.add('invisible');
};
hideErrors(); // 1st call
```

Create order and Binding

```js
function createOrder() {
    hideErrors();
    const inputs = [priceInput.value, quantityInput.value, shippingInput.value];
    const parsedInputs = parseInputs(...inputs);

    if (isValidInputs(...parsedInputs)) {
        const [price, quantity, shipping] = parsedInputs;
        resultDiv.innerText = price * quantity + shipping;
    } else {
        resultDiv.innerText = '';
        // handleAdditionError(inputs, parsedInputs);
    }
}
// Binding
totalBtn.addEventListener('click', createOrder);
```

FN for Error Handling

```js
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
```

-   **ST5** : create your style.css file & link to index.html

Body & font

```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');

body {
    background-color: #f3f7fa;
    font-family: 'Source Sans Pro', sans-serif;
}
```

-   **ST6** : Deploy with netlify
    <br>

# TASK-2 : Refractor to Multiple JS FILE

-   **ST1** : create `src` folder and sub-folder `app` `services` `utils`
-   **ST2** : Move all code to app.js and relink in index.html
-   **ST3** : refractor code to util

```js
// src/utils/parse-input.js
const parseInputs = (...input) => {
    return input.map((str) => parseInt(str));
};

// src/utils/validate-input.js
export const isValidInputs = (...input) => {
    return input.every((num) => typeof num === 'number' && !isNaN(num));
};
```

-   **ST4.1** : create UI-Component Service

```js
// src/services/component.service.js
export class ComponentService {
    constructor() {
        this.priceInput = document.getElementById('product-price');
        this.quantityInput = document.getElementById('product-quantity');
        this.shippingInput = document.getElementById('product-shipping');
        this.totalBtn = document.getElementById('total-price');
        this.resultDiv = document.getElementById('result');
    }

    getInputs() {
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
```

-   **ST4.2** : create Error-Service

```js
// src/services/error.service.js
export class ErrorService {
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
```

-   **ST5** : combine all in app.js

```js
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

            // ABSTRACT WITH Class : Component Service
            componentService.setTotalPrice(price * quantity + shipping);
        } else {
            console.log('l');

            // ABSTRACT WITH Class : Component Service
            componentService.setTotalPrice('');

            // ABSTRACT WITH Class : Error Service
            errorService.handleCalculationError(inputs, parsedInputs);
        }
    });
};

runApp(errorService, componentService);
```

-   **ST:6** : manual multiple import (nightmare)

```html
<script src="./src/app/error.service.js"></script>
<script src="./src/app/component.service.js"></script>
<script src="./src/utils/validate-inputs.js"></script>
<script src="./src/utils/parse-inputs.js"></script>
<script src="./src/app/app.js"></script>
```

## Step 2.0 : Node Project & Package Manager & script & package.json,package-lock.json, NodeModule

-   package.json , script in package.json
-   node_modules replace CDN
-   ไป ดู npm registry
-   `npm install --save bootstrap` ดู package.json , node_modules
-   `npm install --save-dev webpack`
-   `npm install -D webpack-cli`
-   ลอง script: start,dev,build
-   ลอง uninstall , install ลงใหม่
-   git init
-   สร้าง gitignore
-   ลอง Push ขึ้น git

## Step 3.0 : Webpack Bundler and Dependency Management

-   update start script เป็น webpack
-   npm start ดูไฟล์ dist
-   ลอง `npx webpack-cli`
-   สร้าง wepack.config.js มาแล้ว config
-   ไล่จาก mode,entry,output
-   ลองใส่ --config webpack.config.js ใน script

## Step 3.1 : Separate JS-INTO-MODULE(FILE)

-   ย้ายเนื้อหาในไฟล์และ export ออกมา
-   แก้ script ใน html ให้ link ไปที่ dist/main.js
-   ทดสอบการใช้งาน app

## Step 3.2 : Loader

-   CSS-Loader : Can import CSS in JS
-   STYLE-Loader : Append style to HTML
-   bootstrap import in css file
-   install sass-loader

## Step 3.3 : Bootstrap Override

-   install sass
-   write file scss for override
-   edit test rule
-   try primary-color : teal ,#C67C4D

## Step 4.1 : Plugin - HTML

-   https://github.com/jantimon/html-webpack-plugin#options
-   ลอง install และใช้ แบบไม่มี template ก่อน -> Bundle it
-   ใส่ ref template
-   ใส่ hash ให้ file.js

## Step 5 : HTML Loader for Image

-   npm i html-loader
-   build
-   config-path
-   assetModuleFilename: 'images/[hash][ext][query]',

## STEP 6 : Multiple Entry point,Clean, Web-server

-   add more entrypoint, change to dynamics name
-   bundle ดูว่าถ้าแก้ code แล้วไม่มี clean จะเป็นไง
-   ทำ Dev-server, hot reload

## STEP 7.1 : Multiple config

```js
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    mode: 'development',
    plugins: [],
    module: {
        rules: [],
    },
});
```

-   ย้าย rule css,html ไปทั้ง 2 ไฟล์

## STEP 7.2 : Extract CSS

-   follow docs

## STEP 7.3 : Opimization

```js
   optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
            new HtmlWebpackPlugin({
                template: './src/template/index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
        ],
    },
```
