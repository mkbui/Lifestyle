import {Switch} from 'react-native'

const isDarkTheme = false;
function ToggleTheme() {
    
    toggleDarkTheme = () => {
       isDarkTheme = !isDarkTheme;
    }
    return (
      <View >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={{false: "#f5dd4b", true: "#f4f3f4"}}
          onChange={toggleDarkTheme}
        />
      </View>
    );
}



export {ToggleTheme, isDarkTheme};