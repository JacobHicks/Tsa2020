import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";
import MaIcon from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome5";

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
					{ props.homeIsActive ? <Icon name='glass-cheers' style={ styles.active } size={ 26 } /> :
						<Icon name='wine-glass-alt' style={ styles.icon } size={ 26 } /> }

				</Button>
				<Button style={ styles.footerButton }
				        onPress={ () => navigation.navigate("CreateParty", { name: name, institution: institution }) }
				>
					<MaIcon name="add-circle-outline" size={ 30 } color='#FFF' />
				</Button>
				<Button style={ styles.footerButton }
				        onPress={ () => navigation.navigate("Profile", { name: name, institution: institution }) }
				>
					{ props.profileIsActive ? <MaIcon name='person' size={ 30 } style={ styles.active } /> :
						<MaIcon name='perm-identity' size={ 30 } style={ styles.icon } /> }

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
