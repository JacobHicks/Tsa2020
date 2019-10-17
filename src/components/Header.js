import { Text, View, StyleSheet } from "react-native";
import React from "react";


const Header = function(props) {


	return (
		<View style={ styles.header }>
			<Text style={ styles.headerText }>Banger</Text>
			<Text style={ styles.collegeText }>{ props.collegeName }</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	header: {
		paddingLeft: 10,
		borderBottomColor: "#555",
		borderBottomWidth: .5,
		textAlign: "center"
	},
	headerText: {
		color: "#fff",
		fontSize: 20,
		textTransform: "uppercase",
		fontWeight: "700",
		textAlign: "center"
	},
	collegeText: {
		color: "#ddd",
		fontSize: 18,
		textTransform: "uppercase",
		fontWeight: "700",
		textAlign: "center",
		paddingBottom: 10
	}
});

export default Header;
