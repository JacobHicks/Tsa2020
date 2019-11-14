import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";

const TouchableIcon = function(props) {
	return (
		<Button style={ styles.button }>
			<Text style={ styles.text }>{ props.children }</Text>
		</Button>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "transparent",
		borderColor: "transparent"
	},
	text: {
		color: "#2B2D42",
		fontWeight: "700",
		fontSize: 16
	}

});

export default TouchableIcon;
