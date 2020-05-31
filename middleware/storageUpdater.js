import { saveNewAppState } from '../utils/storage'

const storageUpdater = (store) => (next) => (action) => {
    const returnValue = next(action)
    const newState = store.getState()

    saveNewAppState(newState)

    return returnValue
}

export default storageUpdater
