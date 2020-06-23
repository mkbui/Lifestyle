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
  Item
} from "native-base";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {connect} from "react-redux";
function mapStateToProps(state) {
  return {foodList: state.foodList}
}


class ExportPersonalDocumentScreen extends Component {
  state = {
    selectedValue: ' ',
  }
  setSelectedValue = (itemValue) =>{
    this.setState({selectedValue:  itemValue})
    this.askPermission();
  }

  askPermission() {
    async function requestExternalWritePermission() {
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
          createPDF();
        } 
        else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    //Calling the External Write permission function
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  }
  ExportHTMLToPDF = () => {

  }
  
  createHTML = () => {
  
  }
  GetData = () => {

  }
  createPDF = () => {
    GetData();
    createHTML();
    ExportHTMLToPDF();
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
       <ListItem style = {styles.row} icon last>
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