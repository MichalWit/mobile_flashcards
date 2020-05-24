import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

class IndividualDeck extends React.Component {

    onNewCardButtonPress = () => {
        const { navigation, deck } = this.props
        navigation.navigate('AddCard', { deckTitle: deck.title })
    }

    onStartQuizButtonPress = () => {
        const { navigation, deck } = this.props
        navigation.navigate('Quiz', { deckTitle: deck.title })
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 26}}>{deck.title}</Text>
                <Text style={{marginTop: 10}}>{deck.cards.length} cards</Text>
                <View style={{marginTop: 10}}>
                    <Button
                        onPress={this.onNewCardButtonPress}
                        title="Add Card"
                        color="#841584"
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <Button
                        onPress={this.onStartQuizButtonPress}
                        title="Start Quiz"
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { title } = ownProps.route.params
    return {
        deck: state.decks[title]
    }
}

export default connect(mapStateToProps)(IndividualDeck)
