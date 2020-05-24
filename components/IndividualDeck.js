import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/Decks'

class IndividualDeck extends React.Component {

    onNewCardButtonPress = () => {
        const { navigation, deck } = this.props
        navigation.navigate('AddCard', { deckTitle: deck.title })
    }

    onStartQuizButtonPress = () => {
        const { navigation, deck } = this.props
        navigation.navigate('Quiz', { deckTitle: deck.title })
    }

    render() {
        const { deck } = this.props
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text>{deck.cards.length} cards</Text>
                <Button
                    onPress={this.onNewCardButtonPress}
                    title="Add Card"
                    color="#841584"
                />
                <Button
                    onPress={this.onStartQuizButtonPress}
                    title="Start Quiz"
                    color="#841584"
                />
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { title } = ownProps.route.params
    return {
        deck: state.decks[title]
    }
}

export default connect(mapStateToProps)(IndividualDeck)
