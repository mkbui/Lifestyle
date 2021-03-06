import PushNotification from 'react-native-push-notification'
import {View, ToastAndroid} from 'react-native';
import {initializeReminders} from '../utils';
const splashLogo = require('../../assets/bootLogo.png');

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
    id = activity.id * 10 + weekDay //activity.id + weekDay // concatenate id with weekday for unique id\
    title = activity.name;
    if (activity.hour) hour = activity.hour;
    if (activity.min) min = activity.min;
    overhead = weekDay - today;
    if (overhead < 0) overhead += 7;
    day = parseInt(day) + parseInt(overhead);
    if (((hour * 60 + min) < (now.getHours() * 60 + now.getMinutes())) && (day === now.getDate()))
      day += 7
    date = new Date(parseInt(year), parseInt(month), day, hour, min, 3);

  }
  return PushNotification.localNotificationSchedule({
    id: `${id}`,
    userInfo: {id: id},
    autoCancel: true,
    largeIcon: splashLogo,
    bigText: 'LIFESTYLE NOTIFICATION',
    subText: 'T.I.M.E.R',
    title: title,
    message: 'Expand to see more',
    vibrate: true,
    vibration: 500,
    playSound: true,
    soundName: 'default',
    actions: '["OK"]',
    allowWhileIdle: true,
    date: date,
    repeatType: 'week',
  })
}



export const DailyRemind = (reminder) => {
  var title, time, hour, min, date, message;
  var now = new Date(); var year = now.getFullYear(); var month = now.getMonth(); var day = now.getDate();
  if (reminder){
    title = reminder.title;
    if (reminder.message) message = reminder.message;
    time = reminder.time; hour = time.hour; min = time.min;
    off = 0;
    if (hour < now.getHours() || (hour === now.getHours() && min <= now.getMinutes())) off = 1
    date = new Date(year, month, day + off, hour, min, 0);
  }
  console.log(date);
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
  ToastAndroid.show(
    "All notifications removed",
    ToastAndroid.SHORT
  )
}

export const CancelNotification = (id) => {
  PushNotification.cancelLocalNotifications({id: `${id}`});
}