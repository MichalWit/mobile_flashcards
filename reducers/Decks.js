import { ADD_NEW_DECK, ADD_DECKS, ADD_CARD, QUIZ_DECK_TAKEN } from "../actions/Decks"

const decks = (state = {}, action) => {
    switch (action.type) {
        case ADD_DECKS:
            return {
                ...state,
                ...action.decks
            }
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
        case QUIZ_DECK_TAKEN:
            const { dateKey } = action
            const deck = state[action.deckTitle]
            return {
                ...state,
                [action.deckTitle]: {
                    ...deck,
                    takenOn: deck.takenOn.concat([dateKey])
                }
            }
        default:
            return state
    }
}

export default decks
