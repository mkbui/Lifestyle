import React from 'react';
import {View, Text} from 'react-native';
import {Root} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';

/* React-navigation necessities import */
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

/* Import screens */
import SplashScreen from '../screens/Splash';
import HomeScreen from '../screens/Home';
import SettingsScreen from '../screens/Settings';
import FirstformScreen from '../screens/Firstform';
// New screen import
import ScheduleScreen from '../screens/Schedule';
import ListScreen from '../screens/Display';
import AdviceScreen from '../screens/Advice';
import PreForm from '../components/AdviceScreens/PreForm';
import AdviceAnalysis from '../components/AdviceScreens/AdviceAnalysis';
import WarningSuggest from '../components/AdviceScreens/WarningSuggest';
import MainTracker from '../components/StatusManagement/screens/MainTracker';
import Budget from '../components/StatusManagement/screens/Budget/Budget';
import Health from '../components/StatusManagement/screens/Health/Health';
import BudgetItem from '../components/StatusManagement/screens/Budget/ViewStatus/BudgetItem';
import Income from "../components/StatusManagement/screens/Budget/AddStatus/Income"
import Expense from './StatusManagement/screens/Budget/AddStatus/Expense';
import ViewStatus_Health from '../components/StatusManagement/screens/Health/ViewStatus/ViewStatus';
import Exercise from './StatusManagement/screens/Health/AddStatus/Exercise';
import Meal from './StatusManagement/screens/Health/AddStatus/Meal';

import FinanceTracker from '../components/TrackerScreens/FinanceTracker';
import HealthTracker from '../components/TrackerScreens/HealthTracker';
import ExportPersonalDocumentScreen from "../components/ExportPDF/ExportPersonalDocument"
//import ExportPersonalDocumentScreen from '../screens/ExportPersonalDocument';
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
      <Drawer.Screen name = 'Tracker' component = { TrackerNavigator } />
      <Drawer.Screen name = 'My Schedule' component = { ScheduleScreen } />
      <Drawer.Screen name = 'Suggestion List' component = { ListScreen } />
      <Drawer.Screen name = 'Today`s Advice' component = { AdviceScreen } />
      <Drawer.Screen name = 'Settings' component = { SettingsScreen } />
      <Drawer.Screen name = 'Export PDF' component = { ExportPersonalDocumentScreen } />
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
      
      <Stack.Screen name = 'My Schedule' component = {ScheduleScreen} />
      <Stack.Screen name = 'Suggestion List' component = { ListScreen } />
      

      <Stack.Screen name = 'Today`s Advice' component = {AdviceScreen} />
      <Stack.Screen name = 'PreForm' component = {PreForm} />
      <Stack.Screen name = 'AdviceAnalysis' component = {AdviceAnalysis} />
      <Stack.Screen name = 'WarningSuggest' component = {WarningSuggest} />

      <Stack.Screen name = 'Budget' component = {Budget}/>
      <Stack.Screen name = 'Health' component = {Health}/>
      
      {/* Old tracker template */}
      <Stack.Screen name = 'HealthTracker' component = {HealthTracker}/>
      <Stack.Screen name = 'FinanceTracker' component = {FinanceTracker}/>

      <Stack.Screen name = 'Export PDF' component = { ExportPersonalDocumentScreen } />
    </Stack.Navigator>
  )
};

function TrackerNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainTracker" headerMode="none">
      <Stack.Screen name="MainTracker" component={MainTracker} />
      <Stack.Screen name="Budget" component={Budget} />
      <Stack.Screen name="Health" component={Health} />

      <Stack.Screen name="BudgetItem" component={BudgetItem} />
      <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Expense" component={Expense} />

      <Stack.Screen name="ViewStatus_Health" component={ViewStatus_Health} />
      <Stack.Screen name="Exercise" component={Exercise} />
      <Stack.Screen name="Meal" component={Meal} />
    </Stack.Navigator>
  );
}

/* Main Container with Drawer Navigator as root navigator */
function AppContainer() {
  return (
    <NavigationContainer >
      <DrawerNavigator/>
    </NavigationContainer>
  )
};

export default () =>
  <PaperProvider>
    <Root>
        <AppContainer />
    </Root>
  </PaperProvider>
 