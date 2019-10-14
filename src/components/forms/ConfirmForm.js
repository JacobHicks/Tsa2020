import {StyleSheet, View} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import {Button, Input, Item, Text} from 'native-base';
import React from 'react';

class ConfirmForm extends React.Component {
    render() {
        return (
            <View>
                <Field name='confirmationCode' component={this.renderConfirmationCodeInput}/>
                <Button style={Styles.continueButton} onPress={this.props.handleSubmit}>
                    <Text style={Styles.continueText}>
                        Start Partying
                    </Text>
                </Button>
            </View>
        );
    }

    renderConfirmationCodeInput({input, label, type, meta: {touched, error, warning}}) {
        let hasError = error !== undefined;

        return (
            <Item error={hasError}>
                <Input placeholder='Verification code' style={Styles.placeholder} placeholderTextColor='#FFF'
                       keyboardType='number-pad' {...input}/>
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
        height: '30%',
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
    form: 'confirm'
})(ConfirmForm);
