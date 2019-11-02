import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const UIFooter = function(props) {
	const navigation = props.navigation;
	const name = props.name;
	const institution = props.institution;
	return (
		<Footer style={ styles.footer }>
			<FooterTab style={ styles.footerTab }>
				<Button active={ props.homeIsActive } style={ styles.footerButton }
				        onPress={ () => navigation.navigate("Home", {name: name, institution: institution}) }
				>
					<Icon name='home' size={ 20 } color='#FFF' />
					{/*<Text style={styles.footerButtonText}>Profile</Text>*/ }
				</Button>
				<Button active={ props.createIsActive } style={ styles.footerButton }
				        onPress={ () => navigation.navigate("CreateParty", {name: name, institution: institution}) }
				>
					<Icon name='control-point' size={ 20 } color='#FFF' />
					{/*<Text style={styles.footerButtonText}>Host</Text>*/ }
				</Button>
				<Button active={ props.profileIsActive } style={ styles.footerButton }
				        onPress={ () => navigation.navigate("Profile", {name: name, institution: institution}) }
				>
					<Icon name='person' size={ 20 } color='#FFF' />
					{/*<Text style={styles.footerButtonText}>Profile</Text>*/ }
				</Button>
			</FooterTab>
		</Footer>
	);
};

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#555",
		borderTopWidth: .5,
		borderColor: "#FFF",
		height: 50
	},
	footerTab: {
		backgroundColor: "#000"
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
	}


});

export default UIFooter;
