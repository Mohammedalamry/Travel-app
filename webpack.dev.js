const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require("workbox-webpack-plugin");
const dotenv = require('dotenv-webpack')
 
module.exports = {
   
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
      },
    entry: './src/client/index.js',
    mode: 'development',
   
    output: {
        filename:'main.js',
        path:path.resolve(__dirname,'dist'),
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },{              
                test: /\.scss$/,
                use:['style-loader', 'css-loader','sass-loader']

            },{
                test: /\.(png|jpe?g|gif)$/i,
               use:[{
                loader: 'file-loader' 
               ,   options: {
                name:'[name].[ext]',
                outputPath:'media/',
                publicPath: 'media/',
              }
               }
            
            
            ] 
                 
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new dotenv(),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()
 
    ]
}
