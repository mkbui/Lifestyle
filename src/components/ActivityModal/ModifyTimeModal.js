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
      date : new Date(2020, 7, 4, this.props.hour, this.props.min, 1, 1),
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
});
export default connect(null, mapDispatchToProps)(ModifyTimeModal);