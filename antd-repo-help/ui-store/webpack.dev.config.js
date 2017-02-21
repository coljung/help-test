const path = require('path');
const webpack = require('webpack');
const config = require('config');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const base = require('./webpack.config');

base.entry.unshift('webpack-dev-server/client?http://localhost:4003', 'webpack/hot/only-dev-server');

base.devServer = {
	historyApiFallback: true,
	inline: true,
	hot: true,
	host: '0.0.0.0',
	port: 80,
	clientLogLevel: 'info',
	headers: { 'Access-Control-Allow-Origin': '*' },
    public: 'localhost:4003',
	proxy: {
        '/api': {
            target: 'http://' + config.get('api.host') + ':' + config.get('api.port'),
            pathRewrite: { '^/api': '' },
            secure: false,
        },
    },
};

base.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new ProgressBarPlugin({
		format: chalk.blue.bold(' build [:bar] ') + chalk.magenta.bold(':percent') + ' (:elapsed seconds)',
		clear: false,
		width: 50,
	}),
	new webpack.NoErrorsPlugin(),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development'),
	})
);

module.exports = base;
