import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { getTodaysDateKey } from '../utils/date'
import { quizDeckIsTaken } from '../actions/Decks'

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
                                <Button onPress={toggleAnswerShowed} title='Show Question'/>
                        </View>
                    </View>
                    : <View style={styles.container}>
                        <Text style={{fontSize: 26}}>{card.question}</Text>
                        <View style={{marginTop: 10}}>
                            <Button onPress={toggleAnswerShowed} title='Show Answer'/>
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

function CardDeck({ cards, goToDeck, addTakenOnDate }) {

    const [results, setResults] = useState({correct: 0, incorrect: 0})
    const [cardsLeft, setCardsLeft] = useState(cards)

    const headAndTail = (l) => {
        const copy = [...l]
        const head = copy.shift()
        return [head, copy]
    }
    const [cardToDisplay, remainingCards] = headAndTail(cardsLeft)

    const addTakenOnIfLastCard = () => {
        const isLastCard = cardsLeft.length === 1
        if (isLastCard) {
            addTakenOnDate()
        }
    }

    const answeredCorrectly = () => {
        setResults({
            correct: results.correct + 1,
            incorrect: results.incorrect
        })
        setCardsLeft(remainingCards)
        addTakenOnIfLastCard()
    }

    const answeredIncorrectly = () => {
        setResults({
            correct: results.correct,
            incorrect: results.incorrect + 1
        })
        setCardsLeft(remainingCards)
        addTakenOnIfLastCard()
    }

    const resetQuiz = () => {
        setResults({correct: 0, incorrect: 0})
        setCardsLeft(cards)
    }

    return <View style={styles.container}>
        <Text style={{fontSize: 28}}>{(cards.length - results.correct - results.incorrect)} / {cards.length}</Text>
        { cardToDisplay
            ? <Card
                card={cardToDisplay}
                key={cardToDisplay.question}
                answeredCorrectly={answeredCorrectly}
                answeredIncorrectly={answeredIncorrectly}
            />
            : <View style={styles.container}>
                <Text>Deck complete.</Text>
                <Text>Correct answers: {results.correct} ({((results.correct / cards.length) * 100).toFixed(0)}%)</Text>
                <Text>Incorrect answers: {results.incorrect} ({((results.incorrect / cards.length) * 100).toFixed(0)}%)</Text>
                <View style={{marginTop: 10}}>
                    <Button onPress={() => resetQuiz()} title='Restart Quiz'/>
                </View>
                <View style={{marginTop: 10}}>
                    <Button onPress={() => goToDeck()} title='Back to Deck'/>
                </View>
            </View>
        }
    </View>
}

function Quiz({ deck, navigation, quizDeckIsTaken }) {

    const extractCards = (cards) => (Object.values(cards))
    const cards = extractCards(deck.cards)

    const goToDeck = () => {
        navigation.navigate('IndividualDeck', { title: deck.title })
    }
    const addTakenOnDate = () => {
        quizDeckIsTaken(deck.title, getTodaysDateKey())
    }

    return (
        <View>
            {
                cards.length > 0
                    ? <CardDeck
                        cards={cards}
                        goToDeck={goToDeck}
                        addTakenOnDate={addTakenOnDate}
                    />
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

function mapDispatchToProps(dispatch, ownProps) {
    return {
        quizDeckIsTaken: (deckTitle, dateKey) => dispatch(quizDeckIsTaken(deckTitle, dateKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
