import React from "react";
import {Input, Item, Button, Text} from "native-base";
import {Field, reduxForm} from "redux-form";
import {Dimensions, Picker, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const validate = values => {
    const error = {};

    if (values.email !== undefined && values.email.length === 0) {
        error.name = "Enter your email"
    }
    if (values.email !== undefined && !/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i.test(String(values.email).toLowerCase())) {
        error.email = "Invalid email"
    }
    if (values.password !== undefined && values.password.length < 4) {
        error.password = "Your password must be at least 4 characters long"
    }
    if (values.confirmPassword !== undefined) {
        if (values.confirmPassword !== values.password) {
            error.confirmPassword = "Passwords do not match"
        }
    }
    return error;
};

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userHasAccount: true
        }
    }

    render() {
        return (
            <View>
                <Field name='email' component={this.renderEmailInput}/>
                <Field name='password' component={this.renderPasswordInput}/>
                {this.state.userHasAccount ? null :
                    <Field name='confirmPassword' component={this.renderConfirmPasswordInput}/>}

                <View style={{alignItems: 'center', marginTop: 24}}>
                    {this.renderChangeAction()}
                </View>

                <Button style={Styles.continueButton} onPress={this.props.handleSubmit}>
                    <Text style={Styles.continueText}>
                        {this.state.userHasAccount ? "Log in" : "Register"}
                    </Text>
                </Button>
            </View>
        );
    }

    renderEmailInput({input, label, type, meta: {touched, error, warning}}) {
        let hasError = error !== undefined;

        return (
            <Item error={hasError} style={{borderColor: '#8ea7a6'}}>
                <View style={{flexDirection: "row"}}>
                    <Icon name='at' style={{
                        borderRightWidth: 1,
                        marginTop: 32,
                        paddingTop: 6,
                        paddingRight: 8,
                        marginRight: 8,
                        borderColor: '#8ea7a6'
                    }} color='#cb9e78' size={18}/>
                    <Input placeholder='E-MAIL' selectionColor={"#8ea7a6"} style={Styles.placeholder}
                           placeholderTextColor='#8ea7a6' {...input} />
                </View>
            </Item>
        );
    }

    renderPasswordInput({input, label, type, meta: {touched, error, warning}}) {
        let hasError = error !== undefined;

        return (
            <Item error={hasError} style={{borderColor: '#8ea7a6'}}>
                <View style={{flexDirection: "row"}}>
                    <Icon name='lock' style={{
                        borderRightWidth: 1,
                        marginTop: 32,
                        paddingTop: 6,
                        paddingRight: 8,
                        marginRight: 8,
                        borderColor: '#8ea7a6'
                    }} color='#cb9e78' size={18}/>
                    <Input placeholder='PASSWORD' selectionColor={"#8ea7a6"} style={Styles.placeholder}
                           placeholderTextColor='#8ea7a6' secureTextEntry={true} {...input} />
                </View>
            </Item>
        );
    }

    renderConfirmPasswordInput({input, label, type, meta: {touched, error, warning}}) {
        let hasError = error !== undefined;

        return (
            <Item error={hasError} style={{borderColor: '#8ea7a6'}}>
                <View style={{flexDirection: "row"}}>
                    <Icon name='key' style={{
                        borderRightWidth: 1,
                        marginTop: 32,
                        paddingTop: 6,
                        paddingRight: 8,
                        marginRight: 8,
                        borderColor: '#8ea7a6'
                    }} color='#cb9e78' size={18}/>
                    <Input placeholder='CONFIRM PASSWORD' selectionColor={"#8ea7a6"} style={Styles.placeholder}
                           placeholderTextColor='#8ea7a6' secureTextEntry={true} {...input} />
                </View>
            </Item>
        );
    }

    // renderPhoneNumberInput({ input, label, type, meta: { touched, error, warning } }) {
    // 	let hasError = error !== undefined;
    //
    // 	return (
    // 		<Item error={ hasError }>
    // 			<Input placeholder='Phone number' selectionColor={ "#DE3C4B" } style={ Styles.placeholder } placeholderTextColor='#FFF'
    // 			       keyboardType='number-pad' { ...input } />
    // 		</Item>
    // 	);
    // }

    renderChangeAction() {
        if (this.state.userHasAccount)
            return (
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, color: '#8ea7a6'}}>{"Not a member? "}</Text>
                    <TouchableOpacity style={{height: '100%'}} onPress={() => this.setState({userHasAccount: false})}>
                        <Text style={{fontSize: 16, color: '#cb9e78'}}>Join now</Text>
                    </TouchableOpacity>
                </View>
            );
        else
            return (
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, color: '#8ea7a6'}}>{"Already have a member? "}</Text>
                    <TouchableOpacity style={{height: '100%'}} onPress={() => this.setState({userHasAccount: true})}>
                        <Text style={{fontSize: 16, color: '#cb9e78'}}>Login now</Text>
                    </TouchableOpacity>
                </View>
            )
    }
}

const Styles = StyleSheet.create({
    placeholder: {
        marginTop: "5%",
        color: "#FFF",
        fontSize: 12,
    },

    continueButton: {
        marginTop: 32,
        width: "100%",
        height: 46,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cb9e78",
        borderRadius: 24
    },

    continueText: {
        color: "#425c5a",
        fontSize: 18,
        textAlign: "center",
        width: "100%"
    }

});

export default reduxForm({
    form: "registration",
    validate
})(RegistrationForm);
