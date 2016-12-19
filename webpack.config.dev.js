var path = require('path'),
    nodeModulesPath = path.join(__dirname, '/node_modules/'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    cssExtractor = new ExtractTextPlugin('index.css')

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './client/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname,
        publicPath: '/'
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
            loader: cssExtractor.extract('style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap')
        }, {
            test: /\.css$/,
            loader: cssExtractor.extract('style-loader', 'css-loader')
        }]
    },
    // resolve: {
    //     extensions: ['', '.js', '.jsx'],
    //     alias: {
    //         'react': path.join(nodeModulesPath, '/react/dist/react'),
    //         'react-dom': path.join(nodeModulesPath, '/react-dom/dist/react-dom'),
    //         'redux': path.join(nodeModulesPath, '/redux/dist/redux'),
    //         'react-redux': path.join(nodeModulesPath, '/react-redux/dist/react-redux')
    //     }
    // },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        cssExtractor,
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'cheap-module-eval-source-map'
        // devtool: 'source-map'
}
