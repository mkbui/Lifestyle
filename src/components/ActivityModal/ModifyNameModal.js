import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {
  Text,
  View,
} from "native-base";
import {connect} from "react-redux";
import {modifyActivityName} from "../../actions";
import {addAlarmNoti} from '../../utils';

const mapDispatchToProps = dispatch => ({
    modifyActivityName: (id, name) => dispatch(modifyActivityName(id, name))
})
class ModifyNameModal extends Component {
  constructor(props){
    super(props);
    this.activity = this.props.activity
  }

  onChangeName = (textChange) => {
    this.activity.name = textChange;
  };

  modifyName = () => {
    const {id, name} = this.activity
    this.props.modifyActivityName(id, name)
    addAlarmNoti(this.activity)
    this.props.completeChange()
  };

  render() {
    return (
          <View style={styles.centeredView}>
            <Modal
                transparent={true} 
                visible={true}
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
                        this.props.completeChange()
                        addAlarmNoti(this.activity)
                      }}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {this.modifyName()}}>
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
    height: 300
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
export default connect(null, mapDispatchToProps)(ModifyNameModal);