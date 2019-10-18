import React from "react";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";


const UIFooter = function(props) {

	return (
		<Footer style={ styles.footer }>
			<FooterTab style={ styles.footerTab }>
				<Button active={ props.homeIsActive } style={ styles.footerButton }
					//     onPress={
					// this.props.navigation.navigate("TextConfirm", {
					// 	name: "test",
					// 	phoneNumber: "test"
					// }) }
				>

				</Button>
				<Button active={ props.createIsActive } style={ styles.footerButton }>
					<Text>C</Text>
				</Button>
				<Button active={ props.profileIsActive } style={ styles.footerButton }>
					<Text>P</Text>
				</Button>
			</FooterTab>
		</Footer>
	)
};

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#000",
		borderRadius: 0
	},
	footerTab: {},
	footerButton: {
		borderRadius: 0
	},
	footerButtonText: {
		// backgroundColor: "linear-gradient(to right, #ff8a00 0%, #da1b60 100%)"
	}


});

export default UIFooter;
