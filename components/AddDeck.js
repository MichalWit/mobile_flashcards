import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addNewDeck } from '../actions/Decks';

function AddDeck({ navigation }) {

    const [title, onChangeTitle] = useState('');
    const dispatch = useDispatch()

    const createNewDeck = () => {
      return {
        title,
        cards: {},
        takenOn: []
      }
    }

    const onNewDeckButtonPress = () => {
      const newDeck = createNewDeck()
      dispatch(addNewDeck(newDeck))

      const title = newDeck.title
      navigation.navigate('IndividualDeck', { title })
      onChangeTitle('')
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
          onChangeText={text => onChangeTitle(text)}
          value={title}
        />
        <View style={{marginTop: 10}}>
          <Button
            onPress={onNewDeckButtonPress}
            title="Create Deck"
          />
        </View>
      </View>
    );
}

export default connect()(AddDeck)
