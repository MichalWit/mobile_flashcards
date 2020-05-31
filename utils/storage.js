import { AsyncStorage } from 'react-native'

const APP_STATE = 'UdaciFitness:appState'

export const getStateFromStorage = () => {
    return AsyncStorage
        .getItem(APP_STATE)
        .then(JSON.parse)
}

export const saveNewAppState = (state) => {
    return AsyncStorage.setItem(
        APP_STATE,
        JSON.stringify(state)
    )
}
