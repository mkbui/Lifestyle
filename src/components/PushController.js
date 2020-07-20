import PushNotification from 'react-native-push-notification'
const splashLogo = require('../../assets/bootLogo.jpg');

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification)
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
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

/* Scheduled notification as weekly alarm */
export const ScheduledAlarmNotification = (activity, weekDay) => {
  
  title = 'This is a scheduled notification';
  date = new Date(Date.now() + 3 * 1000);  // default go off after 3 seconds
  
  var id;
  var hour, min, overhead;
  var now = new Date();
  var today = now.getDay();
  var year, month, day; year = now.getFullYear(); month = now.getMonth(); day = now.getDate();
  
  if (activity){
    id = new Date(activity.id.getTime() + weekDay) //activity.id + weekDay // concatenate id with weekday for unique id\
    console.log(id)
    title = activity.name;
    if (activity.hour) hour = activity.hour;
    if (activity.min) min = activity.min;
    overhead = weekDay - today;
    if (overhead < 0) overhead += 7;
    day = parseInt(day) + parseInt(overhead);
    date = new Date(parseInt(year), parseInt(month), day, hour, min, 3);
    console.log(date)
  }

  

  //console.log((date - Date.now())/1000);

  return PushNotification.localNotificationSchedule({
    id: id,
    autoCancel: true,
    largeIcon: splashLogo,
    bigText: title,
    subText: 'T.I.M.E.R',
    title: 'LIFESTYLE NOTIFICATION',
    message: 'Expand to see more',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    allowWhileIdle: true,
    date: date,
    repeatType: 'week',
  })

}

export const DailyReminder = (reminder) => {
  var title, time, hour, min, date, message;
  var now = new Date(); var year = now.getFullYear(); var month = now.getMonth(); var day = now.getDate();
  if (reminder){
    title = reminder.title;
    if (reminder.message) message = reminder.message;
    time = reminder.time; hour = time.hour; min = time.min;
    date = new Date(year, month, day, hour, min, 0);
  }
  var id = reminder.id;
  return PushNotification.localNotificationSchedule({
    id: id,
    autoCancel: true,
    largeIcon: splashLogo,
    bigText: title,
    subText: 'Reminder',
    title: 'LIFESTYLE NOTIFICATION',
    message: message,
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["OK"]',
    allowWhileIdle: true,
    date: date,
    repeatType: 'day',
  })
}

/* Scheduled notification for one specific time only */
export const ScheduledNotification = (time) => {
  var now = new Date();
  
  
  console.log("Default Noti")
  title = 'This is a scheduled notification';
  date = new Date(Date.now() + 3 * 1000);  // default go off after 3 seconds
  

  return PushNotification.localNotificationSchedule({
    id: date, 
    autoCancel: true,
    largeIcon: splashLogo,
    bigText: title,
    subText: 'T.I.M.E.R',
    title: 'LIFESTYLE NOTIFICATION',
    message: 'Expand to see more',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',  //'android.resource://com.xyz/raw/Yoooo',
    actions: '["Yes", "No"]',
    allowWhileIdle: true,
    date: date,
    repeatType: 'day',
  })
  
  //PushNotification.cancelLocalNotifications({id: id});
}

export const CancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
  CancelAllNotification()
  ToastAndroid.show(
    "All notifications removed",
    ToastAndroid.SHORT
  )
  initializeReminders()
}

export const CancelNotification = (id) => {
  PushNotification.cancelLocalNotifications({id: id});
}