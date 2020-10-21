const path = require('path');
const paths = require('./config/paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: [paths.appBuildJs],
    output: {
        path: path.resolve('build'),
        filename: 'main.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            Src: path.resolve(__dirname, 'src/'),
            Assets: path.resolve(__dirname, 'src/assets/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Modules: path.resolve(__dirname, 'src/modules/'),
            Services: paths.appSrc + '/services/',
            Application: paths.applicationSrc
        }
    },
    externals: {
        react: 'commonjs react',
        'react-dom': 'commonjs react-dom'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /\.module.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /\.module.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
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
                test: /\.module.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: 'ants-[local]-[hash:base64:5]',
                            camelCase: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[contenthash].[ext]'
                        }
                    }
                ]
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './json/[contenthash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './fonts/[contenthash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};
