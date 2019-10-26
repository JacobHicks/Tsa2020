import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "native-base";

const UIButton = function(props) {
	return (
		<Button style={ styles.button }>
			<Text style={ styles.text }>{ props.children }</Text>
		</Button>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#ee5253",
	},
	text: {
		color: "#FFF",
		fontWeight: "700",
		fontSize: 14
	}

});

export default UIButton;
