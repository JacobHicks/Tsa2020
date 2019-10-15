import React from "react";
import { StyleSheet, ImageBackground, View, Dimensions } from "react-native";
import { Input, Item, Form, Button, Text } from "native-base";

import background from "../../assets/images/party1.jpg";
import RegistrationForm from "../components/forms/RegistrationForm";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "../reducers";

const store = createStore(allReducers);
export default class InitialSignup extends React.Component {
	constructor(props) {
		super(props);
		this.handleRegistration = this.handleRegistration.bind(this);
	}

	render() {
		return (
			<ImageBackground source={ background } style={ Styles.background }>
				<Text style={ Styles.welcomeText }>
					Welcome. Let's get partying.
				</Text>
				<View style={ Styles.formBounding }>
					<Provider store={ store }>
						<RegistrationForm onSubmit={ this.handleRegistration } />
					</Provider>
				</View>
			</ImageBackground>
		);
	}

	handleRegistration(values) {
		const { navigation } = this.props;

		values.phoneNumber = values.phoneNumber.replace(/-|\s/g, "");   //remove all spaces and hyphens so we can guarantee our desired format
		values.phoneNumber = "+1 " + values.phoneNumber.substring(0, 3) + "-" + values.phoneNumber.substring(3, 6) + "-" + values.phoneNumber.substring(6, 10);
		navigation.navigate("TextConfirm", {
			name: values.name,
			phoneNumber: values.phoneNumber
		})
	}
}

const Styles = StyleSheet.create({
	background: {
		position: "absolute",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},

	welcomeText: {
		marginTop: "22%",
		marginLeft: "11%",
		width: "65%",

		color: "#FFF",

		// fontFamily: 'Glacial Indifference',
		fontSize: 36.67,
		lineHeight: 43,
		fontWeight: "700"   //React Native wants this in quotes
	},

	formBounding: {
		marginLeft: "10%",
		marginTop: "30%",
		width: "80%"
	}

});
