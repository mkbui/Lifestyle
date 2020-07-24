
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';

import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { Slider } from 'react-native-elements';

import * as actions from "../../../../../actions"
import { connect } from 'react-redux';
import moment from 'moment';


var icon_close = "../../../../../../assets/close_icon.png"

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      date: moment().format('DD-MM-YYYY'),
      name: '',
      carb: 0,
      protein: 0,
      fat: 0,
      filePath: {},
      isUpload: false
    };

  }
  componentWillMount() {
    const {mealEdit} = this.props;
    if (mealEdit) {
      this.setState({
        id: mealEdit.id,
        date: mealEdit.date,
        name: mealEdit.name,
        carb: mealEdit.carb,
        protein: mealEdit.protein,
        fat: mealEdit.fat,
        filePath: mealEdit.filePath,
        isUpload: mealEdit.isUpload
      });
    }
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: './',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
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
    console.log("isUpload", this.state.isUpload)
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
  handleOnChange = (text, name) => {
    this.setState({
      [name]: text,
    });

  };
  handleOnSubmit = () => {
    if (this.state.name === '') {
      alert('Please enter name !!!')
    } else if (this.state.carb === '' || this.state.protein === '' || this.state.fat === '') {
      alert('Please choose nutrition intake !!!')
    } else {
      var currentDate = moment().format("DD-MM-YYYY");

      this.props.onSubmit(this.state);
      this.props.updateDailyRecord(this.state);
      this.props.deleteMealEdit();
      this.setState({
        id: '',
        date: currentDate,
        name: '',
        carb: 0,
        protein: 0,
        fat: 0,
        filePath: {},
        isUpload: false
      })

      ToastAndroid.show(
        "Record submitted!",
        ToastAndroid.SHORT
      )
    }
  };


  render() {

    return (
      <Content padder style={{ backgroundColor: "white" }}>

         {/* SHOW TITLE EDIT */}
        {this.props.mealEdit ? (
          <View>
            <TouchableOpacity style={styles.viewIcon} onPress={() => {
              this.props.navigation.goBack(), this.props.deleteMealEdit()
            }}>
              <Image source={require(icon_close)} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={styles.titleEdit}>
                EDIT MEAL
            </Text>
            </View>
          </View>
        ) : null}
        {/* DATE SELECT */}
        <Form>
          <Item stackedLabel style={{ borderColor: 'white' }}>
            <Label>Date:</Label>
            <DatePicker
              style={styles.datepicker}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-1-1000"
              maxDate="01-1-3000"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 300,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: -30,
                },
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
              androidMode="spinner"
            />
          </Item>
        </Form>

        {/* NAME INPUT */}

        <Form>
          <Item stackedLabel>
            <Label>Name: </Label>
            <Item regular style={{ marginTop: 10 }}>
              <Input
                style={{ height: 45 }}
                placeholder="Name ...."
                // onChangeText={(text) => this.handleOnChange(text,'name')}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                name="name"
              />
            </Item>
          </Item>
        </Form>

        {/* UPLOAD IMAGE */}
        <View style={styles.container}>
          <View style={styles.container}>

            {this.showImage()}

            <View style={styles.viewbtnUpload}>
              <Label>Image: </Label>
              <TouchableOpacity onPress={this.chooseFile.bind(this)} style={styles.btnUpload}>
                <Text >Choose File</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        {/* NUTRITION INPUT */}
        <View style={{flexDirection:"row",  marginTop: 30,}}>
            <Label style={styles.labelNutri}>
              CARB :
            </Label>
            <Text style={{fontSize:20}}> {this.state.carb} g</Text>
        </View>
        <View style={styles.viewSlider}>
          <Slider
            value={this.state.carb}
            onValueChange={value => this.setState({ carb: value })}
            step={1}
            minimumValue={0}
            maximumValue={100}
            maximumTrackTintColor="#C1C1C1"
            thumbTintColor="#F85C01"
            style={styles.slider}
          />
          
        </View>

        <View style={{flexDirection:"row"}}>
            <Label style={styles.labelNutri}>
            PROTEIN:
            </Label>
            <Text style={{fontSize:20}}> {this.state.protein} g</Text>
        </View>

       

        <View style={styles.viewSlider}>
          <Slider
            value={this.state.protein}
            onValueChange={value => this.setState({ protein: value })}
            step={1}
            minimumValue={0}
            maximumValue={100}
            maximumTrackTintColor="#C1C1C1"
            thumbTintColor="#F85C01"
            style={styles.slider}

          />
         
        </View>


        <View style={{flexDirection:"row",}}>
            <Label style={styles.labelNutri}>
            FAT:
            </Label>
            <Text style={{fontSize:20}}> {this.state.fat} g</Text>
        </View>

        <View style={styles.viewSlider}>
          <Slider
            value={this.state.fat}
            onValueChange={value => this.setState({ fat: value })}
            step={1}
            minimumValue={0}
            maximumValue={100}
            maximumTrackTintColor="#C1C1C1"
            thumbTintColor="#F85C01"
            style={styles.slider}
          />
        </View>

      {/* BUTTON FOR EDIT FORM */}  
        {this.props.mealEdit ? (
          <View style={styles.viewbtnEdit}>
            <Button
              block
              style={styles.btnEdit}
              onPress={() => { this.handleOnSubmit(); this.props.deleteMealEdit(); this.props.navigation.goBack() }}
            >
              <Text>SUBMIT</Text>
            </Button>
            <Button
              block
              style={styles.btnEdit}
              onPress={() => {
                this.props.navigation.goBack(), this.props.deleteMealEdit();
              }}>
              <Text>CLOSE</Text>
            </Button>
          </View>
        ) : (
            <Button
              block
              style={styles.btnSubmit}
              onPress={this.handleOnSubmit}>
              <Text>SUBMIT</Text>
            </Button>
          )}
      </Content>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: meal => {
      dispatch(actions.actSubmitMeal(meal));
    },
    deleteMealEdit: () => {
      dispatch(actions.actEditMeal(null));
    },
    updateDailyRecord: meal => {
      dispatch(actions.updateDailyRecord())
    }
  };
};

const mapStateToProps = state => {
  return {
    mealEdit: state.mealReducer.mealEdit
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Meal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageUpload:{ width: 370, height: 250, marginTop: 40 },
  viewIcon:{marginLeft: 330, marginTop: 20},
  titleEdit:{
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ffbf00',
    margin: 20,
    marginTop: 20,
  },
  datepicker:{width: 300, marginTop: 10},
  viewbtnUpload:{ flexDirection: "row", margin: 20, alignItems: "center" },
  btnUpload:{ borderColor: "grey", borderWidth: 1, borderRadius: 5, height: 35, width: 100, alignItems: "center", justifyContent: "center", marginLeft: 20},
  labelNutri:{ color: '#fa8100', fontWeight: "bold", fontSize: 20, marginLeft:30},
  viewSlider:{ flex: 1, alignItems: 'stretch', justifyContent: 'center' },
  slider:{ margin: 10 },
  viewbtnEdit: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnEdit: {
    margin: 15,
    marginTop: 50,
  },
  btnSubmit: {
    margin: 15,
    marginTop: 50,
  },
});


