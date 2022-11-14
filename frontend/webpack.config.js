const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: ['./src/index.tsx'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	devServer: {
		port: 3000,
		historyApiFallback: true,
	},
	plugins: [new HtmlWebpackPlugin({ template: './public/index.html' }), new CleanWebpackPlugin()],
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(css|less)$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
};
