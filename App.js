import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { createStore } from 'redux';
import reducers from './reducers'
import middleware from './middleware';

const Tab = createBottomTabNavigator();

const store = createStore(reducers, middleware)

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={Decks} />
          <Tab.Screen name="New Deck" component={AddDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// TODO
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
