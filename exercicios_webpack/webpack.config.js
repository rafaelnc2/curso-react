const webpack = require('webpack')
// plugin de extrair texto que será utilizado para ler os arquivos ".css"
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // identifica o ponto de entrada
    entry: './ex/index.js',
    // identifica onde será gerada a saída e qual o nome do arquivo
    output: {
        path: __dirname + '/public',
        filename: './bundle.js'
    },
    // identifica as configurações do servidor de dev
    devServer:{
        // identifica a porta onde o server irá rodar
        port: 8080,
        // identifica onde estão os arquivos base para que o server roda a aplicação
        contentBase: './public'
    },
    plugins:[
        new ExtractTextPlugin('app.css')
    ],
    // identifica quais serão os loaders, plugins e etc que serão utilizados pelo aplicativo
    module: {
        loaders:[{
            // identifica como os arquivos ".js" serão carregados pelo webpack
            test: /.js?$/,
            loader: 'babel-loader', // deve ser incluido como dependência no "packge.json"
            exclude: '/node_modules/', // informa ao webpack que o loader não deve ler arquivos que estão dentro do "node_modules"
            // identifica o que deve ser interpretado pelo webpack 
            query:{
                // identifica quais serão os presets que devem ser traduzidos para o browser
                // faz com que o browser entenda o sistema de "import" e "export" do ecma script 2015
                // faz com que o browser entenda o "jsx" e os formatos específicos do react 
                presets:['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        },{
            // identifica como os arquivos ".css" serão carregados pelo webpack
            test: /.css?$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }]
    }
}