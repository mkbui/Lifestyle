import React from 'react';
import Root from 'native-base';

/* React-navigation necessities import */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

/* Import screens */
import SplashScreen from '../screens/Splash';
import HomeScreen from '../screens/Home';

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
      <Drawer.Screen name='Home' component={DetailsScreen} />
    </Drawer.Navigator>
  )
} 

const Stack = createStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function AppNavigator() {
  return(
    <Stack.Navigator
      initialRouteName = 'Splash'
    >
      <Stack.Screen name = 'Home' component = {HomeScreen} />
      <Stack.Screen name = 'Splash' component = {SplashScreen}/>
      
    </Stack.Navigator>
  )
};

function AppContainer() {
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  )
};

export default AppContainer; /*() =>
  <Root>
    <AppContainer />
  </Root>;*/
