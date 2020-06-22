import React, { Component } from "react";
import {
  StyleSheet,
  Switch,
  TouchableOpacity
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
  ListItem,
  Toast,
} from "native-base";
import {connect} from "react-redux";
import {removeActivity} from "../../actions";

function mapStateToProps(state) {
  return {activityList: state.activityList}
}
const mapDispatchToProps = dispatch => ({
  removeActivity: (id) => dispatch(removeActivity(id))
})
class ActivityList extends Component {
  removeItem(data){
    this.props.removeActivity(data.id);
    Toast.show({
      text: "Removed successfully!",
      type: "success",
    })
  }
  render() {
    const {activityList} = this.props;
    return (
      activityList.map(activity => (
        <ListItem thumbnail key={activity.id} style={styles.activityView}>
          <Left>
            <TouchableOpacity onPress={() => {console.log('a')}}>
              <Text style={{marginTop : 0.5}}>
                {activity.name}
              </Text>
            </TouchableOpacity>
          </Left>
          <Body>
            <View style={{flexDirection:'column', alignItems:"center"}}>
              <View>
                <TouchableOpacity>
                  <Text style={styles.timeText}>
                    {activity.hour}:{activity.min <= 9 ? '0' + activity.min : activity.min}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 20, flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
                { 
                  activity.repeat.map(item => {
                    return(
                      (item.value === true) && <ListItem key={item.day}>
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
            <View style={{flexDirection:'column', justifyContent: "space-between"}}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {}}
                value={activity.state.activate}
              />
              <TouchableOpacity onPress={() => {this.removeItem(activity)}}>
                <Icon
                  name="trash" 
                  style={styles.binIcon}>
                </Icon>
              </TouchableOpacity>
            </View>
          </Right>
        </ListItem>
      ))
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
    marginLeft: 25,
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);