import React, { Component } from "react";
import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  CheckBox,
  View,
  ListItem,
  Card,
  CardItem,
} from "native-base";
import {connect} from "react-redux";
import {removeActivity, activateActivity} from "../../actions";
import {addAlarmNoti, removeAlarmNoti} from '../../utils';
function mapStateToProps(state) {
  return {activityList: state.activityList}
}
const mapDispatchToProps = dispatch => ({
  removeActivity: (id) => dispatch(removeActivity(id)),
  activateActivity: (id) => dispatch(activateActivity(id)),
})

class ActivityList extends Component {
  constructor(props){
    super(props)
  }
  removeItem(activity){
    this.props.removeActivity(activity.id);
    removeAlarmNoti(activity);
    ToastAndroid.show(
      "Activity removed",
      ToastAndroid.SHORT
    )
  }
  activateItem(activity){
    this.props.activateActivity(activity.id);
    if (activity.activate === false) {
      addAlarmNoti(activity)
    }
    else {
      removeActivity(activity)
    }
  }

  setModalVisible = (visible) => {
    this.setState(state => ({
      [visible] : !state[visible]
    }));
  };
  onChangeName = (activity) => {
    removeAlarmNoti(activity)
    this.props.changeName(activity);
    this.props.openNameModal();
  }

  onChangeTime = (activity) => {
    removeAlarmNoti(activity)
    this.props.changeTime(activity);
    this.props.openTimeModal();
  }

  onChangeRepeat = (activity) => {
    removeAlarmNoti(activity)
    this.props.changeRepeat(activity);
    this.props.openRepeatModal();
  }

  render() {
    const {activityList} = this.props;
    return (
      activityList.length > 0?  activityList.map(activity => 
        <Card key={activity.id}>
          <CardItem style={styles.activityView}>
              <Left style={{flex: 1}}>
                <TouchableOpacity onPress={() => {this.onChangeName(activity)}}>
                  <Text style={{marginLeft : -5}}>
                    {activity.name.length > 0 ? activity.name : "(no name)"}
                  </Text>
                </TouchableOpacity>
              </Left>
              <Body style={{flex: 2, alignItems:"center"}}>

                  <View>
                    <TouchableOpacity onPress={() => {this.onChangeTime(activity)}}>
                      <Text style={styles.timeText}>
                        {activity.hour}:{activity.min <= 9 ? '0' + activity.min : activity.min}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => {this.onChangeRepeat(activity)}}>
                    <View style={{marginTop: 20, flexDirection:"column", alignItems:"center"}}>
                      <Text style={{fontSize: 15}}>Repeat</Text>
                      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} button={true}>
                      { 
                        activity.repeat.filter(item => {return item.value === true}).length > 0 ? 
                          activity.repeat.map(item => {
                          return(
                            (item.value === true) &&
                            <ListItem key={item.day} style={{borderBottomWidth: 0}}>
                              <Text style={{fontSize: 10}}>
                                {item.day}
                              </Text>
                            </ListItem>
                          )
                        }) : <Text style={{fontSize: 10}}> No </Text>
                      }
                      </View>  
                    </View>
                  </TouchableOpacity>

              </Body>
              <Right style={{flex: 1}}>
                <View style={{flexDirection:'column', alignItems: "flex-end"}}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {this.activateItem(activity)}}
                    value={activity.activate}
                  />
                  <TouchableOpacity onPress={() => {this.removeItem(activity)}} style={styles.binIcon}>
                    <Icon
                      name="trash" 
                      style={styles.binIcon}>
                    </Icon>
                  </TouchableOpacity>
                </View>
              </Right>
          </CardItem>
        </Card>
      ) : <View><Text>No activity</Text></View>
    )
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  activityView: {
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
  },
  binIcon: {
    fontSize: 30,
    color: '#81b0ff',
    marginTop: 20,
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);