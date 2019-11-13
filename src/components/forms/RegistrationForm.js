import React from "react";
import { Input, Item, Button, Text } from "native-base";
import { Field, reduxForm } from "redux-form";
import { Dimensions, Picker, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const validate = values => {
	const error = {};
	error.phoneNumber = "";
	let phoneNumber = values.phoneNumber;

	if (phoneNumber !== undefined) {
		phoneNumber = phoneNumber.replace(/[()\\s-]+/g, "");
		if (!/^\d{10}$/.test(phoneNumber)) {
			error.phoneNumber = "Invalid phone number";
		}
	}
	if (values.name.length === 0) {
		error.name = "Enter your full name"
	}
	if (values.institution.length === 0) {
		error.institution = "Enter the name of your school"
	}
	return error;
};

class RegistrationForm extends React.Component {

	constructor(props) {
		super(props);

		this.renderAutocompleteInput = this.renderAutocompleteInput.bind(this);
	}

	render() {
		return (
			<View>
				<Field name='name' component={ this.renderNameInput } />
				<Field name='phoneNumber' component={ this.renderPhoneNumberInput } />
				<Field name='institution'
				       component={ props => this.renderAutocompleteInput(props, this.props.navigation.getParam("institution", "Select your school")) } />
				<Button style={ Styles.continueButton } onPress={ this.props.handleSubmit }>
					<Text style={ Styles.continueText }>
						Continue
					</Text>
				</Button>
			</View>
		);
	}

	renderNameInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item error={ hasError }>
				<Input placeholder='Full name' selectionColor={ "#DE3C4B" } style={ Styles.placeholder }
				       placeholderTextColor='#FFF' { ...input } />
			</Item>
		);
	}

	renderPhoneNumberInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item error={ hasError }>
				<Input placeholder='Phone number' selectionColor={ "#DE3C4B" } style={ Styles.placeholder } placeholderTextColor='#FFF'
				       keyboardType='number-pad' { ...input } />
			</Item>
		);
	}

	renderAutocompleteInput({ input, label, type, meta: { touched, error, warning } }, institution) {
		let hasError = error !== undefined;

		input.onChange(institution);
		return (
			<Item error={ hasError }>
				<TouchableWithoutFeedback style={ { flexDirection: "row" } }
				                          onPress={ () => this.props.navigation.navigate("InstitutionList") }>
					<Text style={ Styles.institutionPlaceholder }>{ input.value }</Text>
				</TouchableWithoutFeedback>
			</Item>
		);
	}
}

const Styles = StyleSheet.create({
	placeholder: {
		marginTop: "5%",
		color: "#FFF",
		fontSize: 22,
		fontWeight: "700"   //React Native wants this in quotes
	},

	institutionPlaceholder: {
		marginTop: "10%",
		marginBottom: 8,
		marginLeft: 4,
		color: "#FFF",
		fontSize: 22,
		fontWeight: "700"   //React Native wants this in quotes
	},

	continueButton: {
		marginTop: "20%",
		marginLeft: "5%",
		width: "85%",
		height: Dimensions.get("window").height * .08,
		justifyContent: "center",
		backgroundColor: "#DE3C4B",
		borderRadius: 33
	},

	continueText: {
		marginTop: 4,
		color: "#FFF",
		fontSize: 22,
		fontWeight: "700",   //React Native wants this in quotes
		textAlign: "center",
		width: "100%"
	}

});

export default reduxForm({
	form: "registration",
	validate
})(RegistrationForm);
