import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class Decks extends React.Component {

    isThereAnyDeck(decks) {
        return Object.keys(decks).length > 0
    }

    render() {
        const { decks } = this.props
        return (
            this.isThereAnyDeck(decks)
                ? <View>
                    {decks.map((deck) => (<Text>{JSON.stringify(deck)}</Text>))}
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
