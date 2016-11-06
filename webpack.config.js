var path = require('path'),
    nodeModulesPath = path.join(__dirname, '/node_modules/'),
    webpack = require('webpack')

module.exports = {
    entry: './public/js/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname
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
        })
    ],
    devtool: 'cheap-module-eval-source-map'
        // devtool: 'source-map'
}
