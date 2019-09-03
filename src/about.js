import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';

class ProfileHome extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

    static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
                      <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', color: '#fff'}}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                          <Icon name="bars" size={22} color="white" />
                        </TouchableOpacity>  
                        <Text style={{color: '#fff' ,marginLeft: 10, fontSize: 20}}>About</Text>
                      </View>
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

    render() {
        return (
            <ScrollView>
            <View style={Styles.container}>
                <Image source={require('./images/barik.jpg')} style={{ width: 250, height: 250, borderRadius: 250, borderWidth: 1, borderColor: 'grey', marginTop: 10}} />
                <Text style={{ fontSize: 25, marginBottom: 10, fontWeight: 'bold' }}>About App & Developer</Text>
                <Text style={{fontSize: 20, color: 'grey', margin: 10, marginBottom: 20 }}>
                    This software is created by Dream Lover Guy <Text style={{ color: '#f4511e', fontWeight: 'bold' }}>Md. A. Barik</Text>.
                    He has been programming since he was 16. He loves programming, teaching, helping other programmers to end up getting stack & reciting and listenting to the Holy Quran. His dream to be a top class Software Engineer! His ultimate goal to got an intership at Google.
                    <Text> He said: "This software will help people to find their needs!"</Text>
                </Text>
            </View>
            </ScrollView>
        );
    }
}


const Styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerButton: {
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
}

const StackNav = createStackNavigator({
    ProfileHome
})

export default createAppContainer(StackNav);