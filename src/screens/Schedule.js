import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  TextInput,
  FlatList,
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

class Activity extends Component {
  constructor(name, hour, min, repeat) {
    this.name = name;
    this.hour = hour;
    this.min = min;
    this.repeat = repeat;
  }
  
}

class ScheduleScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date(1598051730000),
      mode : 'time',
      show : false,
      checkSun : false,
      checkMon : false,
      checkTue : false,
      checkWed : false,
      checkSat : false,
      checkFri : false,
      checkThu : false,
    };
    this.activity = {
      name : 'Activity',
    };
  }
  onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.state.show = Platform.OS === 'ios';
    this.state.date = currentDate;
  };

  setModalVisible = (visible) => {
    this.setState({show: visible});
  };

  checkBox = check => {
    this.setState(state => ({
      [check] : !state[check]
    }));
  };

  onChangeName = (textChange) => {
    this.activity.name = textChange;
  };
  onButton = () => {
    console.log(this.state.date.getMinutes());
    console.log(this.state.checkSun);
  };
  render() {
    const { mode, date, show } = this.state;
    const {checkSun, checkMon, checkTue, checkWed, checkThu, checkFri, checkSat} = this.state;
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
          <View style={styles.centeredView}>
            <Button onPress={this.onButton}>
              <Text>Test</Text>
            </Button>
            <Modal
                transparent={true} 
                visible={show}
                animationType="slide">

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Activity Name: </Text>
                  <TextInput 
                    style={{height: 40}}
                    placeholder="Please insert activity name!"
                    onChangeText={this.onChangeName}
                    defaultValue={'Activity'}
                    textAlign="center"
                  />
                  <Text style={styles.modalText}>Repeat</Text>
                  <ListItem>
                    <CheckBox checked={checkSun} onPress={() => {this.checkBox('checkSun')}} color="blue"/>
                    <Body>
                      <Text>Sunday</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <CheckBox checked={checkMon} onPress={() => {this.checkBox('checkMon')}} color="blue"/>
                    <Body>
                      <Text>Monday</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <CheckBox checked={checkTue} onPress={() => {this.checkBox('checkTue')}} color="blue"/>
                    <Body>
                      <Text>Tuesday</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <CheckBox checked={checkWed} onPress={() => {this.checkBox('checkWed')}} color="blue"/>
                    <Body>
                      <Text>Wednesday</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <CheckBox checked={checkThu} onPress={() => {this.checkBox('checkThu')}} color="blue"/>
                    <Body>
                      <Text>Thursday</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <CheckBox checked={checkFri} onPress={() => {this.checkBox('checkFri')}} color="blue"/>
                    <Body>
                      <Text>Friday</Text>
                    </Body>
                  </ListItem>
                  <ListItem>
                    <CheckBox checked={checkSat} onPress={() => {this.checkBox('checkSat')}} color="blue"/>
                    <Body>
                      <Text>Saturday</Text>
                    </Body>
                  </ListItem>
                  <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChangeTime}
                  />
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setModalVisible(!show);
                    }}
                  >
                    <Text style={styles.textStyle}>OK</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>
        </Content>
        <Footer backgroundColor="#ffffff">
          <FooterTab>
              <Button onPress={() => {this.setModalVisible(!show)}}>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
export default ScheduleScreen;
