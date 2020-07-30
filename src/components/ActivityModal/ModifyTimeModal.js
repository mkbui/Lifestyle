import React, { Component } from "react";
import {
  StyleSheet,
} from 'react-native';
import {
  View,
} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from "react-redux";
import {modifyActivityTime, activateActivity} from "../../actions";
import {addAlarmNoti} from '../../utils';

const mapDispatchToProps = dispatch => ({
  modifyActivityTime: (id, hour, min) => dispatch(modifyActivityTime(id, hour, min)),
  activateActivity: (id, bool) => dispatch(activateActivity(id, bool)),
})


class ModifyTimeModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode : 'time',
      date : new Date(2020, 7, 23, this.props.activity.hour, this.props.activity.min, 0, 0)
    };
    this.activity = this.props.activity
  }
  onChangeTime = (event, selectedDate) => {
    if (event.type == "set") {
      const currentDate = selectedDate || this.state.date
      this.state.date = currentDate;
      this.activity.hour = this.state.date.getHours()
      this.activity.min = this.state.date.getMinutes()
      this.props.modifyActivityTime(this.activity.id, this.activity.hour, this.activity.min)
      this.props.activateActivity(this.activity.id, true)
    }
    addAlarmNoti(this.activity)
    this.props.completeChange()
  };

  render() {
    const { mode, date } = this.state;
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