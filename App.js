import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
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
import { addDecks } from './actions/Decks';
import { getDateKey, getTodaysDateKey } from './utils/date'
import { scheduleLocalNotificationStartingToday } from './utils/notifications'
import { getStateFromStorage, saveNewAppState } from './utils/storage'

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

  const addTestDeck = () => {
    const today = new Date()
    today.setDate(today.getDate() - 1)
    const yesterday = new Date(today)

    return saveNewAppState({
      decks: {
        "Test Deck": {
          title: "Test Deck",
          cards: {
            "A?": {question: "A?", answer: "Y."},
            "B?": {question: "B?", answer: "N!"}
          },
          takenOn: [ getDateKey(yesterday) ]
        }
      }
    })
  }

  const findDeckTakenToday = (decks, todaysKey) => {
    const deckMaybe = decks
      .find((deck) => {
        const takenOnMaybe = deck.takenOn
          .find((takenOnDate) => (takenOnDate === todaysKey))
        return takenOnMaybe !== undefined
      })
    return deckMaybe
  }

  const scheduleNotificationForTodayIfNoneTaken = (decks) => {
    const todaysKey = getTodaysDateKey()
    const deckValues = Object.values(decks)

    const deckMaybe = findDeckTakenToday(deckValues, todaysKey)
    const aDeckBeenTakenDoday = deckMaybe !== undefined

    if (!aDeckBeenTakenDoday) {
      scheduleLocalNotificationStartingToday()
    }
  }

  useEffect(() => {
    addTestDeck()
      .then(() => {
        getStateFromStorage()
          .then((currentState) => {
            const { decks } = currentState
            store.dispatch(addDecks(decks))
            scheduleNotificationForTodayIfNoneTaken(decks)
          })
      })
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    </Provider>
  );
}
