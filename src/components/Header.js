import { Text, View, StyleSheet, StatusBar } from "react-native";
import React from "react";


const Header = function(props) {
	return (
		<View style={ styles.header }>
			<StatusBar barStyle="light-content" />
			<Text style={ styles.headerText }>Tsa2020</Text>
			<Text style={ styles.collegeText }>{ props.collegeName }</Text>
		</View>
	)
};

const styles = StyleSheet.create({
	header: {
		paddingLeft: 10,
		marginTop: 34,
		borderBottomColor: "#555",
		borderBottomWidth: .5,
		textAlign: "center",
		backgroundColor: "#000"
	},
	headerText: {
		color: "#DE3C4B",
		fontSize: 16,
		textTransform: "uppercase",
		fontWeight: "700",
		textAlign: "center"
	},
	collegeText: {
		color: "#ddd",
		fontSize: 11,
		textTransform: "uppercase",
		fontWeight: "700",
		textAlign: "center",
		paddingBottom: 8
	}
});

export default Header;
