import React from 'react';
import { Text, View,TouchableOpacity, BackHandler } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './src/index';  //Tab Nav
import About from './src/about'; //About

class Exit extends React.Component {

  componentDidMount() {
    BackHandler.exitApp();
  }

  render() {
    return (
      <Text></Text>
    )
  }
}
// class About extends React.Component {
//    static navigationOptions = ({ navigation }) => ({
//     title: "Home",
//     headerLeft: (
//         <TouchableOpacity
//             onPress={() => navigation.openDrawer()}>
//             <Icon name="bars" size={20} />
//         </TouchableOpacity>
//     	),
// 	})

// 	render() {
// 		return(
// 			<Text>Hello There!</Text>
// 		)
// 	}
// }

const MainNavigation = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => <Icon name="home" size={17} />
    }
  },
  About: {
    screen: About,
    navigationOptions: {
      drawerLabel: 'About',
      drawerIcon: ({ tintColor }) => <Icon name="user" size={17} />
    }
  },
    Exit: {
    screen: Exit,
    navigationOptions: {
      drawerLabel: 'Exit',
      drawerIcon: ({ tintColor }) => <Icon name="power-off" size={17} />
    }
  }
});

export default createAppContainer(MainNavigation);
