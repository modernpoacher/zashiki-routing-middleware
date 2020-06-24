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
          'last 2 versions'
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
