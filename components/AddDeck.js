import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addNewDeck } from '../actions/Decks';

function AddDeck() {

    const [title, onChangeText] = useState('');
    const dispatch = useDispatch()

    const createNewDeck = () => {
      return {
        title,
        cards:[]
      }
    }

    const onNewDeckButtonPress = () => {
      dispatch(
        addNewDeck(
          createNewDeck()
        )
      )
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => onChangeText(text)}
          value={title}
        />
        <Button
          onPress={onNewDeckButtonPress}
          title="Create"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
}

export default connect()(AddDeck)
