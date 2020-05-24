import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

// TODO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
  
function DeckList({ decks, navigation }) {

    const extractDecks = (decks) => (Object.values(decks))

    const onGoToDeck = (deckTitle) => {
        navigation.navigate('IndividualDeck', { title: deckTitle })
    }

    return (
        <View style={styles.container}>
            {
                extractDecks(decks)
                    .map((deck) => (
                        <TouchableWithoutFeedback onPress={() => onGoToDeck(deck.title)}>
                            <View style={styles.container} key={deck.title}>
                                <Text style={{size: 15}}>{deck.title}</Text>
                                <Text>{deck.cards.length} cards</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
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

function mapStateToProps(state, ownProps) {

    return {
        decks: state.decks//,
        //navigation: ownProps.navigation
    }
}

export default connect(mapStateToProps)(Decks)
