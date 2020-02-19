import React from "react";
import {StyleSheet, ImageBackground, View, Dimensions, StatusBar, Image} from "react-native";
import {Input, Item, Form, Button, Text} from "native-base";

import logo from "../../assets/images/logo.png";
import RegistrationForm from "../components/forms/RegistrationForm";
import {Provider} from "react-redux";
import {createStore} from "redux";
import allReducers from "../reducers";
import auth from '@react-native-firebase/auth';

const store = createStore(allReducers);
export default class InitialSignup extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.unsubscribeAuthListener = auth().onAuthStateChanged(this.handleLogIn)
    }

    render() {
        return (
            <View style={{backgroundColor: '#425c5a', height: '100%'}}>
                <StatusBar barStyle="light-content"/>
                <View style={{alignItems: 'center', marginTop: 48}}>
                    <Image source={logo}/>
                    <Text style={Styles.logoText}>
                        TSA 2020
                    </Text>
                </View>
                <View style={Styles.formBounding}>
                    <Provider store={store}>
                        <RegistrationForm onSubmit={this.handleRegistration} navigation={this.props.navigation}/>
                    </Provider>
                </View>
            </View>
        );
    }

    async handleRegistration(values) {
        const {navigation} = this.props;

        if (values.confirmPassword !== undefined) {
            try {
                await auth().createUserWithEmailAndPassword(values.email, values.password);
            } catch (e) {
                console.error(e.message) //TODO handle this error properly
            }
        } else {
            try {
                await auth().signInWithEmailAndPassword(values.email, values.password);
            } catch (e) {
                console.error(e.message) //TODO handle this error properly
            }
        }
        // navigation.navigate("TextConfirm", {
        //     name: values.name,
        //     phoneNumber: values.phoneNumber,
        //     institution: values.institution
        // });
    }

    handleLogIn(user) {
        const {navigation} = this.props;
        if (user) {
            navigation.navigate('Home', {user: user, name: 'JACOB', institution: 'Khan Academy'}).then(this.unsubscribeAuthListener)
        }
    }
}

const Styles = StyleSheet.create({
    background: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },

    logoText: {
        color: "#cb9e78",
        marginTop: -4,
        fontSize: 28,
        lineHeight: 43,
        fontWeight: "600"   //React Native wants this in quotes
    },

    formBounding: {
        marginLeft: 32,
        marginTop: 48,
        width: "80%"
    }

});
