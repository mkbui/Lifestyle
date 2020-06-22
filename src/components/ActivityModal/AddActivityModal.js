import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput,
  Switch,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  CheckBox,
  View,
  Footer,
  FooterTab,
  ListItem,
  List,
} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from "react-redux";
import {addActivity} from "../../actions";

let i = 0;
class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activate : true,
    };
    this.repeat = [
      {day : "Sun", value : false},
      {day : "Mon", value : false},
      {day : "Tue", value : false},
      {day : "Wed", value : false},
      {day : "Thu", value : false},
      {day : "Fri", value : false},
      {day : "Sat", value : false},
    ];
  }
  
  setComponent(name, hour, min, Sun, Mon, Tue, Wed, Thu, Fri, Sat) {
    this.name = name;
    this.hour = hour;
    this.min = min;
    this.repeat[0].value = Sun;
    this.repeat[1].value = Mon;
    this.repeat[2].value = Tue;
    this.repeat[3].value = Wed;
    this.repeat[4].value = Thu;
    this.repeat[5].value = Fri;
    this.repeat[6].value = Sat;
  }
  id = (i++).toString();
  setActivate = () => {
    this.state.activate = !this.state.activate;
    console.log("activated")
  }
}

const mapDispatchToProps = dispatch => ({
    addActivity: (activity) => dispatch(addActivity(activity))
  })

class AddActivityModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      mode : 'time',
      showNameForm : false,
      showTime : true,
      showRepeat : false,
      Sun : false,
      Mon : false,
      Tue : false,
      Wed : false,
      Sat : false,
      Fri : false,
      Thu : false,
    };
    this.activity = {
      name : 'Activity',
    };
  }
  onChangeTime = (event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate || this.state.date;
      this.state.date = currentDate;
      this.setModalVisible('showTime');
      this.setModalVisible('showNameForm');
    }
  };

  setModalVisible = (visible) => {
    this.setState(state => ({
      [visible] : !state[visible]
    }));
  };

  
  checkBox = (checkDate) => {
    this.setState(state => ({
      [checkDate] : !state[checkDate]
    }));
  };

  onChangeName = (textChange) => {
    this.activity.name = textChange;
  };

  createActivity = () => {
    const {Sun, Mon, Tue, Wed, Thu, Fri, Sat} = this.state;
    let newActivity = new Activity();
    newActivity.setComponent(
      this.activity.name,
      this.state.date.getHours(),
      this.state.date.getMinutes(),
      Sun,
      Mon,
      Tue,
      Wed,
      Thu,
      Fri,
      Sat,
    );
    this.props.addActivity(newActivity);
    this.activity.name = 'Activity';
  };

  render() {
    const { mode, date, showTime, showNameForm, showRepeat } = this.state;
    const {Sun, Mon, Tue, Wed, Thu, Fri, Sat} = this.state;
    return (
          <View style={styles.centeredView}>
            {
              showTime && <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={this.onChangeTime}/>
            }
            <Modal
                transparent={true} 
                visible={showNameForm}
                animationType="slide">
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Activity Name: </Text>
                  <TextInput 
                    style={{height: 40, fontSize: 15}}
                    placeholder="Please insert activity name!"
                    onChangeText={this.onChangeName}
                    defaultValue={this.activity.name}
                    textAlign="center"
                  />
                  <View style={styles.modalButton}>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible('showNameForm');
                      }}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible('showNameForm');
                        this.setModalVisible('showRepeat');
                      }}
                    >
                      <Text style={styles.textStyle}>OK</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
                transparent={true} 
                visible={showRepeat}
                animationType="slide">
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{fontSize : 20}}>Repeat</Text>
                  <ListItem onPress={() => {this.checkBox('Sun')}}>
                    <CheckBox checked={Sun} onPress={() => {this.checkBox('Sun')}} color="blue"/>
                    <Body>
                      <Text>Sunday</Text>
                    </Body>
                  </ListItem>
                  <ListItem onPress={() => {this.checkBox('Mon')}}>
                    <CheckBox checked={Mon} onPress={() => {this.checkBox('Mon')}} color="blue"/>
                    <Body>
                      <Text>Monday</Text>
                    </Body>
                  </ListItem>
                  <ListItem onPress={() => {this.checkBox('Tue')}}>
                    <CheckBox checked={Tue} onPress={() => {this.checkBox('Tue')}} color="blue"/>
                    <Body>
                      <Text>Tuesday</Text>
                    </Body>
                  </ListItem>
                  <ListItem onPress={() => {this.checkBox('Wed')}}>
                    <CheckBox checked={Wed} onPress={() => {this.checkBox('Wed')}} color="blue"/>
                    <Body>
                      <Text>Wednesday</Text>
                    </Body>
                  </ListItem>
                  <ListItem onPress={() => {this.checkBox('Thu')}}>
                    <CheckBox checked={Thu} onPress={() => {this.checkBox('Thu')}} color="blue"/>
                    <Body>
                      <Text>Thursday</Text>
                    </Body>
                  </ListItem>
                  <ListItem onPress={() => {this.checkBox('Fri')}}>
                    <CheckBox checked={Fri} onPress={() => {this.checkBox('Fri')}} color="blue"/>
                    <Body>
                      <Text>Friday</Text>
                    </Body>
                  </ListItem>
                  <ListItem onPress={() => {this.checkBox('Sat')}}>
                    <CheckBox checked={Sat} onPress={() => {this.checkBox('Sat')}} color="blue"/>
                    <Body>
                      <Text>Saturday</Text>
                    </Body>
                  </ListItem>
                  
                  <View style={styles.modalButton}>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible('showRepeat');
                      }}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible('showRepeat');
                        this.createActivity();
                      }}
                    >
                      <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    fontWeight : 'bold',
    fontSize : 15,
    color : 'white'
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: { //For text and repeat modal
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    flex : 0.7,
    flexDirection : "row",
    alignItems :"center",
    justifyContent : "space-evenly",
  },
  activityView: {
    marginLeft : 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  timeText: {
    fontSize : 25,
  },
  dateText: {
    fontSize: 5,
  }
});
export default connect(null, mapDispatchToProps)(AddActivityModal);