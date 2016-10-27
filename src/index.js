import box from './box'

// middlewares
import render from './middlewares/render'
import renderToString from './middlewares/render-to-string'
import events from './middlewares/events'
import component from './middlewares/component'
import normalize from './middlewares/normalize'
import logger from './middlewares/logger'
import error from './middlewares/error'

box.use(render)
box.use(renderToString)
box.use(events)
box.use(logger)
box.use(component)
box.use(normalize)
box.use(error)

export default box
