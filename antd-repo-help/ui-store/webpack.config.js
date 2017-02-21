const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('config');

const theme = './app/styles/theme.js';

module.exports = {
	context: __dirname,
	devtool: 'inline-source-map',
	entry: [
		'./app/index.jsx',
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['', '.scss', '.css', '.js', '.jsx', '.json', '.less'],
	},
    postcss: [autoprefixer],
	module: {
		loaders: [
			{
				test: /(\.js|\.jsx)$/,
				exclude: /(node_modules)/,
				include: __dirname,
				loader: 'babel',
			},
			{
				test: /(\.less|\.css)$/,
				// loader: ExtractTextPlugin.extract('style-loader', `css!less?modifyVars=${JSON.stringify(theme)}`),
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
			},
			// {
			// 	test: /\.css$/,
			// 	loader: ExtractTextPlugin.extract(
			// 		`${require.resolve('css-loader')}` +
			// 		'?sourceMap&-restructuring&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!' +
			// 		`${require.resolve('postcss-loader')}`),
			// },
			// {
			// 	test: /\.less$/,
			// 	loader: ExtractTextPlugin.extract(
			// 		`${require.resolve('css-loader')}?` +
			// 		'sourceMap&modules&localIdentName=[local]___[hash:base64:5]&-autoprefixer!' +
			// 		`${require.resolve('postcss-loader')}!` +
			// 		`${require.resolve('less-loader')}?` +
			// 		`{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`),
			// },
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=50000&name=[path][name].[ext]',
			},
		],
	},
    plugins: [
        new ExtractTextPlugin('styles.css', { allChunks: true }),
        new webpack.DefinePlugin({
        'process.env': JSON.stringify({
            UI_STORE_HOST: config.get('server.exposedHost'),
            UI_STORE_PORT: config.get('server.exposedPort'),
        }),
    }),
    ],
};
