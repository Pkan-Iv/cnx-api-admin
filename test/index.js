require( '@babel/polyfill' )
require( '@babel/register' )({
  plugins: [
    [ '@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime'
  ],
  presets: [
    '@babel/preset-env'
  ]
})

// require test's scripts here !
