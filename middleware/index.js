import { applyMiddleware } from 'redux'
import logger from './logger'
import storageUpdater from './storageUpdater'

export default applyMiddleware(
    logger,
    storageUpdater
)
