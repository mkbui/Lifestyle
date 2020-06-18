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
} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";


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
  setActivate = (activate) => {
    this.setState(state => ({
      [activate] : !state[activate]
    }));
    console.log(this.state.activate);
  }
}

class ScheduleScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      mode : 'time',
      showNameForm : false,
      showTime : false,
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
    this.ActivityList = [];
  }
  onChangeTime = (event, selectedDate) => {
    if (event.type == "set") {
      const {showTime, show} = this.state;
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
    this.ActivityList.push(newActivity);
    this.activity.name = 'Activity';
  };

  render() {
    const { mode, date, showTime, showNameForm, showRepeat } = this.state;
    const {Sun, Mon, Tue, Wed, Thu, Fri, Sat} = this.state;
    const {ActivityList} = this;
    return (
      <Container style={styles.container}>
        <Header>
          <Left style = {{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title style = {styles.headerText}>My Schedule</Title>
          </Body>
          <Right style = {{flex: 1}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "arrow-back" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View>
            {ActivityList.map(activity => (
              <ListItem thumbnail key={activity.id} style={styles.activityView}>
                <Left>
                  <TouchableOpacity onPress={() => {console.log(activity.repeat)}}>
                    <Text style={{alignSelf : "flex-start", marginTop : 0.5}}>
                      {activity.name}
                    </Text>
                  </TouchableOpacity>
                </Left>
                <Body>
                  <View style={{flex: 2, flexDirection:'column', alignItems:"center"}}>
                    <View>
                      <TouchableOpacity>
                        <Text style={styles.timeText}>
                          {activity.hour}:{activity.min}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{margin : 0.1, marginTop: 20, flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
                      { 
                        activity.repeat.map(item => {
                          return(
                            (item.value === true) && <ListItem key={item.day} style={{marginRight: 0.3}}>
                              <Text style={{fontSize: 10}}>
                                {item.day}
                              </Text>
                            </ListItem>
                          )
                      })}
                    </View>
                  </View>
                </Body>
                <Right>
                  <View style={{flexDirection:'column', alignItems:"flex-end", justifyContent: "space-between", marginRight: 0.3}}>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={activity.setActivate('activate')}
                      value={activity.state.activate}
                    />
                    <Icon name="trash" style={{fontSize: 30, color: '#81b0ff', marginTop: 20}}></Icon>
                  </View>
                </Right>
              </ListItem>
              ))}
          </View>
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
                        this.setModalVisible('showRepeat');
                      }}
                    >
                      <Text style={styles.textStyle}>OK</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible('showNameForm');
                      }}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
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
                        this.createActivity();
                      }}
                    >
                      <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible('showRepeat');
                      }}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </Content>
        <Footer backgroundColor="#ffffff">
          <FooterTab>
              <Button onPress={() => {this.setModalVisible('showTime')}}>
                <Text style={styles.buttonContainer}>
                  New activity
                </Text>
              </Button>
          </FooterTab>
        </Footer>
      </Container>
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
    //marginLeft : 1,
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
export default ScheduleScreen;
