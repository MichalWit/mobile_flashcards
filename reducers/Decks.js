import { ADD_NEW_DECK, ADD_CARD } from "../actions/Decks"

const decks = (state = {}, action) => {
    switch (action.type) {
        case ADD_NEW_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_CARD:
            const { deckTitle, card } = action
            const oldDeck = state[deckTitle]
            return {
                ...state,
                [deckTitle]: {
                    ...oldDeck,
                    cards: {
                        ...oldDeck.cards,
                        [card.question]: card
                    }
                }
            }
        default:
            return state
    }
}

export default decks
