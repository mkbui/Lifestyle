import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
} from 'native-base';

export function getDateString(){
  const date = new Date();
  const dateString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
  return dateString;
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
      {checkBalance(Today.spent, Today.earned)}
      {checkAccount(money)}
    </View>
  )
}

export function warningPresent(info, measure){
  if (measure.BMI > 30)
    return <Text style = {styles.script}>You are likely suffering from obesity. This disease
      is crucial to note for your age, as it can lead to a lot of complications in later stages</Text>

  return <Text style = {styles.script}>There is no warning today! Keep up the good work.</Text>

}

export function suggestFood(info, list, pFood){
  /*
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
  */
}

const styles = StyleSheet.create({
  script: {
    fontSize: 18,
    paddingTop: 5,
  }
})