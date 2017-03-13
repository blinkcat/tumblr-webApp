var path = require('path'),
    nodeModulesPath = path.join(__dirname, '/node_modules/'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    nunjucksHTML = require('./plugins/nunjucksHTML'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    cssExtractor = new ExtractTextPlugin('index.[contenthash].css')

module.exports = {
    entry: {
        app: './client/index.js',
        vendor: ['react']
    },
    output: {
        filename: 'bundle.[hash].js',
        path: __dirname + '/build'
    },
    module: {
        noParse: [path.join(nodeModulesPath, '/react/dist/react')],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.(gif|jpg|png|woff2|eot)\??.*$/,
            loader: 'url?limit=3072'
        }, {
            test: /\.scss$/,
            loader: cssExtractor.extract('style-loader', 'css-loader!sass-loader')
        }, {
            test: /\.css$/,
            loader: cssExtractor.extract('style-loader', 'css-loader')
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        cssExtractor,
        new nunjucksHTML(),
        new CleanWebpackPlugin(['build'], {
            root: '.'
        })
    ]
}
