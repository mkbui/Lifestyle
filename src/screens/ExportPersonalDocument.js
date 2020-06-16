import React, { Component, useState } from "react";
import {StyleSheet, Picker, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Container,
  View,
  Text,
  Content
} from "native-base";


PickerScreen = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState("default");
  return (
    <Container style = {styles.Container}>
       <View style={{flex: 0, flexDirection: 'row', justifyContent:'center', alignItems: 'center',
       margin: 15, marginTop: 50
       }}>
        <Text>Please select activity: </Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="All" value="default" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      <View style={{
        flex:1, 
        alignItems:'flex-end',
        margin: 15, marginTop: 50
      }}>
        <Button
        title="Next"
        onPress={() => navigation.navigate('OnePagePreview')}
        />
      </View>
    </Container>
  );
}

OnePagePreview = ({navigation}) => {
  return (
    <Content padder>
      <Text>
        Nothing........
        
        
      </Text>
    </Content>
  )
}
const MyStack = createStackNavigator();
class ExportPersonalDocumentScreen extends Component {
  render() {
    return (
      <MyStack.Navigator >
      <MyStack.Screen name="PickerScreen" component={PickerScreen} />
      <MyStack.Screen name="OnePagePreview" component={OnePagePreview} />
      </MyStack.Navigator>
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
});

export default ExportPersonalDocumentScreen;