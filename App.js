import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, Screen } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import { createStore } from 'redux';
import reducers from './reducers'
import middleware from './middleware';
import IndividualDeck from './components/IndividualDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { addNewDeck } from './actions/Decks';
import { getDateKey } from './utils/date'
import { scheduleLocalNotificationStartingToday } from './utils/notifications'

const Tab = createBottomTabNavigator();

const AddDeckStack = createStackNavigator();
 
function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen name="AddDeck" component={AddDeck} />
      <AddDeckStack.Screen name="IndividualDeck" component={IndividualDeck} />
      <AddDeckStack.Screen name="AddCard" component={AddCard} />
      <AddDeckStack.Screen name="Quiz" component={Quiz} />
    </AddDeckStack.Navigator>
  );
}

const store = createStore(reducers, middleware)

export default function App() {

  useEffect(() => {

    const today = new Date();
    today.setDate(today.getDate() - 1); // yesterday effectively
    const yesterday = new Date(today);

    store.dispatch(
      addNewDeck(
        {
          title: "Test Deck",
          cards: {
            "A?": {question: "A?", answer: "Y."},
            "B?": {question: "B?", answer: "N!"}
          },
          takenOn: [ getDateKey(yesterday) ]
        }
      )
    )

    scheduleLocalNotificationStartingToday()
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Decks" component={Decks} />
          <Tab.Screen name="New Deck" component={AddDeckStackScreen} />
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
