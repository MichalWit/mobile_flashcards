import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function Card({ card, answeredCorrectly, answeredIncorrectly }) {

    const [answerShowed, setAnswerShowed] = useState(false)

    const toggleAnswerShowed = () => { setAnswerShowed(!answerShowed) }

    return (
        <View style={styles.container}>
            {
                answerShowed
                    ? <View style={styles.container}>
                        <Text style={{fontSize: 26}}>{card.answer}</Text>
                        <View style={{marginTop: 10}}>
                                <Button onPress={toggleAnswerShowed} title='Question'/>
                        </View>
                    </View>
                    : <View style={styles.container}>
                        <Text style={{fontSize: 26}}>{card.question}</Text>
                        <View style={{marginTop: 10}}>
                            <Button onPress={toggleAnswerShowed} title='Answer'/>
                        </View>
                    </View>
            }
            <View>
                <View style={{marginTop: 10}}>
                    <Button onPress={answeredCorrectly} title='Correct' color='green'/>
                </View>
                <View style={{marginTop: 10}}>
                    <Button onPress={answeredIncorrectly} title='Incorrect' color='red'/>
                </View>
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
        : <View style={styles.container}>
            <Text>Deck complete.</Text>
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
                    : <View style={styles.container}>
                        <Text>Sorry, you cannot take the quiz, because there are no cards in the deck.</Text>
                    </View>
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
