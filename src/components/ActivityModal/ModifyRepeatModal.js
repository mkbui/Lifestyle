import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {
  Text,
  View,
  ListItem,
  CheckBox,
  Body,
} from "native-base";
import {connect} from "react-redux";
import {modifyActivityRepeat} from "../../actions";


const mapDispatchToProps = dispatch => ({
    modifyActivityRepeat: (id, repeat) => dispatch(modifyActivityRepeat(id, repeat))
})
class ModifyRepeatModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      Sun : this.props.repeat[0].value,
      Mon : this.props.repeat[1].value,
      Tue : this.props.repeat[2].value,
      Wed : this.props.repeat[3].value,
      Thu : this.props.repeat[4].value,
      Fri : this.props.repeat[5].value,
      Sat : this.props.repeat[6].value,
    };
  }
  checkBox = (checkDate) => {
    this.setState(state => ({
      [checkDate] : !state[checkDate]
    }));
  };

  modify = () => {
    const {Sun, Mon, Tue, Wed, Thu, Fri, Sat} = this.state
    this.props.modifyActivityRepeat(
      this.props.id, 
      [
        {day : "Sun", value : Sun},
        {day : "Mon", value : Mon},
        {day : "Tue", value : Tue},
        {day : "Wed", value : Wed},
        {day : "Thu", value : Thu},
        {day : "Fri", value : Fri},
        {day : "Sat", value : Sat},
      ]
    )
    this.props.completeChange()
  };

  render() {
    const {Sun, Mon, Tue, Wed, Thu, Fri, Sat} = this.state
    return (
      <View style={styles.centeredView}>
        <Modal transparent={true} visible={true} animationType="slide">
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{fontSize : 20}}>Repeat</Text>
                <ListItem onPress={() => {this.checkBox('Sun')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Sun} onPress={() => {this.checkBox('Sun')}} color="blue"/>
                  <Body>
                    <Text>Sunday</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => {this.checkBox('Mon')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Mon} onPress={() => {this.checkBox('Mon')}} color="blue"/>
                  <Body>
                    <Text>Monday</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => {this.checkBox('Tue')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Tue} onPress={() => {this.checkBox('Tue')}} color="blue"/>
                  <Body>
                    <Text>Tuesday</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => {this.checkBox('Wed')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Wed} onPress={() => {this.checkBox('Wed')}} color="blue"/>
                  <Body>
                    <Text>Wednesday</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => {this.checkBox('Thu')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Thu} onPress={() => {this.checkBox('Thu')}} color="blue"/>
                  <Body>
                    <Text>Thursday</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => {this.checkBox('Fri')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Fri} onPress={() => {this.checkBox('Fri')}} color="blue"/>
                  <Body>
                    <Text>Friday</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => {this.checkBox('Sat')}} style={{borderBottomWidth: 0}}>
                  <CheckBox checked={Sat} onPress={() => {this.checkBox('Sat')}} color="blue"/>
                  <Body>
                    <Text>Saturday</Text>
                  </Body>
                </ListItem>  
                <View style={styles.modalButton}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.props.completeChange()
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {this.modify()}}>
                    <Text style={styles.textStyle}>OK</Text>
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
    width: 270,
    height: 500
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
});
export default connect(null, mapDispatchToProps)(ModifyRepeatModal);