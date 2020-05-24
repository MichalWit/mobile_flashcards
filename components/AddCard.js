import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions/Decks'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function AddCard({ addCard, navigation, route }) {

    const [question, onChangeQuestion] = useState('');
    const [answer, onChangeAnswer] = useState('');

    const onCreateCardPress = () => {
        addCard(
            {
                question,
                answer
            }
        )
        const { deckTitle } = route.params
        onChangeAnswer('')
        onChangeQuestion('')
        navigation.navigate('IndividualDeck', { title: deckTitle })
    }

    return (
        <View style={styles.container}>
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
            <View style={{marginTop: 10}}>
                <Button
                    onPress={onCreateCardPress}
                    title="Submit"
                />
            </View>
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
