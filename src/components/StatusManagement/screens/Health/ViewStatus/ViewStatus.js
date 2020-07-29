import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Input ,TouchableOpacity,  ToastAndroid} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import moment from 'moment';
import * as actions from "../../../../../actions"
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {Header, Title, Button, Icon, Left, Right, Body} from 'native-base';
const waterGlass_active = require('../../../../../../assets/waterBottle_on.png');
const waterGlass_inactive = require('../../../../../../assets/waterBottle.off.png');


class ViewStatus extends Component {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    // const { waterConsumed } = userInfo.DailyRecord.Fitness;

    this.state = {
      date: moment().format('DD-MM-YYYY'),
      // bottlePressID: waterConsumed/0.25,
      bottlePressID:0,
      waterConsumed:0,
    };
  }

  updateWater = (i) => {
    this.setState({ bottlePressID: i , waterConsumed: i*0.25});
   
  }
  onSubmit = () =>{
    this.props.submitWater(this.state);  
    if(this.state.date === moment().format('DD-MM-YYYY')){
      this.props.submitWaterRecord(this.state.waterConsumed);
    }
    ToastAndroid.show(
      "Water submitted!",
      ToastAndroid.SHORT
    )
   
  }

  render() {
    const { exerciseList, mealList,waterList, userInfo} = this.props;
    var totalTime = 0;
    var totalCarb = 0;
    var totalProtein = 0;
    var totalFat = 0;
    const key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    function calTotalCalo() {
      return totalCarb * 4 + totalProtein * 4 + totalFat * 9;
    }
    function calCalo(carb, protein, fat) {
      return carb * 4 + protein * 4 + fat * 9;
    }
   
    return (
      <>
        {/* Header */}
        <Header>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>

          <Body style={{ flex: 1 }}>
            <Title style={styles.headerText}>Health</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MainTracker')}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Back
              </Text>
            </Button>
          </Right>
        </Header>

        {/* Date Picker */}
        <View>
          <DatePicker
            style={{ width: 335/*385*/, margin: 5 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-1-1000"
            maxDate="01-1-3000"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 350,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                //   marginLeft: -30,
              },
            }}
            onDateChange={date => {
              var index = waterList.findIndex(water=>{return(water.date === date)})
              console.log("index",index)
             if(index !== -1){
              this.setState({ 
                date: date ,
                bottlePressID: waterList[index].bottlePressID,
                waterConsumed: waterList[index].waterConsumed
              }) 
             }else{
              this.setState({ 
                date: date,
                bottlePressID:0,
                waterConsumed:0,
              })
            } 
            }}
            androidMode="spinner"
          />
        </View>

        {/* //Date */}
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.date}>
            {this.state.date.split('-').join('/')}
          </Text>
        </View>

       
        {/* //Weight - Height */}
        <View style={styles.viewWH} >
          <View style={{ flexDirection: 'row', marginTop:10 }}>
            <Text style={styles.WHtitle}>Weight:</Text>
            <Text style={styles.WHvalue}>{userInfo.Info.weight} kg</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop:10 }}>
            <Text style={styles.WHtitle}>Height:</Text>
            <Text style={styles.WHvalue}>{userInfo.Info.height} cm</Text>
          </View>
        </View>
     

        <ScrollView style={{ flex: 1 }}>

          {/* WATER */}
          {/* Chưa xong */}
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>WATER</Text>
            <View style={styles.viewValueTotal}>
              <Text style={styles.textTotal}>Total:</Text>
              <Text style={styles.textValueTotal}>{this.state.bottlePressID * 0.25}L</Text>
            </View>
          </View>
          <View style={styles.viewBottle} numberOfLines={2}>

            <View style={styles.viewBottle}>
              {key.map(i => {
                if (i <= this.state.bottlePressID) {
                  return (
                    <TouchableOpacity key={i} onPress={() => this.updateWater(i)} style={styles.bottle}>
                      <Image source={waterGlass_active} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                  )
                } else {
                  return (
                    <TouchableOpacity key={i} onPress={() => this.updateWater(i)} style={styles.bottle}>
                      <Image source={waterGlass_inactive} style={{ height: 50, width: 50 }} />
                    </TouchableOpacity>
                  )
                }
              })}

            </View>
          </View>
          <TouchableOpacity  onPress={this.onSubmit}>
            <View style={{borderWidth:1,borderRadius:5, width:50, marginLeft:300,marginBottom:10, marginTop:5,backgroundColor:"orange", alignItems:"center", elevation:5}}>
            <Text>OK</Text>
              </View>
              
          </TouchableOpacity>

          {/* MEAL */}

          {/* Cal total nutrition */}
          {mealList
            .filter(meal => meal.date === this.state.date)
            .map(meal => {
              totalCarb = totalCarb + meal.carb;
              totalProtein = totalProtein + meal.protein;
              totalFat = totalFat + meal.fat;
            })}

          {/* First row meal */}
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>NUTRITION</Text>
            <View style={styles.viewValueMealTotal}>
              <Text style={styles.textTotal}>Total calo:</Text>
              <Text style={styles.valueTitle}>{calTotalCalo()} cal</Text>
            </View>
          </View>

          {/*  Row shows total nutri   */}
          <View style={styles.viewCalNutri}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.circleNutriCarb} />
              <Text style={styles.text}>Carb </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.circleNutriPro} />
              <Text style={styles.text}>Protein</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.circleNutriFat} />
              <Text style={styles.text}>Fat </Text>
            </View>
          </View>

          <View style={styles.viewValueNutri}>
            <Text style={styles.incomeText}> {totalCarb}</Text>
            <Text style={styles.expenseText}> {totalProtein}</Text>
            <Text style={styles.totalText}>{totalFat}</Text>
          </View>

          
          {/*  Row Item  */}
          {/* Chưa có btn edit delete */}
          {mealList
            .filter(meal => meal.date === this.state.date)
            .map(meal => {
              return (
                <TouchableOpacity
                key={meal.id}
                  onPress={() => {
                    this.props.editMeal(meal);
                    this.props.navigation.push('Meal');
                  }}>
                  <View style={styles.viewItemRow}>
                    <View style={{ height: 40, width: 40 , marginHorizontal:20}}>
                      <Image source={meal.filePath} style={styles.imageFood} />
                    </View>
                   
                    <View style={{ width: 120 , marginLeft:15}}>
                      <Text numberOfLines={1} style={{ fontSize: 20 }}>
                        {meal.name}
                      </Text>
                    </View>

                    <View style={styles.viewCircle}>
                      <View style={styles.colorCircleCarb} />
                      <Text style={{ fontSize: 15 }}>{meal.carb}</Text>
                    </View>
                    <View style={styles.viewCircle}>
                      <View style={styles.colorCirclePro} />
                      <Text style={{ fontSize: 15 }}>{meal.protein}</Text>
                    </View>
                    <View style={styles.viewCircle}>
                      <View style={styles.colorCircleFat} />
                      <Text style={{ fontSize: 15 }}>{meal.fat}</Text>
                    </View>

                    <Text style={styles.valueCalo}>
                      {calCalo(meal.carb, meal.protein, meal.fat)}
                    </Text>

                  <TouchableOpacity  onPress={() => {this.props.deleteMeal(meal), this.props.deleteConsumeRecord(meal.carb*4+ meal.protein*4 + meal.fat*9)}}>
                      <View>
                        <Image source={require("../../../../../../assets/close.png")} style={{height:20, width:20, marginRight:30, marginLeft:50}} />
                      </View>
                  </TouchableOpacity>

                  </View>
                </TouchableOpacity>
              );
            })}

      
    

          {/* EXERCISE */}

          {/* Cal total time */}
          {exerciseList
            .filter(exercise => exercise.date === this.state.date)
            .map(exercise => {
              totalTime = totalTime + exercise.duration;
            })}

          {/* First row exercise */}
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>EXERCISE</Text>
            <View style={styles.viewValueExerTotal}>
              <Text style={styles.textTotal}>Total time:</Text>
              <Text style={styles.valueTitle}>{totalTime}m</Text>
            </View>
          </View>

          {/*  Row Item  */}
          {/* Chưa có btn edit delete */}
          {exerciseList
            .filter(exercise => exercise.date === this.state.date)
            .map(exercise => {
              return (
                <TouchableOpacity
                key={exercise.id}
                  onPress={() => {
                    this.props.editExercise(exercise);
                     this.props.navigation.push('Exercise');
                
                   
                  }}>
                  <View style={styles.viewItemRow}>
                    <Text style={styles.exerciseText}>{exercise.category}</Text>
                    <Right >
                      <Text style={styles.exerciseValue}>
                        {exercise.duration} m
                      </Text>
                    </Right>
                    <TouchableOpacity  onPress={()=>{this.props.deleteExercise(exercise), this.props.deleteExerciseRecord(exercise.duration * 5)}}>
                      <View>
                        <Image source={require("../../../../../../assets/close.png")} style={{height:20, width:20, marginRight:15, marginLeft:20}} />
                      </View>
                  </TouchableOpacity>
                  </View>        
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //key: value
    editMeal: meal => {
      dispatch(actions.actEditMeal(meal));
    },
    deleteMeal: meal => {
      dispatch(actions.actDeleteMeal(meal));
    },
    deleteConsumeRecord: consume =>{
      dispatch(actions.deleteConsumeRecord(consume));
    },
    
    editExercise: exercise => { 
      dispatch(actions.actEditExercise(exercise));
    },

    deleteExercise: exercise => {
      dispatch(actions.actDeleteExercise(exercise));
    },
    deleteExerciseRecord: burn =>{
      dispatch(actions.deleteExerciseRecord(burn));
    },

    submitWater: water => {
      dispatch(actions.actSubmitWater(water));
    },
    submitWaterRecord: water =>{
      dispatch(actions.addWaterRecord(water));
    }
    
    
  };
};

const mapStateToProps = state => {
  return {
    exerciseList: state.exerciseReducer.exerciseList,
    mealList: state.mealReducer.mealList,
    waterList: state.mealReducer.waterList,
    userInfo: state.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewStatus);

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  text: {
    fontSize: 20,
    color: 'grey',
  },
  incomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A4D3',
  },
  expenseText: {
    fontSize: 20,
    fontWeight: 'bold',

    color: '#F06E9C',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f4c348',
  },

  viewTitle: {
    flexDirection: 'row',
    //   justifyContent: 'space-around',
    backgroundColor: '#F7FADE',
    borderColor: 'grey',
    borderWidth: 1,
    height: 50,
    // marginTop: 20,
  },
  textTitle: {
    fontSize: 23,
    marginTop: 12,
    fontWeight: 'bold',
    color: '#FE6623',
    marginLeft: 25,
  },
  valueTitle: {
    fontSize: 25,
    marginTop: 0,
    color: '#84B268',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewValueExerTotal: { flexDirection: 'row', marginLeft: 55/*85*/, marginTop: 6 },
  viewValueMealTotal: { flexDirection: 'row', marginLeft: 15/*35*/, marginTop: 6 },
  viewValueTotal: { flexDirection: 'row', marginLeft: 150/*170*/, marginTop: 6 },
  textTotal: { fontSize: 20, marginTop: 5, color: 'grey' },

  textValueTotal: {
    fontSize: 25,
    marginTop: 0,
    color: '#84B268',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  viewBottle: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewCalNutri: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  circleNutriCarb: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#00A4D3',
    margin: 3,
  },
  circleNutriPro: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#F06E9C',
    margin: 3,
  },
  circleNutriFat: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#f4c348',
    margin: 3,
  },
  viewValueNutri: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewItemRow: {
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopColor: 'grey',
    borderTopWidth: 1,
    alignItems: 'center',
    height: 55,
    flexDirection: 'row',
    marginVertical: 1,
  },
  exerciseText: { fontSize: 20, marginLeft: 20 },
  exerciseValue: {
    fontSize: 20,
    color: '#00A4D3',
    fontWeight: 'bold',
  },
  imageFood: { height: 40, width: 40, borderRadius: 25 },
  colorCircleCarb: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#00A4D3',
    margin: 3,
  },
  colorCirclePro: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#F06E9C',
    margin: 3,
  },
  colorCircleFat: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#f4c348',
    margin: 3,
  },
  viewCircle: { flexDirection: 'row', width: 40 , margin:20},
  valueCalo: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    marginLeft:30
  },
  date: { fontSize: 30, fontWeight: 'bold', color: '#FE6623' },
  viewWH: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
    paddingBottom: 15,
    borderWidth: 0.7,
    borderColor: 'grey',
    borderRadius:10,
  },
  WHtitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'grey',
    marginRight: 10,
  },
  WHvalue: { fontSize: 23, fontWeight: 'bold', color: 'black' },
  bottle: { margin: 5 },

});
