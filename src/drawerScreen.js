import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class ProfileHome extends Component {
    componentDidMount() {
        BackHandler.addEventLIstener('hardwareBackPress', this.backpressed)
    }
    render() {
        return (
            <View style={Styles.container}>
                <Text>Profile Screen</Text>
                <Icon name="user-circle" size={48} />
            </View>
        );
    }
}

export default ProfileHome;