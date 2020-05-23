import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class Decks extends React.Component {

    isThereAnyDeck(decks) {
        return Object.keys(decks).length > 0
    }

    extractDecks(decks) {
        return Object.values(decks)
    }

    render() {
        const { decks } = this.props
        return (
            this.isThereAnyDeck(decks)
                ? <View>
                    {this.extractDecks(decks).map((deck) => (
                        <Text key={deck.title}>{deck.title}</Text>
                    ))}
                </View>
                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
