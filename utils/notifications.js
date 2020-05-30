import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'UdaciFitness:notifications'

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(AsyncStorage.cancelAllScheduledNotificationsAsync)
}

const createLocalNotification = () => {
    return {
        title: 'You haven\'t taken any quiz deck today',
        body: 'In order to make progress, take at lease one quiz a day',
        ios: {
            sound: true
        },
        android: {
            sound: true
        },
        web: {
            badge: 'badge?',
            body: 'body?'
        }
    }
}

const tomorrowAtEight = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getTime() + 1)
    tomorrow.setHours(20)
    return tomorrow
}

const todayAtEight = () => {
    const today = new Date()
    today.setHours(20)
    return today
}

const scheduleLocalNotification = (scheduleTime) => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((notification) => {
            const noNotificationIsDisplayed = notification === null
            if (noNotificationIsDisplayed) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            Notifications.scheduleLocalNotificationAsync(
                                createLocalNotification(),
                                {
                                    time: scheduleTime,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify({notified: true}))
                        }
                    })
            }
        })
}

export const scheduleLocalNotificationStartingToday = () => {
    scheduleLocalNotification(todayAtEight())
}

export const scheduleLocalNotificationStartingTomorrow = () => {
    scheduleLocalNotification(tomorrowAtEight())
}
