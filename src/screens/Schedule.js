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

import ActivityList from '../components/ActivityList'
import AddActivityModal from '../components/ActivityModal/AddActivityModal'
import {FAB, Portal} from "react-native-paper";
// class Activity extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activate : true,
//     };
//     this.repeat = [
//       {day : "Sun", value : false},
//       {day : "Mon", value : false},
//       {day : "Tue", value : false},
//       {day : "Wed", value : false},
//       {day : "Thu", value : false},
//       {day : "Fri", value : false},
//       {day : "Sat", value : false},
//     ];
//     i++;
//   }
//   static i = 0;
//   setComponent(name, hour, min, Sun, Mon, Tue, Wed, Thu, Fri, Sat) {
//     this.name = name;
//     this.hour = hour;
//     this.min = min;
//     this.repeat[0].value = Sun;
//     this.repeat[1].value = Mon;
//     this.repeat[2].value = Tue;
//     this.repeat[3].value = Wed;
//     this.repeat[4].value = Thu;
//     this.repeat[5].value = Fri;
//     this.repeat[6].value = Sat;
//   }
//   id = (i).toString();
//   setActivate = () => {
//     this.state.activate = !this.state.activate;
//     console.log("activated")
//   }
// }



class ScheduleScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      mode : 'time',
      showModal: false,
      showModalName: false,
      showModalTime: false,
    };
    this.activity = {
      id: "",
      name: "",
      hour: 0,
      min: 0,
    }
  }

  onNameChange = (id, name) => {
    this.activity.id = id
    this.activity.name = name
  }

  onTimeChange = (id, hour, min) => {
    this.activity.id = id
    this.activity.hour = hour
    this.activity.min = min
  }

  setModalVisible = (visible) => {
    this.setState(state => ({
      [visible] : !state[visible]
    }));
  };

  render() {
    const { showModal, showModalName, showModalTime } = this.state;
    const { name, id, hour, min } = this.activity;
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
            <ActivityList 
              changeName={this.onNameChange} openNameModal={() => {this.setModalVisible('showModalName')}}
              changeTime={this.onTimeChange} openTimeModal={() => {this.setModalVisible('showModalTime')}}/>
          </View>
          {showModalName && <ModifyNameModal id={id} name={name} completeChange={() => {this.setModalVisible('showModalName')}} />}
          {showModalTime && <ModifyTimeModal id={id} hour={hour} min={min} completeChange={() => {this.setModalVisible('showModalTime')}} />}
          {showModal && <AddActivityModal completeAdd={() => {this.setModalVisible('showModal')}}/>}
        </Content>
        <Footer backgroundColor="#ffffff">
          <FooterTab>
              <Button onPress={() => {this.setModalVisible('showModal')}}>
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
export default ScheduleScreen;
