import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

class IndividualDeck extends React.Component {

    render() {
        ///const { deck } = this.props
        return (
            <View>
                <Text>deck.title</Text>
            </View>
        );
    }
}

function mapStateToProps(state) {

    return {}
}

export default connect(mapStateToProps)(IndividualDeck)
