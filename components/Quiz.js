import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { getTodaysDateKey } from '../utils/date'
import { quizDeckIsTaken } from '../actions/Decks'
import { clearLocalNotification, scheduleLocalNotificationStartingTomorrow } from '../utils/notifications'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    }
})

class Card extends React.Component {

    state = {
        answerShowed: false
    }

    setAnswerShowed = (value) => {
        this.setState({
            answerShowed: value
        })
    }

    toggleAnswerShowed = () => {
        this.setState((state) => ({
            answerShowed: !state.answerShowed
        }))
    }

    render() {
        const { answerShowed } = this.state
        const { card, answeredCorrectly, answeredIncorrectly } = this.props
        return (
            <React.Fragment>
                {
                    answerShowed
                        ? <React.Fragment>
                            <Text style={{fontSize: 26}}>{card.answer}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.toggleAnswerShowed}
                                >
                                    <Text>Show Question</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </React.Fragment>
                        : <React.Fragment>
                            <Text style={{fontSize: 26}}>{card.question}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.toggleAnswerShowed}
                                >
                                    <Text>Show Answer</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                }
                <View style={styles.buttonContainer}>
                    <Button onPress={answeredCorrectly} title='Correct' color='green'/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={answeredIncorrectly} title='Incorrect' color='red'/>
                </View>
            </React.Fragment>
        );
    }
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

    const addTakenOnAndRescheduleNotificationsIfLastCard = () => {
        const isLastCard = cardsLeft.length === 1
        if (isLastCard) {
            addTakenOnDate()
            clearLocalNotification().then(scheduleLocalNotificationStartingTomorrow)
        }
    }

    const answeredCorrectly = () => {
        setResults({
            correct: results.correct + 1,
            incorrect: results.incorrect
        })
        setCardsLeft(remainingCards)
        addTakenOnAndRescheduleNotificationsIfLastCard()
    }

    const answeredIncorrectly = () => {
        setResults({
            correct: results.correct,
            incorrect: results.incorrect + 1
        })
        setCardsLeft(remainingCards)
        addTakenOnAndRescheduleNotificationsIfLastCard()
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
        <View style={styles.container}>
            {
                cards.length > 0
                    ? <CardDeck
                        cards={cards}
                        goToDeck={goToDeck}
                        addTakenOnDate={addTakenOnDate}
                    />
                    : <View>
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
