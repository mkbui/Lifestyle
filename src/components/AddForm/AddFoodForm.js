import React, { Component } from "react";
import {StyleSheet} from "react-native";
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

const mapDispatchToProps = dispatch => ({
  addFood: (name, category) => dispatch(addFood(name, category))
})

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

  handlePress(){
    const {name, category} = this.state;
    this.props.addFood(name, category);
    this.setState({name: '', category: 'null'})
    Toast.show({
      text: "Food added successfully!",
      type: "success",
    })
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
                <Item label="Choose category..." value="null" />
                <Item label="Protein" value="protein" />
                <Item label="Vegetable" value="vegetable" />
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