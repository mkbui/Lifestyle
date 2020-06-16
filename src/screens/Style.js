import { StyleSheet } from 'react-native';

const lightStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    textContent: {
      fontSize: 20,
      color: 'red',
    },
})
  
const darkStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:  'black'
    },
    textContent: {
      fontSize: 20,
      color: 'white',
    },
})