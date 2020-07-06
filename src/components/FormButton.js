import React, {Component} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';

/* Simple Initialize Button for collapsing Form (crediting dabbott) */
class FormButton extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {title, handlePress, color} = this.props;
    return(
      <TouchableOpacity
        style = {[styles.button, {backgroundColor: color}]}
        onPress = {handlePress}
      >
        <Text style = {styles.buttonText  }>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default FormButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    minWidth: 100,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
  },
  small: {
    fontSize: 14,
    padding: 5,
  },
  large: {
    fontSize: 16,
    padding: 10,
  },
  buttonText: {
    justifyContent: 'center',
    marginTop: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },

})