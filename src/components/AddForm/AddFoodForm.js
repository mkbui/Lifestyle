import React, { Component } from "react";
import {StyleSheet, ToastAndroid, Alert} from "react-native";
import {
  Container,
  View,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Item,
  Input,
  Picker,
  Form,
  Label,
  Toast,

} from "native-base";

import {connect} from "react-redux";
import {addFood} from "../../actions";

const default_image = require("../../../assets/default_image.png");

/* Dispatchers used: addFood to push new items to food list in store */
const mapDispatchToProps = dispatch => ({
  addFood: (name, category) => dispatch(addFood(name, category))
})

/* Component managing new item adding form */
class AddFoodForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      category: 'null',
    }
  }

  onValueChange(value) {
    this.setState({
      category: value
    });
  }

  /* Dispatch call and state reset, along with a toast */
  handlePress(){
    const {name, category} = this.state;
    if (name === '' || category === 'null') {
      Alert.alert(
        "Warning",
        "Please enter sufficient name and category",
        [
          { text: "OK"}
        ],
        { cancelable: false }
      );
    }
    else {
      this.props.addFood(name, category);
      this.props.completeForm();
      this.setState({name: '', category: 'null'})
      ToastAndroid.show(
        "Food added successfully!",
        ToastAndroid.SHORT
      )
    }

  }

  render(){
    const {name} = this.state;
    return(
      <View style = {styles.formContainer}>
        <Text style = {{padding: 20, fontWeight: "400", fontSize: 15, textAlign: "center"}}>
          Enter basic information here:
        </Text>
        <Form>
        <Item>
          <Input 
            placeholder = "Name"
            onChangeText = { (text) => this.setState({name: text})}
            value = {name}
          />
        </Item>
        <Item picker>
          <Picker
            headerStyle={{ backgroundColor: "#b95dd3" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            mode="dropdown"
            headerBackButtonText="Back!"
            style={{ width: undefined, paddingLeft: 50 }}
            selectedValue={this.state.category}
            onValueChange={this.onValueChange.bind(this)}
          >
                <Item label="Choose category..." value="Null" />
                <Item label="Protein" value="Protein" />
                <Item label="Vegetable" value="Vegetable" />
                <Item label="Fat" value="Fat" />
                <Item label="Grains" value="Grains" />
                <Item label="Beverage" value="Beverage" />
                <Item label="Fruit" value="Fruit" />
          </Picker>
        </Item>

      </Form>
      <Button 
        block  
        style={{ margin: 15, marginTop: 20 }}
        onPress = {this.handlePress.bind(this)}  
      >
        <Text>COMPLETE</Text>
      </Button>
    </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(AddFoodForm);

const styles = StyleSheet.create({
  formContainer: {

  }
});