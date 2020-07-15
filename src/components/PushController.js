import PushNotification from 'react-native-push-notification'

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios'
})

export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'You pressed a notification button.',
    subText: 'There is nothing else here',
    title: 'LIFESTYLE NOTIFICATION',
    message: 'Expand to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]'
  })
}

/* Scheduled notification for one specific time only */
export const ScheduledNotification = (time) => {
  var now = new Date()
  PushNotification.localNotificationSchedule({
    autoCancel: true,
    bigText: time.title,
    subText: 'T.I.M.E.R',
    title: 'LIFESTYLE NOTIFICATION',
    message: 'Expand to see more',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.hour, time.minute)
    //date: new Date(Date.now() + 3 * 1000) // in 3 secs
  })
}