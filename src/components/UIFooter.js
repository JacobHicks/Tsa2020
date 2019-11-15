import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const UIFooter = function(props) {
	const navigation = props.navigation;
	const name = navigation.getParam("name");
	const institution = navigation.getParam("institution");
	return (
		<Footer style={ styles.footer }>
			<FooterTab style={ styles.footerTab }>
				<Button style={ styles.footerButton }
				        onPress={ () => navigation.navigate("Home", { name: name, institution: institution }) }
				>
					<Icon name='home' style={ props.homeIsActive ? styles.active : styles.icon } size={ 30 } />
				</Button>
				<Button style={ styles.footerButton }
				        onPress={ () => navigation.navigate("CreateParty", { name: name, institution: institution }) }
				>
					<Icon name='control-point' size={ 30 } color='#FFF' />
				</Button>
				<Button style={ styles.footerButton }
				        onPress={ () => navigation.navigate("Profile", { name: name, institution: institution }) }
				>
					<Icon name='person' size={ 30 } style={ props.profileIsActive ? styles.active : styles.icon } />
				</Button>
			</FooterTab>
		</Footer>
	);
};

const styles = StyleSheet.create({
	footer: {
		height: 50
	},
	footerTab: {
		backgroundColor: "#000",
		borderTopWidth: .05,
		borderColor: "#FFF"
	},
	footerButton: {
		backgroundColor: "#000",
		borderRadius: 0,
		marginBottom: 12
	},
	footerButtonText: {
		color: "#FFF",
		fontSize: 13,
		textAlign: "center",
		fontWeight: "700"
	},
	active: {
		color: "#DE3C4B"
	},
	icon: {
		color: "#FFFFFF"
	}

});

export default UIFooter;
