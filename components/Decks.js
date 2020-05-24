import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
  
function DeckListItem({ deck, navigation }) {

    const initialTitleSize = 26

    const [titleSize] = useState(new Animated.Value(initialTitleSize))

    const navigateToDeck = () => {
        navigation.navigate('IndividualDeck', { title: deck.title })
    }

    const onGoToDeck = () => {
        Animated
            .sequence([
                Animated.timing(titleSize, { toValue: 45, duration: 400}),
                Animated.timing(titleSize, { toValue: initialTitleSize, duration: 400})
            ])
            .start(navigateToDeck)
    }

    return (
        <TouchableWithoutFeedback key={deck.title} onPress={onGoToDeck}>
            <View style={styles.container}>
                <Animated.Text style={{fontSize: titleSize}}>{deck.title}</Animated.Text>
                <Text>{deck.cards.length} cards</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
  
function DeckList({ decks, navigation }) {

    const extractDecks = (decks) => (Object.values(decks))

    return (
        <View style={styles.container}>
            {
                extractDecks(decks)
                    .map((deck) => (<DeckListItem deck={deck} navigation={navigation}/>))
            }
        </View>
    )
}

class Decks extends React.Component {

    isThereAnyDeck(decks) {
        return Object.keys(decks).length > 0
    }

    render() {
        const { decks, navigation } = this.props
        return (
            this.isThereAnyDeck(decks)
                ? <DeckList decks={decks} navigation={navigation}/>
                : <View style={styles.container}>
                    <Text>Please create a deck.</Text>
                </View>
        );
    }
}

function mapStateToProps(state) {

    return {
        decks: state.decks
    }
}

export default connect(mapStateToProps)(Decks)
