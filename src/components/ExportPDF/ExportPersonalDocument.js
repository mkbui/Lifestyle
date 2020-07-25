import React, { Component, useState,set } from "react";
import {StyleSheet, PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
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
  View,
  Body,
  Picker,
  ListItem,
  Separator,
  CheckBox
} from "native-base";
import PDFLib, { PDFDocument, PDFPage, PageSizes, StandardFonts, PDFFont } from 'pdf-lib';
import ViewShot from "react-native-view-shot"
import PieChart from '../StatusManagement/screens/Budget/Chart/PieChart'
import LineChart from "../StatusManagement/screens/Budget/Chart/LineChart"
import ExerciseChart from "../StatusManagement/screens/Health/Chart/ExerciseChart"
import ExerciseLineChart from "../StatusManagement/screens/Health/Chart/ExerciseLineChart"
import MealChart from "../StatusManagement/screens/Health/Chart/MealChart"
import MealLineChart from "../StatusManagement/screens/Health/Chart/MealLineChart"
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';



const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PDF_PATH = `${RNFetchBlob.fs.dirs.DocumentDir}/out.pdf`;


class GraphGenerator extends Component{
  constructor(props){
      super(props);
      this.typeGraph = this.props.type.split("_")[0];
      this.typeData = this.props.type.split("_")[1];
      this.typeOption = this.props.type.split("_")[2];
      this.state = {
        modalVisible: true
      }

  }
  componentDidMount () {
      this.refs.viewShot.capture().then(uri => {
        //Do something
        console.log("captured" + uri)
        
        this.props.onSuccess && this.props.onSuccess(uri, this.props.type)
      });
    }
  render() {
    const {selectedMonth} = this.props
    const {modalVisible} = this.state
    if(this.typeGraph === "PIE"){
      if(this.typeData === "BUDGET"){
        if(this.typeOption === "INCOME"){
          return(
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <PieChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                typePieChart={'Income'}/>
            </ViewShot>
          );
        }
        else if(this.typeOption === "EXPENSE"){
          return(
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <PieChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                typePieChart={'Expense'}/>
            </ViewShot>
          )
        }
        else return null
      }
      else if(this.typeData === "HEALTH"){
        if(this.typeOption === "MEAL"){
          return(
            
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <MealChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                />
            </ViewShot>
          );
        }
        else if(this.typeOption === "EXERCISE"){
          return(
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <ExerciseChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                />
            </ViewShot>
          );
        }
        else return null
      }
      else return null
      }
      else if(this.typeGraph === "LINE"){
        if(this.typeData === "BUDGET"){
          if(this.typeOption === "INCOME"){
            return(
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <LineChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                typePieChart={'Income'}/>
            </ViewShot>
            );
          }
          else if(this.typeOption === "EXPENSE"){
            return(<ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
              <LineChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                typePieChart={'Expense'}/>
            </ViewShot>
            )
          }
          else return null
        }
        else if(this.typeData === "HEALTH"){
          if(this.typeOption === "MEAL"){
            return(
              <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <MealLineChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                />
            </ViewShot>
            );
          }
          else if(this.typeOption === "EXERCISE"){
              return(<ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                <ExerciseLineChart 
                selectedMonth={selectedMonth}
                modalVisible={modalVisible}
                />
             </ViewShot>)
          }
          else return null
        }
        else return null
    }
  }

}

class ExportPersonalDocumentScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      showItem : true,
      isHealthSelected: false,
      isBudgetSelected: false,
      isPDFViewerOn: false,
      isGraphDisplayOn: false,
      finishProcess: false,
      pdfBytes: null
    }

    this.type = ""
    this.selectedMonth = moment().format('YYYY-MM')
    
    this.pieMealImg = ""
    this.lineMealImg = ""
    this.pieBudgetIncomeImg = ""
    this.lineBudgeIncometImg = ""
    this.pieBudgetExpenseImg = ""
    this.lineBudgeIncometImg = ""
    this.pieExImg = ""
    this.lineExImg = ""
  }

  promptFail(){

  }

  getGraph = async () => {
    await sleep(100)
    let type = ""
    if (this.state.isBudgetSelected){
      this.type = "PIE_BUDGET_INCOME"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})


      this.type = "LINE_BUDGET_INCOME"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})


      this.type = "PIE_BUDGET_EXPENSE"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})
      

      this.type = "LINE_BUDGET_EXPENSE"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})
    }
    if(this.state.isHealthSelected){
      this.type = "PIE_HEALTH_MEAL"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})


      this.type = "LINE_HEALTH_MEAL"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})


      this.type = "PIE_HEALTH_EXERCISE"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})

      
      this.type = "LINE_HEALTH_EXERCISE"
      this.setState({isGraphDisplayOn: true})
      await sleep(500)
      this.setState({isGraphDisplayOn: false})
    }
  }

  onSuccess = (uri, type) => {
    switch(type){
        case "PIE_BUDGET_INCOME": 
          this.pieBudgetIncomeImg = uri;
          break;
        case "LINE_BUDGET_INCOME":
          this.lineBudgeIncometImg = uri;
          break;
        case "PIE_BUDGET_EXPENSE": 
          this.pieBudgetExpenseImg = uri;
          break;
        case "LINE_BUDGET_EXPENSE": 
          this.lineBudgeExpensetImg = uri;
          break;
        case "PIE_HEALTH_MEAL": 
          this.pieMealImg = uri;
          break;
        case "LINE_HEALTH_MEAL": 
          this.lineMealImg = uri;
          break;
        case "PIE_HEALTH_EXERCISE": 
          this.pieExImg = uri;
          break;
        case "LINE_HEALTH_EXERCISE": 
          this.lineExImg = uri;
          break;

    }
  }

  renderGraph = () => {
      return(
        <GraphGenerator 
        type = {this.type} 
        selectedMonth = {this.selectedMonth}
        onSuccess = {this.onSuccess}/>
      )
  }
  handlePress = async () => {
    await sleep(100)
    this.setState({showItem: false})
    if (Platform.OS === 'android') {
      this.requestExternalWritePermission();
    } else {
      ToastAndroid.show("does not support IOS",
      ToastAndroid.LONG)
    }  
  }
 
  requestExternalWritePermission = async () => {
    try {
      let that = this
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Lifestyle App External Storage Write Permission',
          message:
            'Export Personal Document needs access to Storage data',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await that.createPDF();
      } 
      else {
        alert('WRITE_EXTERNAL_STORAGE permission denied');
        this.promptFail()
      }
    } catch (err) {
      alert('Write permission err', err);
      console.warn(err);
    }
  }

  createPDF = async () => {
    
    //Preparation
    const pdfDoc          = await PDFDocument.create()
    const helveticaFont   = await pdfDoc.embedFont(StandardFonts.Helvetica)
    /*
        const pieBudgetIncomeImg = await pdfDoc.embedJpg(this.pieBudgetIncomeImg)
    const pieBudgetExpenseImg = await pdfDoc.embedJpg(this.pieBudgetExpenseImg)
    const lineBudgetIncomeImg = await  pdfDoc.embedJpg(this.lineBudgeIncometImg)
    const lineBudgetExpenseImg = await pdfDoc.embedJpg(this.lineBudgeExpensetImg)
    const pieMealImg = await pdfDoc.enbedJpg(this.pieMealImg)
    const lineMealImg = await pdfDoc.embedJpg(this.lineMealImg)
    const pieExerciseImg = await pdfDoc.embedJpg(this.pieExerciseImg)
    const lineExerciseImg = await pdfDoc.embedJpg(this.lineExImg)

    */

    //First Page
    const firstPage = pdfDoc.addPage()

    firstPage.drawText("LIFESTYLE MONITORING APPLICATION", {
      x: 10,
      y:20,
      size: 30,
    })
    firstPage.drawText("August, 2020", {
      x:10,
      y: 100,
      size: 10,
    })
    //Content
    ////FOOD
    /*if(this.state.isBudgetSelected){
      pdfDoc
      .addPage()
      .drawImage( pieBudgetIncomeImg, {
        width: 30,
      })
      pdfDoc
      .addPage()
      .drawImage( lineBudgetIncomeImg, {
        width: 30,
      })
      pdfDoc
      .addPage()
      .drawImage( pieBudgetExpenseImg, {
        width: 30,
      })
      pdfDoc
      .addPage()
      .drawImage(lineBudgetExpenseImg, {
        width: 30,
      })
    }
    if(this.state.isHealthSelected){
      pdfDoc
      .addPage()
      .drawImage( pieMealImg, {
        width: 30,
      })
      pdfDoc
      .addPage()
      .drawImage( lineMealImg, {
        width: 30,
      })
      pdfDoc
      .addPage()
      .drawImage( pieExerciseImg, {
        width: 30,
      })
      pdfDoc
      .addPage()
      .drawImage( lineExerciseImg, {
        width: 30,
      })
    }*/
    
    //Last Page
    //Finish
    const pdfBytes = await pdfDoc.saveAsBase64()
    await this.writePdf(pdfBytes)
    this.onFinish()
  }

  writePdf = async (dir) =>{
    RNFetchBlob.fs.writeFile(PDF_PATH, dir, 'base64').then(response => {
      console.log('Success Log: ', response);
  })
  .catch(errors => {
      console.log(" Error Log: ", errors);
  });
  }

    onFinish = () => {
    console.log("fuck yea")
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
       
      {this.state.showItem &&
      <ListItem>
        <Body>
          <Text>Exercise and nutrition tracks</Text>
        </Body>
        <Right>
        <CheckBox 
        checked={this.state.isHealthSelected} 
        onPress = {() => {this.setState({isHealthSelected: !this.state.isHealthSelected})}}/>
        </Right>
      </ListItem>}
      {this.state.showItem &&
      <ListItem>
        <Body>
          <Text>Budget tracks</Text>
        </Body>
        <Right>
        <CheckBox 
        checked={this.state.isBudgetSelected} 
        onPress = {() => {this.setState({isBudgetSelected: !this.state.isBudgetSelected})}}/>
        </Right>
      </ListItem>}
      {this.state.showItem &&
      <Button
      onPress = {this.handlePress}
      style = {{justifyContent:"center"}}>
        <Text>Next</Text>
      </Button>}
      <View style = {{marginTop: 30}}>
      {this.state.isGraphDisplayOn && this.renderGraph()}
      </View>
      <View>
        <Text>{PDF_PATH}</Text>
      </View>
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

export default ExportPersonalDocumentScreen;