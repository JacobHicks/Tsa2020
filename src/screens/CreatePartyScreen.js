import React from "react";
import DoubleTap from "../components/DoubleTap";
import PartyCard from "../components/PartyCard";
import FeaturedPartyCard from "../components/FeaturedPartyCard";
import SheetContent from "../components/SheetContent";
import Footer from "../components/UIFooter";
import { Spinner } from "native-base";
import { Text, View, StyleSheet, FlatList, StatusBar } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
// todo import Toasts from native base

// import '@react-native-firebase/functions';
// import '@react-native-firebase/auth';

export default class CreatePartyScreen extends React.Component {
	static navigationOptions = {
		title: "Home"
	};


	constructor(props) {
		super(props);
		this.state = {

			dbg: "tst",

		};
	}




	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={ styles.body }>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#000"
	},
	header: {
		paddingLeft: 10,
		paddingTop: 60, // todo dynamically get statusbar height
		borderBottomColor: "#555",
		borderBottomWidth: .5
	},
	headerText: {
		color: "#FFFFFF"
	},
	container: {
		// padding: 7,
		maxHeight: 750 // todo get device height - height of bottom navigation
	},

});
