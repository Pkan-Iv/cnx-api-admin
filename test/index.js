require( '@babel/polyfill' )
require( '@babel/register' )({
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
  presets: [
    '@babel/preset-env'
  ]
})

// require test's scripts here !
