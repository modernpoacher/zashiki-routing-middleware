const debug = require('debug')

const log = debug('zashiki-routing-middleware')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`zashiki-routing-middleware` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env', {
      useBuiltIns: 'usage',
      targets: {
        node: '12.18.1',
        browsers: [
          'last 4 versions',
          'safari >= 9',
          'ios >= 8',
          'ie >= 9',
          '> 2%'
        ]
      },
      corejs: 3
    }
  ],
  '@babel/react'
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    compact: true,
    comments: false,
    presets
  }
}
