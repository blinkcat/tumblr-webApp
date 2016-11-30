var path = require('path'),
    nodeModulesPath = path.join(__dirname, '/node_modules/'),
    webpack = require('webpack')
    // ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        app: './client/js/index.js',
        vendor: ['react']
    },
    output: {
        filename: 'bundle.js',
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
            test: /\.css$/,
            loader: 'style!css?sourceMap'
        }, {
            test: /\.scss$/,
            loader: 'style!css?sourceMap!sass?sourceMap'
        }, {
            test: /\.(gif|jpg|png|woff2|eot)\??.*$/,
            loader: 'url?limit=3072'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
}