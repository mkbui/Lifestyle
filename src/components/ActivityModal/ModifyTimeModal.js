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
import {modifyActivityTime} from "../../actions";



const mapDispatchToProps = dispatch => ({
  modifyActivityTime: (id, hour, min) => dispatch(modifyActivityTime(id, hour, min))
})
class ModifyTimeModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode : 'time',
    };
    this.activity = {
      date : new Date(2020, 7, 4, this.props.hour, this.props.hour, 1, 1),
    };
  }
  onChangeTime = (event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate || this.activity.date;
      this.activity.date = currentDate;
      this.props.modifyActivityTime(this.props.id, this.activity.date.getHours(), this.activity.date.getMinutes())    
    }
    this.props.completeChange()
  };

  render() {
    const { mode } = this.state;
    const { date } = this.activity;
    return (
          <View style={styles.centeredView}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={this.onChangeTime}/>
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
export default connect(null, mapDispatchToProps)(ModifyTimeModal);