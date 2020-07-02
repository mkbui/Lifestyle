import React, {Component} from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';

import {Content} from 'native-base';
import {PieChart} from 'react-native-charts-wrapper';

import {connect} from 'react-redux';
import moment from 'moment';


class MealChart extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMonth: moment().format('YYYY-MM'),
      modalVisible: false,
      totalCarb: 0,
      totalProtein: 0,
      totalFat: 0,
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',
        horizontalAlignment: 'RIGHT',
        verticalAlignment: 'CENTER',
        orientation: 'VERTICAL',
        wordWrapEnabled: true,
      },

      data: {},

      highlights: [{x: 2}],
      description: {
        text: '',
        textSize: 15,
        textColor: processColor('darkgray'),
      },
      animation: {
        durationX: 1000,
        durationY: 1000,
        random: Math.random(),
      },
      valueChart: [],
    };
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps, prevState) {
     //Select month
    if (this.state.selectedMonth !== prevProps.selectedMonth) {
      this.setState({
        selectedMonth: this.props.selectedMonth,
        modalVisible: this.props.modalVisible,
      });
    }
    //props change
    if (
      this.state.selectedMonth !== prevState.selectedMonth ||
      this.props.mealList !== prevProps.mealList
    ) {
      this.loadData();
    }
  }
  
  loadData = () => {
    const {mealList} = this.props;
    const {selectedMonth} = this.state;

    var totalCarb = 0;
    var totalProtein = 0;
    var totalFat = 0;
    {
      mealList
        .filter(
          meal =>
            selectedMonth ===
            meal.date
              .split('-')
              .reverse()
              .join('-')
              .split('-', 2)
              .join('-'),
        )
        .map(meal => {
          totalCarb = totalCarb + meal.carb;
          totalProtein = totalProtein + meal.protein;
          totalFat = totalFat + meal.fat;
        });
    }
    this.setState({
      totalCarb,
      totalProtein,
      totalFat,
      data: {
        dataSets: [
          {
            values: [
              {value: totalCarb, label: 'Carb'},
              {value: totalProtein, label: 'Protein'},
              {value: totalFat, label: 'Fat'},
            ],
            label: '',
            config: {
              colors: [
                processColor('#FFD000'),
                processColor('#FE5972'),
                processColor('#87DFB0'),
                processColor('#45C1EA'),
                processColor('#EE7720'),
              ],
              valueTextSize: 20,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
    });
  };

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

  }
  
  render() {
    return (
      <Content>
        <View style={styles.viewTitle}>
          <Text style={styles.textTitle}>
            MEAL
          </Text>
        </View>
        <PieChart
          style={styles.chart}
          logEnabled={true}
          chartBackgroundColor={processColor('white')}
          chartDescription={this.state.description}
          data={this.state.data}
          legend={this.state.legend}
          highlights={this.state.highlights}
          entryLabelColor={processColor('green')}
          entryLabelTextSize={15}
          drawEntryLabels={true}
          rotationEnabled={true}
          usePercentValues={true}
          styledCenterText={{
            text: 'Pie center text!',
            color: processColor('pink'),
            size: 20,
          }}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          onSelect={this.handleSelect.bind(this)}
          onChange={event => console.log(event.nativeEvent)}
          animation={this.state.animation}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    mealList: state.mealReducer.mealList,
  };
};
export default connect(mapStateToProps, null)(MealChart);

const styles = StyleSheet.create({
  chart: {
    height: 300,
    width: 300,
  },
  viewTitle:{alignItems: 'center', margin: 20},
  textTitle:{fontSize: 20, color: 'red', fontWeight: 'bold'},
  
});

// Show total carb, pro, fat ,calo in month => neccessary ??
{
/* <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Total Calo:</Text>
        <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalCarb +totalProtein + totalFat}</Text>
    </View>
    <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Carb:</Text>
        <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalCarb}</Text>
    </View>
    <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Protein:</Text>
        <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalProtein}</Text>
    </View>
    <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={{fontWeight:"bold", fontSize:20, color:"darkgrey"}}>Fat:</Text>
        <Text style={{fontSize:20, marginLeft:10, color:"pink"}}>{totalFat}</Text>
    </View> */
}
