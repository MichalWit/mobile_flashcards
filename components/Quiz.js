import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

function Card({ card, answeredCorrectly, answeredIncorrectly }) {

    const [answerShowed, setAnswerShowed] = useState(false)

    const toggleAnswerShowed = () => { setAnswerShowed(!answerShowed) }

    return (
        <View>
            {
                answerShowed
                    ? <View>
                        <Text>{card.answer}</Text>
                        <Button onPress={toggleAnswerShowed} title='Question'/>
                    </View>
                    : <View>
                        <Text>{card.question}</Text>
                        <Button onPress={toggleAnswerShowed} title='Answer'/>
                    </View>
            }
            <View>
                <Button onPress={answeredCorrectly} title='Correct'/>
                <Button onPress={answeredIncorrectly} title='Incorrect'/>
            </View>
        </View>
    );
}

function CardDeck({ cards }) {

    const [results, setResults] = useState({correct: 0, incorrect: 0})
    const [cardsLeft, setCardsLeft] = useState(cards)

    const headAndTail = (l) => {
        const copy = [...l]
        const head = copy.shift()
        return [head, copy]
    }
    const [cardToDisplay, remainingCards] = headAndTail(cardsLeft)

    const answeredCorrectly = () => {
        setResults({
            correct: results.correct + 1,
            incorrect: results.incorrect
        })
        setCardsLeft(remainingCards)
    }

    const answeredIncorrectly = () => {
        setResults({
            correct: results.correct,
            incorrect: results.incorrect + 1
        })
        setCardsLeft(remainingCards)
    }

    return cardToDisplay
        ? <Card
            card={cardToDisplay}
            key={cardToDisplay.question}
            answeredCorrectly={answeredCorrectly}
            answeredIncorrectly={answeredIncorrectly}
        />
        : <View>
            <Text>Deck complete. {JSON.stringify(results)}</Text>
            <Text>Correct answers: {results.correct} ({((results.correct / (results.correct + results.incorrect)) * 100).toFixed(0)}%)</Text>
            <Text>Incorrect answers: {results.incorrect} ({((results.incorrect / (results.correct + results.incorrect)) * 100).toFixed(0)}%)</Text>
        </View>
}

function Quiz({ deck }) {

    const extractCards = (cards) => (Object.values(cards))
    const cards = extractCards(deck.cards)

    return (
        <View>
            {
                cards.length > 0
                    ? <CardDeck cards={cards}/>
                    : <View>Sorry, you cannot take the quiz, because there are no cards in the deck.</View>
            }
        </View>
    );
}

function mapStateToProps(state, ownProps) {
    const { deckTitle } = ownProps.route.params
    return {
        deck: state.decks[deckTitle]
    }
}

export default connect(mapStateToProps)(Quiz)
