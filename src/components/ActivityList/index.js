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
  Toast,
} from "native-base";
import {connect} from "react-redux";
import {removeActivity, activateActivity} from "../../actions";
import ModifyNameModal from '../ActivityModal/ModifyNameModal'

function mapStateToProps(state) {
  return {activityList: state.activityList}
}
const mapDispatchToProps = dispatch => ({
  removeActivity: (id) => dispatch(removeActivity(id)),
  activateActivity: (id) => dispatch(activateActivity(id)),
  // modifyActivityTime: (id) => dispatch(modifyActivityTime(id, hour, min)),
  // modifyActivityRepeat: (id) => dispatch(modifyActivityRepeat(id, repeat))
})

class ActivityList extends Component {
  constructor(props){
    super(props)
    this.activity = {
      name: "",
      id: "",
      hour: 0,
      min: 0,
    }
  }
  removeItem(activity){
    this.props.removeActivity(activity.id);
    ToastAndroid.show(
      "Activity removed",
      ToastAndroid.SHORT
    )
  }
  activateItem(activity){
    this.props.activateActivity(activity.id);
  }

  setModalVisible = (visible) => {
    this.setState(state => ({
      [visible] : !state[visible]
    }));
  };
  onChangeName = (id, name) => {
    this.props.changeName(id, name);
    this.props.openNameModal();
  }

  onChangeTime = (id, hour, min) => {
    this.props.changeTime(id, hour, min);
    this.props.openTimeModal();
  }


  render() {
    const {activityList} = this.props;
    return (
      activityList.map(activity => 
        <ListItem thumbnail key={activity.id} style={styles.activityView}>
          <Left style={{flex: 1}}>
            <TouchableOpacity onPress={() => {this.onChangeName(activity.id, activity.name)}}>
              <Text style={{marginTop : 0.5}}>
                {activity.name.length > 0 ? activity.name : "(no name)"}
              </Text>
            </TouchableOpacity>
          </Left>
          <Body style={{flex: 2}}>
            <View style={{flexDirection:'column', alignItems:"center"}}>
              <View>
                <TouchableOpacity onPress={() => {this.onChangeTime(activity.id, activity.hour, activity.min)}}>
                  <Text style={styles.timeText}>
                    {activity.hour}:{activity.min <= 9 ? '0' + activity.min : activity.min}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 20, flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
                { 
                  activity.repeat.filter(item => {return item.value === true}).length > 0 ? 
                    activity.repeat.map(item => {
                    return(
                      (item.value === true) && <ListItem key={item.day}>
                        <Text style={{fontSize: 10}}>
                          {item.day}
                        </Text>
                      </ListItem>
                    )
                  }) : <Text style={{fontSize: 10}}> Today </Text>
                }
              </View>
            </View>
          </Body>
          <Right style={{flex: 1}}>
            <View style={{flexDirection:'column'}}>
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
        </ListItem>
      )
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
  },
  binIcon: {
    fontSize: 30,
    color: '#81b0ff',
    marginTop: 20,
    marginLeft: 15,
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);