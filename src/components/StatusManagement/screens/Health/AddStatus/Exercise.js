import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Picker,
  ToastAndroid,
} from 'react-native';
import {Content, Button, Text, Form, Item, Label} from 'native-base';


import DatePicker from 'react-native-datepicker';
import {Slider} from 'react-native-elements';

import * as actions from "../../../../../actions"
import {connect} from 'react-redux';
import moment from 'moment';

var icon_close = '../../../../../../assets/close_icon.png';


class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      date: moment().format('DD-MM-YYYY'),
      duration: 0,
      category: '',
      checkedIndex: '',
    };
  }

  componentWillMount() {
    const {exerciseEdit} = this.props;
    if (exerciseEdit) {
      this.setState({
        id: exerciseEdit.id,
        date: exerciseEdit.date,
        duration: exerciseEdit.duration,
        category: exerciseEdit.category,
      });
    }
  }

  handleOnChange = (text, name) => {
    this.setState({
      [name]: text,
    });
  };
  handleOnSubmit = () => {
    if (this.state.duration === 0) {
      alert('Please enter the amount of time !!!');
    } else if (this.state.category === '') {
      alert('Please choose category !!!');
    } else {
      var currentDate = moment().format('DD-MM-YYYY');

      this.props.onSubmit(this.state);
      this.props.deleteExerciseEdit();
      this.props.updateDailyRecord(this.state);

      

      if(this.state.date === currentDate){
        // calculate energyBurned temporarily
        var energyBurned= this.state.duration * 5; 
        console.log("energyBurned",energyBurned)
        this.props.submitBurnRecord(energyBurned);
      }


      this.setState({
        id: '',
        date: currentDate,
        duration: 0,
        category: '',
        checkedIndex: '',
      });

      ToastAndroid.show(
        "Record submitted!",
        ToastAndroid.SHORT
      )
    }
  };

  render() {
    return (
      <Content padder>
        {/* SHOW TITLE EDIT */}
        {this.props.exerciseEdit ? (
          <View>
            <TouchableOpacity
              style={styles.viewIcon}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteExerciseEdit();
              }}>
              <Image
                source={require(icon_close)}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text
                style={styles.titleEdit}>
                EDIT EXERCISE
              </Text>
            </View>
          </View>
        ) : null}

        {/* DATE SELECT */}
        <Form>
          <Item stackedLabel style={{borderColor: 'white'}}>
            <Label>Date:</Label>
            <DatePicker
              style={styles.datepicker}
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
                  left: 300,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: -30,
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({date: date});
              }}
              androidMode="spinner"
            />
          </Item>
        </Form>
        
         {/* DURATION INPUT */}
         <View style={{flexDirection:"row",  marginTop: 30,marginLeft:30}}>
        <Label
          style={styles.label}
          >
          Duration:
        </Label>
        <Text style={{fontSize:20}}> {this.state.duration} min</Text>
        </View>
        <Slider
          value={this.state.duration}
          onValueChange={value => this.setState({duration: value})}
          step={1}
          minimumValue={0}
          maximumValue={600}
          maximumTrackTintColor="#C1C1C1"
          thumbTintColor="#F85C01"
          style={{margin: 10}}
        />
       


           {/* CATEGORY PICKER */}
        <Label style={styles.categoryLabel}>
          Category:
        </Label>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue, checkedIndex: itemIndex})
            }>
            <Picker.Item label="Choose category ..." value="" />
            <Picker.Item label="🚴‍♂️  Cycling" value="🚴       Cycling" />
            <Picker.Item label="🏈  American Football"  value="🏈       American Football"/>
            <Picker.Item label="🏸 Badminton" value="🏸       Badminton" />
            <Picker.Item label="🏀  Basketball" value="🏀       Basketball" />
            <Picker.Item label="🥊  Boxing Glove"  value="🥊       Boxing Glove"/>
            <Picker.Item label="🎳  Bowling" value="🎳       Bowling" />
            <Picker.Item label="🧗‍♂️ Climbing" value="🧗‍♂️       Climbing" />
            <Picker.Item label="💃  Dancing" value="💃       Dancing" />
            <Picker.Item label="⚽  Football" value="⚽      Football" />
            <Picker.Item label="🏌️  Golf" value="🏌️       Golf" />
            <Picker.Item label="🏋️‍♂️  Gym" value="🏋️       Gym‍" />
            <Picker.Item label="🏓  Ping Pong" value="🏓       Ping Pong" />
            <Picker.Item label="🏇  Horse Racing" value="🏇       HorseRacing"/>
            <Picker.Item label="🚣  Rowing Boat" value="🚣       RowingBoat" />
            <Picker.Item label="🏃🏿‍♂️  Running" value="🏃🏿‍♂️       Running" />
            <Picker.Item label="🏐  Volleyball" value="🏐       Voleyball" />
            <Picker.Item label="🚶 Walking" value="🚶       Walking" />
            <Picker.Item label="🏊‍♂️  Swimming" value="🏊‍♂️       Swimming" />
            <Picker.Item label="🏄  Surfing" value="🏄       Surfing" />
            <Picker.Item label="🏂   Snowboarder" value="🏂       Snowboarder"/>
            <Picker.Item label="🧘  Yoga" value="🧘       Yoga" />
          </Picker>
        </View>



          {/* BUTTON FOR EDIT FORM */}
        {this.props.exerciseEdit ? (
          <View style={styles.viewbtnEdit}>
            <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                this.handleOnSubmit();
                this.props.deleteExerciseEdit();
                this.props.navigation.goBack();
              }}>
              <Text>SUBMIT</Text>
            </Button>
            <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteExerciseEdit();
              }}>
              <Text>CLOSE</Text>
            </Button>
          </View>
        ) : (
          <Button
            block
            style={styles.btnSubmit}
            onPress={this.handleOnSubmit}>
            <Text>SUBMIT</Text>
          </Button>
        )}
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: exercise => {
      dispatch(actions.actSubmitExercise(exercise));
    },
    deleteExerciseEdit: () => {
      dispatch(actions.actEditExercise(null));
    },
    updateDailyRecord: exercise => {
      dispatch(actions.updateDailyRecord())
    },
    
    submitBurnRecord: burn =>{
      dispatch(actions.addExerciseRecord(burn));
    }
  };
};

const mapStateToProps = state => {
  return {
    exerciseEdit: state.exerciseReducer.exerciseEdit,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Exercise);

const styles = StyleSheet.create({
  viewIcon:{marginLeft: 330, marginTop: 20},
  titleEdit:{
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffbf00',
    margin: 20,
    marginTop: 20,
  },
  datepicker:{width: 300, marginTop: 10},
  label:{
    color: '#fa8100',
    fontWeight: 'bold',
    fontSize: 20,
  
   
  },
  categoryLabel:{color: '#fa8100',fontWeight:"bold", fontSize: 20, margin: 10, marginLeft:30},
  pickerBox:{borderColor: 'grey', borderWidth: 1, marginLeft: 15},
  viewbtnEdit: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnEdit: {
    margin: 15,
    marginTop: 50,
  },
  btnSubmit: {
    margin: 15,
    marginTop: 50,
  },
});
