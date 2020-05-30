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

const Stack = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="New Deck" component={AddDeck} />
    </Tab.Navigator>
  );
}

function Main() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="AddDeck" component={AddDeck} />
      <Stack.Screen name="IndividualDeck" component={IndividualDeck} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
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
        <Main/>
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
