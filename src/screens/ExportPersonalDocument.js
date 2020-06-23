import React, { Component, useState,set } from "react";
import {StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body,
  Picker,
  ListItem,
  Separator
} from "native-base";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {connect} from "react-redux";
function mapStateToProps(state) {
  return {foodList: state.foodList}
}



class ExportPersonalDocumentScreen extends Component {
  state = {
    selectedValue: ' ',
    filePath: ''
  }
  setSelectedValue = (itemValue) =>{
    this.setState({selectedValue:  itemValue})
  }

  handlePress = () =>{
    if (Platform.OS === 'android') {
      this.requestExternalWritePermission();
    } else {
      this.createPDF();
    }
  }
 
  async requestExternalWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Lifestyle App External Storage Write Permission',
          message:
            'Export Personal Document needs access to Storage data',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.createPDF();
      } 
      else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      alert('Write permission err', err);
      console.warn(err);
    }
  }
  ExportHTMLToPDF = () => {

  }
  
  createHTML = () => {
  
  }
  GetData = () => {

  }

  async createPDF() {
    //GetData();
    //createHTML();
    //ExportHTMLToPDF();
    let options = {
      //Content to print
      html:
        '<h1 style="text-align: center;"><strong>Hello Guys</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p>',
      //File Name
      fileName: 'test',
      //File directory
      directory: 'docs',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    this.setState({filePath:file.filePath});
  }
  render() {
    return (
      <Container style = {styles.container}>
       <Header>
          <Left style = {{flex: 1}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style = {{flex: 1}}>
            <Title>Export Document</Title>
          </Body>
          <Right style = {{flex: 1}}>
            <Button 
              transparent 
              onPress={() => this.props.navigation.goBack()}>
              <Icon name = "arrow-back" />
            </Button>
          </Right>
        </Header>
       <Content padder>
       <ListItem style = {styles.row} icon last noBorder>
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon active name="ios-man" />
              </Button>
            </Left>
            <Body>
              <Text>Select Activity</Text>
            </Body>
            <Right>
              <Picker
                note
                mode="dropdown"
                style={{ width: 150 }}
                selectedValue={this.state.selectedValue}
                onValueChange={this.setSelectedValue.bind(this)}
              >
              </Picker>
            </Right>
          </ListItem>
          <ListItem style = {styles.row} icon last noBorder>
            <Left></Left>
            <Body></Body>
            <Right>
              <Button
                style={{ width: 70 }}
                onPress={() =>{
                  this.handlePress()
                }}
              >
                <Text>Next</Text>
              </Button>
            </Right>
          </ListItem>
      <Text>{this.state.filePath}</Text>
      
      </Content>
    </Container>
    );
  }
}




const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',

  },
  headerText:{
    fontSize: 30,
    textAlign: 'left',
    marginTop: 30,
  },
  contentText:{
    textAlign: 'center',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 50,
  },
});

export default connect(mapStateToProps)(ExportPersonalDocumentScreen);