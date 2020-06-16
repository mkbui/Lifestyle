import React from 'react';
import {View, Text} from 'react-native';
import {Root} from 'native-base';

/* React-navigation necessities import */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

/* Import screens */
import SplashScreen from '../screens/Splash';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import FirstformScreen from '../screens/Firstform';
import ListScreen from '../screens/Display';
import TrackerScreen from '../screens/Tracker';
import AdviceScreen from '../screens/Advice';
import PreForm from '../components/AdviceScreens/PreForm';
import AdviceAnalysis from '../components/AdviceScreens/AdviceAnalysis';
/* Drawer navigator containing side list of main screens and stack navigator itself */
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return(
    <Drawer.Navigator
      initialRouteName='Home'
      drawerStyle={{
        width: 250,
        backgroundColor: '#c6cbef'
      }}  
      drawerContentOptions = {{
        activeTintColor: "#e91e63"
      }}
    >
      <Drawer.Screen name = 'Home' component = { StackNavigator } />
      <Drawer.Screen name = 'Tracker' component = { TrackerScreen } />
      <Drawer.Screen name = 'Settings' component = { SettingsScreen } />
      <Drawer.Screen name = 'Suggestion List' component = { ListScreen } />
      <Drawer.Screen name = 'Today`s Advice' component = { AdviceScreen } />
    </Drawer.Navigator>
  )
} 


/* Test screen sample */
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

/* Stack navigator used to contain screens navigatable within the app */
const Stack = createStackNavigator();
function StackNavigator() {
  return(
    <Stack.Navigator
      initialRouteName = 'Splash'
      headerMode = 'none'
    >
      <Stack.Screen name = 'Splash' component = {SplashScreen}/>
      <Stack.Screen name = 'Home' component = {HomeScreen} />
      <Stack.Screen name = 'Settings' component = { SettingsScreen } />
      <Stack.Screen name = 'Firstform' component = {FirstformScreen} />
      <Stack.Screen name = 'Suggestion List' component = { ListScreen } />
      <Stack.Screen name = 'Tracker' component = {TrackerScreen} />

      <Stack.Screen name = 'Today`s Advice' component = {AdviceScreen} />
      <Stack.Screen name = 'PreForm' component = {PreForm} />
      <Stack.Screen name = 'AdviceAnalysis' component = {AdviceAnalysis} />
    </Stack.Navigator>
  )
};

/* Main Container with Drawer Navigator as root navigator */
function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  )
};

export default () =>
  <Root>
    <AppContainer />
  </Root>
