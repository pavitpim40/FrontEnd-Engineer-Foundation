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

# TASK-2 : Refactor to Multiple JS FILE

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

# TASK 3 : Set up Node Project

-   **ST-1** : for create node project using command `npm init`
-   **ST-2** : explore script in package.json

```json
{
    "name": "frontend-foundation",
    "version": "1.0.0",
    "description": "about fundamental of frontend",
    "main": "index.js",
    "scripts": {
        "start" : "ls",
        "dev" : "ls -l",
        "build" : "ls -la
    },
    "author": "pavit pimchangul",
    "license": "MIT"
}
```

-   **ST-3** : install dependencies by using command `npm install`
    -   go to npm registry
    -   dependencies
        -   `npm install --save bootstrap` or
        -   `npm i bootstrap`
    -   dev-dependencies
        -   `npm install --save-dev webpack`
        -   `npm install -D webpack-cli`
    -   delete `node_module` and run `npm install` again
-   **ST-4** : discussion about `node_modules` and `.gitignore`
-   **ST-5** : `git init` and link with your github repo
-   **ST-6** : discussion with other package manager `yarn` ,`pnpm`

# TASK 4 : Basic Webpack (Bundle and Manage Dependencies)

-   **ST-0** : create mock `index.js` in `src` and write some js code
-   **ST-1** : `npx webpack-cli` and see result
-   **ST-2** : set up to `npm start` script just `webpack`
-   **ST-3** : create `webpack.config.js` in root folder
-   **ST-4** : basic config with `mode`, `entry` , `output`

```js
const path = require('path');

// CommonJS : Node App
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```

-   **ST-5** : try to bundle code with mock `index.js` in `src`
    -   see output in `dist` folder
    -   change config and bundle again eg. `mode:"production`,`filename`,`path`

```js
// ESMODULE : ES6
import validateInput from './utils/validate-inputs';

alert('Hi');

validateInput([1, 2, 3, 4, 5]);
```

-   **ST-6** : Refactor
    -   using `import`, `export` in your source
    -   bundle again

```js
// index.js

import { ErrorService } from './app/error.service';
import { ComponentService } from './app/component.service';
import { runApp } from './app/app';

const errorService = new ErrorService();
const componentService = new ComponentService();

runApp(errorService, componentService);
```

-   **ST-7**
    -   Relink you index.html with one single script in `dist`
    -   test your app
-   **ST-8 (optional)** : try to add `--config webpack.config.js` in script

# TASK-5 : Loader (CSS)

-   **ST-1** : ทำให้ import css เข้าไปใน js ได้
    -   create `index.css` and move your code to this file
    -   delete old .css and remove link from html
    -   `import './index.css'` in your `index.js` file, try to bundle
    -   `npm i -D css-loader` สำหรับ include css in js
    -   `npm i -D style-loader` สำหรับ link css เข้ากับ html
    -   config rules in webpack -> bundle -> see your app

```js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // append <link > in html
                    'css-loader', // allow import '.index.css'
                ],
            },
        ],
    },
};
```

-   **ST-2** : ทำให้เขียน scss ได้ & override bootstrap
    -   change you filename to `.scss` and edit `import` statement
    -   `npm i -D sass sass-loader`
    -   add more rules in `webpack.config.js`
    -   import bootstrap and override primary color
    -   now can remove bootstrap cdn from `index.html`

```js
// Node-Module
const path = require('path');

// CommonJS : Node App
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
};
```

```css
/* style.scss */
$primary: #c67c4d;
@import '~bootstrap/scss/bootstrap';
```

# TASK-6 : Plugin (HTML,Clean) & Dynamics name output

-   **ST-0** : auto generate new js file name
    -   using hash for js
    -   bundle file -> see result
    -   need to relink in html ?

```js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // append <link > in html
                    'css-loader', // allow import '.index.css'
                ],
            },
        ],
    },
};
```

-   **ST-1** : `npm i -D html-webpack-plugin` [docs](https://github.com/jantimon/html-webpack-plugin#options)
-   **ST-2** : add plugin in `webpack.config.js` and bundle it -> see result

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // append <link > in html
                    'css-loader', // allow import '.index.css'
                ],
            },
        ],

     plugins: [
        new HtmlWebpackPlugin(),
    },

```

-   **ST-3** : path option
    -   ใส่ option ให้ plugin
    -   ย้ายไฟล์ index.html เราไปอยู่ในโฟลเดอร์ `template`
    -   bundle -> see result

```js
 plugins: [
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    },
```

-   **ST-4** : remove old js file with clean plugin
    -   `npm i -D clean-webpack-plugin`
    -   config rule and bundle it

```diff
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin')

 plugins: [
+        new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    ],
```

# TASK-7 : Loader (Image)

-   **ST-1** : ย้าย folder `assets` มาไว้ใน `src` -> เกิดปัญหาเรื่อง link
-   **ST-2** : `npm i -D html-loader`
-   **ST-3** : config rule and bundle-it

```diff

    output : {
+       assetModuleFilename: 'images/[hash][ext][query]',
    }
    module:[
        {
            test: /\.s?css$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
+       {
+           test: /\.html$/,
+           use: ['html-loader'],
+        },
    ],
```

# TASK-8 : Multiple Entry point

-   **ST-1** : multiple entry point
    -   create file `vendor.js` in root
    -   import bootstrap
    -   edit rule in `webpack.config.json` and bundle it

```js
// vendor.js
import 'bootstrap';
```

```diff
# webpack.config.js

    output: {
+        filename: '[name].[hash].js'
    }
    entry: {
        main: './src/index.js',
+       vendor: './src/vendor.js',
    },
```

# TASK-9 : Dev server

-   **ST-1** : `npm i -D webpack-dev-server`
-   **ST-2** : edit script for `dev`
-   **ST-3** : remove dist folder
-   **ST-4** : `npm run dev`

```diff
# package.json
{
    "main": "index.js",
    "scripts": {
        "start": "webpack --config webpack.config.js",
+        "dev": "webpack serve  --hot",
    },
    "devDependencies": {
+       "webpack-dev-server": "^4.13.3"
    }

```

# TASK-10 : Multiple Config

-   **ST-1** : `npm i -D webpack-merge`
-   **ST-2** : create `webpack.dev.js` and `webpack.prod.js`

```js
// webpack.config.js
module.exports = {
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js',
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'], //image
            },
        ],
    },

    output: {
        assetModuleFilename: 'images/[hash][ext][query]',
    },
};
```

```js
//  `webpack.dev.js`
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});
```

```js
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
});
```

-   **ST-3** edit `dev` and `build` script

```diff
# package.json

+   "dev": "webpack serve  --hot --config webpack.dev.js",
+    "build": "webpack --config webpack.prod.js"
```

-   **ST-4** : remove clean plugin from `webpack.dev.js` => no need

# TASK-11 : Extract CSS

-   **ST-1** `npm -i -D mini-css-extract-plugin`
-   **ST-2** edit `webpack.prod.js`

```diff

+ const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
+        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
                template: './src/template/index.html'
            }
        ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
+               use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },

});

```

-   **ST-3** : build

# TASK-12 : Optimization

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

# TASK-13 : Continuous Deploy
