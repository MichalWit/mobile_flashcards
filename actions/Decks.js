export const ADD_NEW_DECK = 'ADD_NEW_DECK'
export const ADD_CARD = 'ADD_CARD'
export const QUIZ_DECK_TAKEN = 'QUIZ_DECK_TAKEN'

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

export function quizDeckIsTaken(deckTitle, dateKey) {
    return {
        type: QUIZ_DECK_TAKEN,
        deckTitle,
        dateKey
    }
}
