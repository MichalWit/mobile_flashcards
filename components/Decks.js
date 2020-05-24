import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

// TODO
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
  
function DeckList({ decks }) {

    const extractDecks = (decks) => (Object.values(decks))

    return (
        <View style={styles.container}>
            {
                extractDecks(decks)
                    .map((deck) => (
                        <View style={styles.container} key={deck.title}>
                            <Text style={{size: 15}}>{deck.title}</Text>
                            <Text>{deck.cards.length} cards</Text>
                        </View>
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
        const { decks } = this.props
        return (
            this.isThereAnyDeck(decks)
                ? <DeckList decks={decks}/>
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
