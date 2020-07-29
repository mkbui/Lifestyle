import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import {connect} from 'react-redux';
class WaterChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    selectedMonth: '',
    modalVisible: false,
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {},
      highlights: [],
      xAxis: {},
      valueChart: [],
      totalTime:0,
      
    };
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps, prevState) {
     //Select month
    if(this.state.selectedMonth !== prevProps.selectedMonth){
      this.setState({
        selectedMonth:this.props.selectedMonth,
        modalVisible:this.props.modalVisible
      })
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
    const {waterList} = this.props;
    const {selectedMonth} = this.state;
 
    let index = {};
    let valueChart = [];

    waterList
    .filter(water => selectedMonth === water.date.split('-') .reverse() .join('-').split('-', 2).join('-'))
    .map(
        water => {
            index[water.date] = {
                y: Number(water.waterConsumed),
                x: Number(water.date.split("-",1)) - 1       
              };
   });

   Object.keys(index).forEach(key => {
     valueChart.push({
       y: index[key].y,
       x: index[key].x,
     });
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
              valueTextSize: 10,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5,
            },
          },
        ],
      },
      xAxis: {
        valueFormatter: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'],
        granularityEnabled: true,
        granularity : 1,
        drawGridLines: false,
        position: 'BOTTOM',
      
      },
     
      valueChart,
    
    });
  };

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }

  render() {
      
    return (
     
        <View >
            <View style={{alignItems:"center"}}>
            <Text style={{fontWeight:"bold", fontSize:20, color:"#FE7B23", marginTop:20}}>Total water intake in day</Text>
            </View>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            gridBackgroundColor={processColor('white')}
            visibleRange={{x: { min: 15, max:  31}}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
            yAxis={{ 
              left: { drawGridLines: false},
              right: { drawGridLines: false},
              
            }}
          />
        </View>
     
    );
  }
}
const mapStateToProps = state => {
    return {
      waterList: state.mealReducer.waterList,
    
    };
  };
export default connect(mapStateToProps, null)(WaterChart);
  
  const styles = StyleSheet.create({
   
    chart: {
      height:250
    },
  });
  



