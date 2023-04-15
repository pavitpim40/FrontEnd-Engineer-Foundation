## Step 1.1 : Develop UI : HTML + CSS (Bootstrap)

-   การดึง code คนอื่นมาใช้ : 1.using CDN 2.download file 3.package manager

## Step 1.2 : Writing DOM API for Interactive

## Step 1.3 : Refractor for multiple Script

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

## Step 3.3 : Boostrap Override

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

## STEP 6 : Multiple Entry point
