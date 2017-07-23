import {
  browserHistory as history
} from 'react-router'

import {
  Pantograph
} from 'shinkansen-pantograph'

export default function routingMiddleware (store) {
  const last = (action) => (
    Pantograph.graphite({ history, store, action })
  )
  return (next) => (action) => last(next(action)) || action
}
