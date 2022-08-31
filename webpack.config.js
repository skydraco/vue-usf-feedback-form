const VueLoaderPlugin = require('vue-loader/lib/plugin');
var path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");

const config = {
    resolve: {
        alias: {
            '@': path.join(__dirname, './src'),
            'vue': 'vue/dist/vue.js'
        },
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = [
    merge(config, {
      entry: path.resolve(__dirname + '/src/plugin.js'),
      output: {
        filename: 'plugin.min.js',
        libraryTarget: 'window',
        library: 'USFFeedbackForm'
      }
    }),
    merge(config, {
        entry: path.resolve(__dirname + '/src/plugin.js'),
        output: {
            filename: 'index.min.js',
            libraryTarget: 'umd',
            umdNamedDefine: true,
            library: 'USFFeedbackForm'
        }
    }),
];