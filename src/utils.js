import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
} from 'native-base';
import {reminderList} from './data/reminder'
import {
  ScheduledAlarmNotification, 
  ScheduledNotification, 
  CancelNotification, 
  DailyReminder
} from './components/PushController'

/* transform React Date() format to dd-mm-yyyy */
export function getDateString(){
  const date = new Date();
  var zD = (date.getDate() < 10 ? '0' : '')
  var zM = (date.getMonth()+1<10 ? '0' : '')
  const dateString = zD + date.getDate() + '-' + zM + (date.getMonth()+1) + '-' + date.getFullYear();
  return dateString;
}


export function addAlarmNoti(activity){
  //ScheduledNotification();
  var i;
  let rep = activity.repeat;
  for (i = 0; i < 7; i++) {
    if (rep[i].value === true){
      ScheduledAlarmNotification(activity, i);
    }
  }
}

export function removeAlarmNoti(activity){
  var i;
  let rep = activity.repeat;
  for (i = 0; i < 7; i++) {
    if (rep[i].value === true){
      index = new Date(activity.id.getTime() + i)
      console.log(index)
      CancelNotification(index);
    }
  }
}

/*
{
"DailyRecord":{
  "Finance": {"date": "16/6/2020", "earned": 0, "spent": 0}, 
  "Fitness": {"date": "16/6/2020", "energyBurned": 0, "energyConsumed": 0, "waterConsumed": 0, "weight": "79"}, 
  "date": "16/6/2020"}, 
"FinanceRecord": 
  [null, {"date": "14/6/2020", "earned": 0, "spent": 0}], 
"FitnessRecord": 
  [
    {"date": "13/6/2020", "energyBurned": 0, "energyConsumed": 0, "waterConsumed": 0, "weight": 100}, 
    {"date": "14/6/2020", "energyBurned": 0, "energyConsumed": 0, "waterConsumed": 0, "weight": "79"}
  ], 
"Info": {"age": "22", "gender": "male", "height": "180", "name": "$¢@√€πG£®", "registered": true, "weight": "79"}, 
"Measure": {"BMI": 24.382716049382715, "BMR": 2534}}
*/

/* looping through filter list to see if the item does match */
export function checkFilter(name, filterList) {
  let res = false;
  filterList.map(item => {
    if (item.name === name && item.checked === true) {res = true;}
  })
  return res;
};

/* Initialize all reminders and suggestion for user daily (called when register/ reset notif) */
export function initializeReminders(){
  reminderList.map(reminder => {
    DailyReminder(reminder)
  })
}

/* Return simple advice based on user info */
export function fitnessAnalyzer(Record, Today){
  const waterCount = (water) => {
    if (water < 500) 
      return <Text style = {styles.script}>Your water consumption is dangerously low today!
        remember to fill in at least 2 litre of water (including in food) for a decent hydration</Text>
    if (water < 2000)
      return <Text style = {styles.script}>It seems you are not drinking enough water.
        Try to fill in {2000 - water}ml more today to achieve better hydration!</Text>
    if (water < 3500)
      return <Text style = {styles.script}>Your water consumption is good today!</Text>
    return <Text style = {styles.script}>You are drinking to much water! Try to lower your daily
      HydroDioxide consumption to avoid water intoxication.</Text>
  }

  const energyCons = (consumed, burned) => {
    if (consumed - burned > 1500)
      return <Text style = {styles.script}>You are consuming more than your body burns! Try
        balancing your diet and exercise more.</Text>
    if (consumed - burned < 1000)
      return <Text style = {styles.script}>You are not accumulating enough energy for body
        function! Try to consume more calories to match your active level.</Text>    

      return <Text style = {styles.script}>Your energy balance is generally good for metabolism!
        Try to consistently keep this progress to match your goal.</Text>  
  }

  const exercise = (time) => {
    if (time < 30)
      return <Text style = {styles.script}>Also, please consider exercising a little bit more each day
        to maintain a fresh condition. Even 30 minutes of light jogging is enough.</Text>
    if (time > 120)
      return <Text style = {styles.script}>It looks like you are enjoying workouts really fondly. However,
        note that overexercising can cause exhaustion and side effects, so do it at a maintainable rate.</Text>
      return <Text style = {styles.script}>Good job with your exercise today! Let's hope you could improve
        your workrate and duration tomorrow.</Text> 
  }

  const overall = (todays) => {
    return <Text style = {styles.script}>You are in good health today!</Text>
  }

  return(
    <View>
      {overall(Today)}
      {waterCount(Today.waterConsumed)}
      {energyCons(Today.energyConsumed, Today.energyBurned)}
    </View>
  )
}

/* Return simple financial advice on user budget */
export function financeAnalyzer(money, Today){
  const checkBalance = (spent, earned) => {
    if (spent - earned > 50000) 
      return <Text style = {styles.script}>You are spending more than your wallet can afford.
        Consider saving more the upcoming days.</Text>
    if (spent - earned < -50000) 
      return <Text style = {styles.script}>You have earned good bits of fortune today! Keep 
       up the good work for about {1000000000/gap} days and you'll be a billionaire.</Text>  
 
    return <Text style = {styles.script}>Your financial record today is in acceptable range.</Text>    

  }

  const checkAccount = (money) => {
    if (money < -100000)
      return <Text style = {styles.script}>Your financial situation is abysmal! Save some money
        for a better future.</Text>
    if (money > 100000)
      return <Text style = {styles.script}>Your finance overview? What can I say except S.T.O.N.K?</Text>
    return <Text style = {styles.script}>You are overall in good term with your wallet.</Text>
  }

  return(
    <View>
      {checkBalance(Today.spent.sum, Today.earned.sum)}
      {checkAccount(money)}
    </View>
  )
}

/* Present warning on outliers or unusual record */
export function warningPresent(info, measure){

  var bmi = true;
  var height = true;
  var age = true;

  if (measure.BMI > 30)
  return <Text style = {styles.script}>You are likely suffering from obesity. This disease
    is crucial to note for your age, as it can lead to a lot of complications in later stages</Text>
  if (measure.BMI < 17)
  return <Text style = {styles.script}>Your BMI is dangerously low. It could be the sign of 
    malnutrition and decreasing health. Look out more for your health!</Text>
  return <Text style = {styles.script}>There is no warning today! Keep up the good work.</Text>

}

/*
export function suggestFood(info, list, pFood){
  
  let chosenId = Math.floor(Math.random()*list.length);
  let cur = 0;
  list.map(item => {
    if (cur == chosenId) {
      var food = {
        name: item.name,
        category: item.category,
        image: item.image,
      };
      pFood.name = item.name;
      pFood.category = item.category;
      pFood.image = item.image;
      console.log(food);
      return food;
    }
    //console.log(food);
    cur = cur + 1;
  })
  
}*/

const styles = StyleSheet.create({
  script: {
    fontSize: 18,
    paddingTop: 5,
    marginBottom: 5,
  }
})