# Travel-app
 

## Overview
This project requires to creat app Travle Appp. 
 
The goal of this project is to give you practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls
 
## pre_requisites & local development

Developer should install Node.js , Express.js , Cros , body-parser, npm 
 webpack, webpack-cli,  ,chrome as browser, Visual Studio code or any good Editor.
# Backend 
To run the application of backend side run the following commands in in Terminal.
```
npm start 
``` 
# Frontend 
To run the local development run the following commands in in Terminal.
```
npm run build-dev
```
# Testing 
To run  test  run:
```
npm run test
```

## Getting started
*  first create a new folder to project `cd` into your new folder and run:
- `npm install`
*  Seting up the api  
   *   create acount  Geonames api .
   * sing up for   api keys for  Weatherbit API and  Pixabay.  then you will get keys  
   *  "Use npm or yarn to install the dotenv-webpack package ```npm install dotenv-webpack --save-dev ```" to save     your api key as secret key.

* install the necessary for development mode such as :
```
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin

 
At present the app is not run as Base URL  it is run locally and app hosted on locallhos 9000 for backend side and fronted side 30001 .