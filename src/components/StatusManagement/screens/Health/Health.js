import React, { Component } from "react";
import {StyleSheet,Image} from 'react-native';

/* React-navigation necessities import */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


/* Import images */
var icon_home = './../../../../../assets/homeTab_icon.png';
var icon_add = './../../../../../assets/addTab_icon.png';
var icon_chart = './../../../../../assets/chartTab_icon.png';

/* Import screens */
import AddStatus from './AddStatus/AddStatus';
import ViewStatus from './ViewStatus/ViewStatus';
import Chart from "./Chart/Chart";

const Tab = createBottomTabNavigator();
class Health extends Component {
  render() {
    return (
        <Tab.Navigator>
        <Tab.Screen
          name="AddStatus"
          component={AddStatus}
          options={{
            tabBarLabel: 'ADD',
            tabBarIcon: () => (
              <Image source={require(icon_add)} style={styles.iconStyle} />
            ),
          }}
        />
        <Tab.Screen
          name="ViewStatus"
          component={ViewStatus}
          options={{
            tabBarLabel: 'STATUS',
            tabBarIcon: () => (
              <Image source={require(icon_home)} style={styles.iconStyle} />
            ),
          }}
        />
          <Tab.Screen
          name="Chart"
          component={Chart}
          options={{
            tabBarLabel: 'CHART',
            tabBarIcon: () => (
              <Image source={require(icon_chart)} style={styles.iconStyle} />
            ),
          }}
        />
       
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  headerText: {
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
});
export default Health;
