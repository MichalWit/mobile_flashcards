export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_CARD = 'ADD_CARD'

export function addNewDeck(deck) {
    return {
        type: ADD_NEW_DECK,
        deck
    }
}

export function addCard(deckTitle, card) {
    return {
        type: ADD_CARD,
        deckTitle,
        card
    }
}
