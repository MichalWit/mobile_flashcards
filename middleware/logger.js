const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log("Received action: ", action)
        const returnValue = next(action)
        console.log("New state: ", store.getState())
    console.groupEnd(action.type)

    return returnValue
}

export default logger
