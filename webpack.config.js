const extractTextPlugin = require( 'extract-text-webpack-plugin' )
const path = require( 'path' )
const { DefinePlugin, HotModuleReplacementPlugin } = require( 'webpack' )
const TerserPlugin = require( 'terser-webpack-plugin' )

const alias = {}
const home = path.resolve( __dirname, 'static' )
const optimization = {}
const entry = {
  index: './main.js'
}

const exclude = [
  path.resolve( __dirname, 'node_modules' ),
  path.resolve( __dirname, 'static' ),
  path.resolve( __dirname, 'test' ),
  home
]

const output = {
  filename: 'index.js',
  path: home
}

const plugins = []
const style = []
const tools = {}

module.exports = (env, argv) => {
  const mode = argv.mode || 'development'

  plugins.push(
    new DefinePlugin({
      WEBPACK_MODE: JSON.stringify( mode )
    })
  )

  plugins.push(
    new extractTextPlugin({
      filename: 'index.css'
    })
  )

  style.push(
    extractTextPlugin.extract({
      fallback: 'style-loader',
      use: [ 'css-loader' ]
    })
  )

  if (mode === 'development') {
    plugins.push(new HotModuleReplacementPlugin())

    tools.devServer = {
      contentBase: home,
      port: 1340
    }

    tools.devtool = 'source-map'
  }
  else if (mode === 'production') {
    output.filename = 'index.min.js'

    optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          output: {
            comments: false
          }
        }
      })
    ]
  }

  return [
    {
      ...tools,

      entry,

      mode: 'development',

      module: {
        rules: [
          {
            test: /\.css$/,
            exclude,
            use: style.length === 1 ? style[0] : style
          },
          {
            test: /\.js$/,
            exclude,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [],
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                  ]
                }
              }
            ]
          }
        ]
      },

      optimization,
      output,

      performance: {
        hints: false
      },

      plugins,

      resolve: {
        modules: [
          __dirname,
          path.resolve( __dirname, 'node_modules' )
        ],

        alias
      },

      target: 'web'
    }
  ]
}
