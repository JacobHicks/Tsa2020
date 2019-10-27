import React from "react";
import { StyleSheet } from "react-native";
import { Dimensions, Text, View } from "react-native";

export default class PartyWalletCard extends React.Component {

	render() {
		return (
			<View style={ styles.container }>
				<Text style={ styles.titleText }>
					{ this.props.title }
				</Text>
				<Text style={ styles.titleText }>testing</Text>
				<View style={ styles.buttons }>
					<View style={ styles.detailButton }>
						<Text style={ styles.buttonText }>
							Details
						</Text>
					</View>

					<View style={ styles.signInButton }>
						<Text style={ styles.buttonText }>
							Check In
						</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ee5253",
		borderRadius: 13,
		width: "100%",
		height: Dimensions.get("window").height * .19,
		marginTop: 10,
		marginBottom: 10,
		flex: 1,
		flexDirection: "column",
		paddingTop: 20
	},

	titleText: {
		fontSize: Dimensions.get("window").width * .05,
		fontWeight: "700",
		textAlign: "center",
		marginLeft: 16,
		marginRight: 16,

		color: "#fff",
		flex: 15
	},

	buttons: {
		width: "100%",
		flex: 30,
		flexDirection: "row"
	},

	buttonText: {
		color: "#FFF",
		fontSize: Dimensions.get("window").width * .05,
		fontWeight: "700",
		textAlign: "center"
	},

	detailButton: {
		backgroundColor: "#000",
		width: "50%",
		height: "100%",
		borderBottomLeftRadius: 13,
		justifyContent: "center"
	},

	signInButton: {
		backgroundColor: "#000",
		width: "50%",
		height: "100%",
		borderBottomRightRadius: 13,
		borderBottomColor: "transparent",
		justifyContent: "center"
	}
});
