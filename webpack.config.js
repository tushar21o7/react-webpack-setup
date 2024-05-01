const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    return {
        mode: 'development',
        entry: {
            bundle: path.resolve(__dirname, 'src/index.js')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name][contenthash].js',
            clean: true,
            assetModuleFilename: '[name][ext]',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts'],
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist')
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        optimization: {
            minimizer: [new CssMinimizerPlugin()],
            minimize: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'App',
                filename: 'index.html',
                template: 'src/template.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new Dotenv({
                path: '.env',
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
            }),
        ]
    }
}