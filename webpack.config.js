
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.export = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	]
} 