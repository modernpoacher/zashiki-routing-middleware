const debug = require('debug')

const log = debug('zashiki-routing-middleware')

const {
  env: {
    DEBUG = 'zashiki-routing-middleware',
    NODE_ENV = 'development'
  }
} = process

debug.enable(DEBUG)

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
          node: 'current',
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
