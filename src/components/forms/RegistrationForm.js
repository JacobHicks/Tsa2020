import React from 'react';
import {Input, Item, Button, Text} from 'native-base';
import {Field, Form, reduxForm} from 'redux-form';
import {StyleSheet, View} from 'react-native';

const validate = values => {
    const error = {};
    error.phoneNumber = '';
    let phoneNumber = values.phoneNumber;

    if (phoneNumber !== undefined) {
        phoneNumber = phoneNumber.replace(/[()\\s-]+/g, '');
        if (!/^\d{10}$/.test(phoneNumber)) {
            error.phoneNumber = 'Invalid phone number';
        }
    }
};

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };
    }

    componentDidMount() {
        this.setState({
            isReady: true,
        });
    }

    render() {
        if (!this.state.isReady) {
            //TODO: make this return a proper loading animation
        }
        return (
            <View>
                <Field name='email' component={this.renderEmailInput}/>
                <Field name='phoneNumber' component={this.renderPhoneNumberInput}/>
                <Button style={Styles.continueButton} onPress={values => this.props.handleSubmit(values)}>
                    <Text style={Styles.continueText}>
                        Continue
                    </Text>
                </Button>
            </View>
        );
    }

    renderEmailInput({meta: {touched, error, warning}}) {
        let hasError = error !== undefined;

        return (
            <Item error={hasError}>
                <Input placeholder='First and last name' style={Styles.placeholder}
                       placeholderTextColor='#FFF'/>
            </Item>
        );
    }

    renderPhoneNumberInput({meta: {touched, error, warning}}) {
        let hasError = error !== undefined;

        return (
            <Item error={hasError}>
                <Input placeholder='Phone number' style={Styles.placeholder} placeholderTextColor='#FFF'
                       keyboardType='number-pad'/>
            </Item>
        );
    }
}

const Styles = StyleSheet.create({
    placeholder: {
        marginTop: '10%',
        color: '#FFF',

        fontFamily: 'Glacial Indifference',
        fontSize: 22,
        lineHeight: 8,
        fontWeight: '700',   //React Native wants this in quotes
    },

    continueButton: {
        marginTop: '20%',
        marginLeft: '5%',
        width: '85%',
        height: '22%',
        justifyContent: 'center',
        alignItems: 'center',


        backgroundColor: '#FFF',
        borderRadius: 33,
    },

    continueText: {
        color: '#000',

        fontFamily: 'Glacial Indifference',
        fontSize: 22,
        fontWeight: '700',   //React Native wants this in quotes
    },

});

export default reduxForm({
    form: 'registration',
    validate,
})(RegistrationForm);
