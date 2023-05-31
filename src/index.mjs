import debug from 'debug'

import {
  Pantograph
} from 'shinkansen-pantograph'

const log = debug('zashiki-routing-middleware')

log('`zashiki` is awake')

export default (store) => {
  const {
    OMEGA: {
      ROUTE: OMEGA_ROUTE
    },
    EMBARK: {
      ROUTE: EMBARK_ROUTE
    },
    DEBARK: {
      ROUTE: DEBARK_ROUTE
    },
    ALPHA: {
      ROUTE: ALPHA_ROUTE
    }
  } = Pantograph

  return (next) => (action) => {
    const {
      type
    } = action

    if (
      type === OMEGA_ROUTE ||
      type === EMBARK_ROUTE ||
      type === DEBARK_ROUTE ||
      type === ALPHA_ROUTE
    ) {
      const {
        router
      } = action

      if (router) {
        const {
          location: {
            pathname: currentPathname
          } = {}
        } = router

        const pathname = Pantograph.graphite({
          action: {
            type
          },
          state: store.getState(),
          route: {
            pathname: currentPathname
          }
        })

        if (pathname !== currentPathname) {
          const {
            navigate
          } = router

          navigate(pathname)
        }
      }
    }

    return next(action)
  }
}
