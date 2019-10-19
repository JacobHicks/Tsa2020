import { Dimensions, ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import background from '../../assets/images/party2.jpg';
import {Text} from "native-base";
import {Provider} from 'react-redux';
import RegistrationForm from '../components/forms/RegistrationForm';
import React from 'react';

import auth from '@react-native-firebase/auth';
import ConfirmForm from '../components/forms/ConfirmForm';
import {createStore} from 'redux';
import allReducers from '../reducers';

const store = createStore(allReducers);
export default class TextConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.userLoggedIn = this.userLoggedIn.bind(this);
        this.verify = this.verify.bind(this);
        auth().onAuthStateChanged(this.userLoggedIn);
    }

    componentDidMount() {
        const {navigation} = this.props;

        const {ConfirmationResult} = auth().signInWithPhoneNumber(navigation.getParam('phoneNumber'));
        this.setState({ConfirmationResult});
    }

    render() {
        const {navigation} = this.props;
        return (
            <ImageBackground source={background} style={Styles.background}>
                <StatusBar barStyle="light-content" />
                <Text style={Styles.welcomeText}>
                    {'Hey ' + navigation.getParam('name', 'User') + '.\nText code OTW.'}
                </Text>
                <View style={Styles.formBounding}>
                    <Provider store={store}>
                        <ConfirmForm onSubmit={this.verify}/>
                    </Provider>
                </View>
            </ImageBackground>
        );
    }

    verify(values) {
        try {
            this.state.ConfirmationResult.confirm(values.confirmationCode);
        } catch (exception) { //Throws error when confirmation code is invalid
            console.error(exception);
            //TODO: Handle invalid confirmation code
        }
    }

    userLoggedIn(user) {
        const {navigation} = this.props;
        if(user) {
            navigation.navigate('Home', {user: user});
        }
    }
}

const Styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    welcomeText: {
        marginTop: '22%',
        marginLeft: '11%',
        marginRight: '11%',

        color: '#FFF',

        fontFamily: 'Glacial Indifference',
        fontSize: 36.67,
        lineHeight: 43,
        fontWeight: '700',   //React Native wants this in quotes
    },

    formBounding: {
        marginLeft: '10%',
        marginTop: '30%',
        width: '80%',
    },

});
