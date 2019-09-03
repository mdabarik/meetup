import React from "react";
import { View, Text, Button, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Data from './src/user.json';
import Avatar from './src/avatars.js';
import SplashScreen from 'react-native-splash-screen';

class HomeScreen extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  getData = (keyword) => {
    if (/.*[\+|-].*/.test(keyword.toLowerCase())) {
      return Data.filter((user) => {
      if (keyword.toLowerCase() === user.bloodGroup.toLowerCase()) {
        return true;
        }
      })
    } else {
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
      return <Text style={{ marginLeft: 17, fontSize: 15, color: 'grey' }}>No user was found!</Text>
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
          onBack={() => navigation.setParams({ 'show':false, val: '' }) }
          onSubmitEditing={() => navigation.setParams({ val: this.searchBar.getValue() })}
        /> 
        ) : <Text style={{marginLeft: 13, color: '#fff', fontSize: 20}}>Home</Text>,

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
              stdId: user.item.studentId
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
    const keyword = navigation.getParam('val', 'No-content was found!');

    const totalResult = this.getData(this.props.navigation.getParam('val', '').trim()).length;    

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
        <Text style={{ fontSize: 15, color: 'grey', marginLeft: 10, marginTop: 5 }}>{totalResult==66?'Total Records':''}: {totalResult<66?'Found Record':''}{totalResult<66 && totalResult!=1 && totalResult!=0?"s:":":"} {totalResult}{totalResult<66?'. For "' + keyword + '"': ''}</Text>
        {this.renderUser( this.getData(this.props.navigation.getParam('val', '').trim()))}
      </ScrollView>
    );

  }

}

class DetailsScreen extends React.Component {

    renderMe = (stdid) => {
      return Data.map(user => {
        if(stdid === user.studentId) {
          return (
              <View key={user.studentId} style={{ flex: 1, padding: 10 }}> 
                <View style={{ width: '100%', height: 250, alignItems: 'center', borderRadius: 3 }}>
                  <Image style={{ width: '100%', height: 250, borderRadius: 2, borderWidth: 1, borderColor: 'grey' }} source={Avatar(user.avatar)} />
                </View>
                <View style={{ alignItems: 'center', width: '100%' }}>
                  <Text style={{ fontSize: 30,  margin: 10, fontWeight: 'bold', alignItems: 'center'}}>{user.fullName}</Text>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', marginTop: 3 }}>Student ID: {user.studentId.toUpperCase()}</Text>
                </View>
                <View style={{ color: 'blue' }}>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', marginTop: 3 }}>Email: {user.email}</Text>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', marginTop: 3 }}>Mobile: {user.phone}</Text>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', marginTop: 3 }}>Blood Group: {user.bloodGroup.toUpperCase()}</Text>
                  <Text style={{ width: '100%', fontSize: 20, backgroundColor: 'orangered', fontWeight: 'bold', padding: 10, alignItems: 'center', color: '#fff', marginTop: 3 }}>District: {user.district}</Text>
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

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);
