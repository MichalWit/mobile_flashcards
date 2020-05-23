import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/Decks'
import { State } from 'react-native-gesture-handler';

function Quiz({ deck }) {

    const onQuizFinish = () => {
        navigation.navigate('IndividualDeck', { title: deck.title })
    }

    return (
        <View>
            {
                deck.cards.length > 0
                    ? <View>{deck.cards.map((card) => (<Text>{card.question} | {card.answer}</Text>))}</View>
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

function mapDispatchToProps(dispatch, ownProps) {
    const { deckTitle } = ownProps.route.params
    return {
        // TODO
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
