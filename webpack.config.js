const webpack = require('webpack');
const paths = require('./config/paths');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const publicPath = '/';

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: ['@babel/polyfill', paths.appIndexJs],
    output: {
        path: paths.appBuild,
        filename: 'static/js/bundle.js',
        chunkFilename: '[name].js',
        publicPath: publicPath,
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.md'],
        alias: {
            Src: paths.appSrc,
            Assets: paths.appSrc + '/assets/',
            Components: paths.appSrc + '/components/',
            Modules: paths.appSrc + '/modules/',
            Services: paths.appSrc + '/services/',
            Application: paths.applicationSrc,
            react: require.resolve('react')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.js$/,
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
                test: /\.less$/,
                exclude: /\.module.(less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.module.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]-[hash:base64:5]',
                            camelCase: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(svg|md)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './json/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader'
                }]
            }
        ]
    },
    devServer: {
        hot: false,
        historyApiFallback: true,
        port: 8001
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            SITE_URL: JSON.stringify('//localhost:8080/'),
            ASSETS_URL: JSON.stringify('http://localhost:8080/'),
            API_HOST: JSON.stringify('http://vinhpx.antalyser.adxdev.vn/api/'),
            API_LOGGING: JSON.stringify('http://v1.logging.adx.ants.vn/logging'),
            API_LOGGING_ERROR: JSON.stringify('http://thinhdnp.v3.adxdev.vn/logging/v3.1/'),
            API_ID: JSON.stringify('10507'),
            ST_VERSION: JSON.stringify('1478967892'),
            U_OGS: JSON.stringify('uogs_dev'),
            APPLICATION_ENV: JSON.stringify('development'),
            LANGUAGE: JSON.stringify('vi')
        }),
        new HTMLWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            chunksSortMode: 'none'
        })
    ]
};
