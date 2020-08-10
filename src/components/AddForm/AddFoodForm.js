import React, { Component } from "react";
import {StyleSheet, ToastAndroid, Alert, TouchableOpacity, Image} from "react-native";
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
import ImagePicker from 'react-native-image-picker';
import {connect} from "react-redux";
import {addFood} from "../../actions";

const default_image = require("../../../assets/default_image.png");

/* Dispatchers used: addFood to push new items to food list in store */
const mapDispatchToProps = dispatch => ({
  addFood: (name, category, filePath, isUpload) => dispatch(addFood(name, category, filePath, isUpload))
})

/* Component managing new item adding form */
class AddFoodForm extends Component {



  constructor(props){
    super(props);
    this.state = {
      name: '',
      category: 'null',
      filePath: {},
      isUpload: false,
    }
  }

  onValueChange(value) {
    this.setState({
      category: value
    });
  }

  chooseFile = () => {
    
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: './',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert("Failed to load image!")
      } else if (response.customButton) {
        const source = response.customButton;
        this.setState({
          filePath: source,
          isUpload: true
        });
      } else {
        let source = response;
        this.setState({
          filePath: source,
          isUpload: true
        });
      }
    });
  };

  showImage = () => {
    if (this.state.isUpload === true) {
      return (
        <View>
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={styles.imageUpload}
          />
        </View>
      )
    }

  }

  /* Dispatch call and state reset, along with a toast */
  handlePress(){
    const {name, category, filePath, isUpload} = this.state;
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
      this.props.addFood(name, category, filePath, isUpload);
      this.props.completeForm();
      this.setState({name: '', category: 'null', filePath: {}, isUpload: false})
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

        <Item>
          <View style={styles.viewbtnUpload}>
              <Label style = {{color: 'black'}}>Image: </Label>
              <TouchableOpacity onPress={this.chooseFile.bind(this)} style={styles.btnUpload}>
                <Text >Choose File</Text>
              </TouchableOpacity>
          </View>
        </Item>

      </Form>
      
      {this.showImage()}
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

  },
  viewbtnUpload:{ 
    flexDirection: "row", 
    marginTop: 12, 
    marginBottom: 12,
    marginLeft: 5,
    alignItems: "center" 
  },
  btnUpload:{ 
    borderColor: "grey", 
    borderWidth: 1, 
    borderRadius: 5, 
    height: 35, width: 100, 
    alignItems: "center", 
    justifyContent: "center", 
    marginLeft: 20
  },
  imageUpload:{ 
    width: 370, 
    height: 250, 
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center' 
  },
});