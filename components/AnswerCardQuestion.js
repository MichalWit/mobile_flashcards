import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/Decks'

function AnswerCardQuestion({ addCard, navigation, route }) {

    const [question, onChangeQuestion] = useState('');
    const [answer, onChangeAnswer] = useState('');

    const onSubmitPress = () => {
        addCard(
            {
                question,
                answer
            }
        )
        const { deckTitle } = route.params
        navigation.navigate('IndividualDeck', { title: deckTitle })
    }

    return (
        <View>
            <Text>Question</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeQuestion(text)}
                value={question}
            />
            <Text>Answer</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeAnswer(text)}
                value={answer}
            />
            <Button
                onPress={onSubmitPress}
                title="Submit"
                color="#841584"
            />
        </View>
    );
}

function mapDispatchToProps(dispatch, ownProps) {
    const { deckTitle } = ownProps.route.params
    return {
        addCard: (card) => dispatch(addCard(deckTitle, card))
    }
}

export default connect(null, mapDispatchToProps)(AddCard)
