import React from "react";
import { View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList, BackHandler, TouchableWithoutFeedback, Clipboard, Alert, TouchableHighlight, Linking } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Data from './user.json';
import Avatar from './avatars.js';
import SplashScreen from 'react-native-splash-screen';
import NotificationPopup from 'react-native-push-notification-popup';

class HomeScreen extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {text: 'No', onPress: () => ""},
        {text: 'Yes', onPress: () => BackHandler.exitApp()}
      ],
      {
        cancelable: true
      }
      )
    return true;
  }

  getData = (keyword) => {
    if (/.*[\+|-].*/.test(keyword.toLowerCase())) {
      return Data.filter((user) => {
      if (keyword.toLowerCase() === user.bloodGroup.toLowerCase()) {
          return true;
        }
      })
    } else if(/.*(17sta|16sta).*/.test(keyword.toLowerCase())) {
      return Data.filter((user) => {
      if (keyword.toLowerCase() === user.studentId.toLowerCase()) {
        return true;
        }
      })
    }
    else {
      let regex = new RegExp( ".*" + keyword.toLowerCase() + ".*" );
      return Data.filter((user) => {
        if (regex.test(user.fullName.toLowerCase())) {
          return true;
        }
      });
    }
    
  }

  userHandler = (allUser) => {
    return allUser.map((user) => {
      return (
          <View
            key={user.studentId}>
            <Text>{user.studentId}</Text>
            <Text>{user.fullName}</Text>
            <Image style={{ width: '100%', height: 200 }} source={Avatar(user.avatar)} />
          </View>
      )
    })
  }

  renderUser = (users) => {
    if (users.length == 0) {
      return <Text style={{ marginLeft: 15, fontSize: 15, color: 'grey' }}>No user was found!</Text>
    }
    return users.map(user => {
      return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Details', {
              stdId: user.studentId
            })}
          >
            <View key={user.studentId} style={{ flex: 1, alignItems: 'center', margin: 8, padding: 10, borderColor: 'grey', borderWidth: 1, borderRadius: 10 }}> 
              <View style={{ width: '100%', height: 120, alignItems: 'center' }}>
                <Image style={{ width: 120, height: 120, borderRadius: 100, borderWidth: 1, borderColor: 'grey' }} source={Avatar(user.avatar)} />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 25 }}>{user.studentId.toUpperCase()}</Text>
                <Text style={{ fontSize: 20, color: 'blue' }}>{user.fullName}</Text>
              </View>
            </View>
          </TouchableOpacity>
      )
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('show') ? (
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          showOnLoad
          hideX={true}
          placeholder="Enter keyword"
          onBack={() => navigation.setParams({ 'show':false, val: '' }) }
          onSubmitEditing={() => navigation.setParams({ val: this.searchBar.getValue() })}
        /> 
        ) : 
        (
          <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', color: '#fff'}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon name="bars" size={22} color="white" />
            </TouchableOpacity>  
            <Text style={{color: '#fff' ,marginLeft: 10, fontSize: 20}}>Home</Text>
          </View>
        ),

      headerRight: (
        <TouchableOpacity 
          style={{marginRight: 15}}
          onPress={() => {
            navigation.navigate('Home', {
              show: true
            })
          }}
        >
          <Icon style={{zIndex: -2}} name='search' size={20} color="#fff" />
        </TouchableOpacity>        

      ),
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  };

  // For FlatList
  renderItem = (user) => {

      return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Details', {
              stdId: user.item.studentId,
              key: this.props.getParam('val', false)
            })}
          >
            <View key={user.item.studentId} style={{ flex: 1, alignItems: 'center', margin: 8, padding: 10, borderColor: 'grey', borderWidth: 1, borderRadius: 10 }}> 
              <View style={{ width: '100%', height: 120, alignItems: 'center' }}>
                <Image style={{ width: 120, height: 120, borderRadius: 100, borderWidth: 1, borderColor: 'grey' }} source={Avatar(user.item.avatar)} />
              </View>
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 25 }}>{user.item.studentId.toUpperCase()}</Text>
                <Text style={{ fontSize: 20, color: 'blue' }}>{user.item.fullName}</Text>
              </View>
            </View>
          </TouchableOpacity>
      )
  }

  showEmptyComponent = () => {
    return (
      <View>
        <Text style={{ fontSize: 20, marginLeft: 15, marginTop: 10 }}>No user was found!</Text>
      </View>
    )
  }

  render() {
    const { navigation } = this.props;
    const keyword = navigation.getParam('val', '');
    const totalResult = this.getData(this.props.navigation.getParam('val', '').trim()).length;

    if(totalResult < 66) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate('Home');
      })
    }

     // return (
     // <View>
     //    <ScrollView>
     //      {this.state.show?<Text>{totalResult}</Text>:<Text>No content</Text>}
     //    </ScrollView>
     //    <FlatList
     //      scrollEnabled={true}
     //      data={this.getData(this.props.navigation.getParam('val', '').trim())}
     //      renderItem={this.renderItem}
     //      ListEmptyComponent={this.showEmptyComponent()}
     //      keyExtractor={(item, index) => item.avatar}
     //    />
     //  </View>
     // )

    return (
      <ScrollView>
        <Text style={{ fontSize: 15, color: 'grey', marginLeft: 10, marginTop: 5 }}>{totalResult==66?'Total Records':''} {totalResult<66?'Found Record':''}{totalResult<66 && totalResult!=1 && totalResult!=0?"s:":":"} {totalResult}{totalResult<66?'. For "' + keyword + '"': ''}</Text>
        {this.renderUser( this.getData(this.props.navigation.getParam('val', '').trim()))}
      </ScrollView>
    );

  }

}

class DetailsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
      this.props.navigation.goBack(null);
      return true;
    }

      // calling prompt
    makeCall = (number) => {
       const args = {
           number: number, // String value with the number to call
           prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
       }
    }

    callingMan = (number) => {
      Alert.alert(
        'Make a phone call',
        'Do you want to call?',
        [
          {text: 'Just copy', onPress: () => {Clipboard.setString(number); this.copyPopup()}},
          {text: 'Yes', onPress: () => Linking.openURL(`tel:${number}`)}
        ],
        {
          cancelable: true
        }
        )
      return true;
    }

     emailMan = (email) => {
      Alert.alert(
        'Send an email',
        'Do you want to send an email?',
        [
          {text: 'Just copy', onPress: () => {Clipboard.setString(email); this.copyPopup()}},
          {text: 'Yes', onPress: () => /.*(@|gmail|com).*/.test(email)?Linking.openURL(`mailto:${email}`):alert("Invalid Email")}
        ],
        {
          cancelable: true
        }
        )
      return true;
    }

    copyPopup = () => {
      this.popup.show({
        title: <Text style={{ fontSize: 18 }}>Copied to clipboard</Text>,
        slideOutTime: 400
      });
    }

    renderMe = (stdid) => {
      return Data.map(user => {
        if(stdid === user.studentId) {
          return (
              <View key={user.studentId} style={{ flex: 1, padding: 10 }}> 
              <View style={{ position: 'absolute', top: 0, left: 0, marginTop: 60 }}>
                <NotificationPopup ref={ref => this.popup = ref} />
              </View>
                <View style={{ width: '100%', height: 250, alignItems: 'center', borderRadius: 3 }}>
                  <Image style={{ width: '100%', height: 250, borderRadius: 2, borderWidth: 1, borderColor: 'grey' }} source={Avatar(user.avatar)} />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => {Clipboard.setString(user.fullName); this.copyPopup()}}>
                    <Text style={{ fontSize: 30,  margin: 10, fontWeight: 'bold', alignItems: 'center'}}>{user.fullName}</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ color: 'blue' }}>
                <TouchableHighlight onPress={() => { Clipboard.setString(user.studentId.toUpperCase()); this.copyPopup() }}>                
                    <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff' }}>Student ID: {user.studentId.toUpperCase()}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.emailMan(user.email.toLowerCase())}>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white' }}>Email: {user.email.toLowerCase()}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.callingMan(user.phone.split("/")[0]) }>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white' }}>Mobile: {user.phone}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {Clipboard.setString(user.bloodGroup.toUpperCase()); this.copyPopup()}}>                
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white' }}>Blood Group: {user.bloodGroup.toUpperCase()}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {Clipboard.setString(user.district); this.copyPopup()}}>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'white' }}>District: {user.district}</Text>
                </TouchableHighlight>
                </View> 
              </View>
          )
        }
      })

    }

  static navigationOptions = {
    title: 'Back to Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };


  render() {
    const { navigation } = this.props;
    const stdID = navigation.getParam('stdId');

    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderMe(stdID)}
      </ScrollView>
    );
  }
}

const NavigationScreen = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: "CPU",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="microchip"
                    size={17}
                    color={tintColor} />
            )
        }
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: {
            tabBarLabel: "Memory",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="memory"
                    size={17}
                    color={tintColor} />
            )
        }
    }
});


//Issue: the tab navigator needs to be wrapped inside a stack navigator
const StackNavi = createStackNavigator({ NavigationScreen }, { headerMode: "none" });
export default createAppContainer(StackNavi);

// export default createAppContainer(AppNavigator);
