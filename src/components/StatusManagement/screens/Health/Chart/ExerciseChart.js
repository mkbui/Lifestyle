import React, {Component} from 'react';
import {StyleSheet, Text, View, processColor} from 'react-native';
import {Content} from 'native-base';


import {PieChart} from 'react-native-charts-wrapper';
import {connect} from 'react-redux';


class ExerciseChart extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: '',
      modalVisible: false,
      legend: {
        enabled: false,
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
      totalTime: 0,
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
      this.props.exerciseList !== prevProps.exerciseList
    ) {
      this.loadData();
    }
  }

  loadData = () => {
    const {exerciseList} = this.props;
    const {selectedMonth} = this.state;

    let index = {};

    let valueChart = [];

    exerciseList.map(exercise => {
      if (
        selectedMonth ===
        exercise.date
          .split('-')
          .reverse()
          .join('-')
          .split('-', 2)
          .join('-')
      ) {
        if (!index[exercise.checkedIndex]) {
          index[exercise.checkedIndex] = {
            value: Number(exercise.duration),
            label: exercise.category.substr(6, 30),
            image: exercise.category,
          };
        } else {
          index[exercise.checkedIndex].value =
            index[exercise.checkedIndex].value + Number(exercise.duration);
        }
      }
    });
    var totalTime = 0;

    Object.keys(index).forEach(key => {
      valueChart.push({
        value: index[key].value,
        label: index[key].label,
        image: index[key].image,
      });
      totalTime = totalTime + index[key].value;
    });

    this.setState({
      data: {
        dataSets: [
          {
            values: valueChart,
            label: '',
            config: {
              colors: [
                processColor('#FFD000'),
                processColor('#FE5972'),
                processColor('#87DFB0'),
                processColor('#45C1EA'),
                processColor('#EE7720'),
                processColor('#CD5CAC'),
                processColor('#35ADB5'),
                processColor('#FE3334'),
                processColor('#FFA601'),
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

      valueChart,
      totalTime,
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
    console.log("valueChart", this.state.valueChart)
    return (
      <Content padder>
        <View>
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>
              EXERCISE
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
            text: 'Exercise!',
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
         
        </View>
        <View
          style={styles.viewTotal}>
          <Text style={styles.textTitleTotal}>
            Total time:
          </Text>
          <Text style={styles.valueTotal}>
            {this.state.totalTime} min
          </Text>
        </View>


        {/* Show total amount of time  of each category */}
        {this.state.valueChart.map(item => {
          return (
            <View
              style={styles.itemRow}>
              <Text style={styles.label}>{item.image}</Text>
              <Text
                style={styles.value}>
                {item.value} min
              </Text>
            </View>
          );
        })}
        
      </Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    exerciseList: state.exerciseReducer.exerciseList,
  };
};
export default connect(mapStateToProps, null)(ExerciseChart);

const styles = StyleSheet.create({
  chart: {
    height: 300,
    width: 300,
  },
  viewTitle:{alignItems: 'center', margin: 20},
  textTitle:{fontSize: 20, color: 'red', fontWeight: 'bold'},
  viewTotal:{flexDirection: 'row', margin: 20, justifyContent: 'center'},
  textTitleTotal:{fontSize: 20, fontWeight: 'bold', color: 'grey'},
  valueTotal:{fontSize: 20, marginLeft: 10},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'grey',
    borderWidth: 0.5,
    height: 50,
    alignItems: 'center',
  },
  value:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 40,
  },
  label:{fontSize: 17, marginLeft: 30}
});
