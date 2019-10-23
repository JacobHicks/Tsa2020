import React from "react";
import { StyleSheet, ImageBackground, View, Dimensions, StatusBar, SafeAreaView } from "react-native";
import { Text, Container } from "native-base";
import { InputAutoSuggest } from "react-native-autocomplete-search";


export default class InitialSignup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<StatusBar barStyle="light-content" />
				<Text style={ styles.welcomeText }>

				</Text>
				<SafeAreaView style={ styles.container }>
					<InputAutoSuggest
						placeholder={"test"}
						inputStyle={ styles.inputStyle }
						flatListStyle={ styles.flatListStyle }
						onDataSelectedChange={ (data) => {
							if (data !== null) {
								setDbg(data)
							}
						} }
						staticData={ [
							{ id: "1", name: "Paris" },
							{ id: "2", name: "Pattanduru" },
							{ id: "3", name: "Para" },
							{ id: "4", name: "poop" },
							{ id: "5", name: "New York" },
							{ id: "6", name: "Berlin" }] }

						itemTagStyle={ styles.itemTagStyle }
						itemTextStyle={ styles.itemTextStyle }
					/>
				</SafeAreaView>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
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
	container: {
		marginTop: 250
	},
	inputStyle: {
		// backgroundColor: "#faf",
		// color: "#faf",
		// flex: 1,
		width: 250,
		borderBottomWidth: 0,
		backgroundColor: "#ccc",
		borderRadius: 6.67,
		marginRight: 100,
		padding: 15,
		marginBottom: 10,
	},
	itemTextStyle: {
		backgroundColor: "#faf",
		padding: 10
	},
	flatListStyle: {
		backgroundColor: "#fff",
		fontSize: 1000
	}

});
