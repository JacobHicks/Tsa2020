import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
	Text,
	Button,
	Container,
	Icon
} from "native-base";

export default class SheetContent extends React.Component {
	render() {
		return (
			<ScrollView style={ styles.sheetContainer }>
				<Text style={ styles.sheetTitle }>{ this.props.title }</Text>
				<View style={ styles.sheetView }>
					<Text style={ styles.sheetDetail }><Text>Icon</Text> { this.props.host }</Text>
				</View>
				<View style={ styles.sheetView }>
					<Text style={ styles.sheetDetail }><Text>Icon</Text> { this.props.host }</Text>
				</View>
				<View style={ styles.sheetView }>
					<Text style={ styles.sheetDetail }><Text>Icon</Text> $5 entry fee</Text>
					<Text style={ styles.sheetSubDetail }>Supplies, fire extinguishers, insurance, cum</Text>
				</View>
				<View style={ styles.sheetView }>
					<Text style={ styles.sheetDetail }><Text>Icon</Text> About</Text>
					<ScrollView>
						<Text style={ styles.sheetSubDetail }>{ this.props.description }</Text>
					</ScrollView>
				</View>
				<Button style={ styles.joinButton }>
					<Text style={ styles.joinButtonText }>I'm in</Text>
				</Button>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	sheetContainer: {
		backgroundColor: "#fff",
		height: "100%",
		width: "100%",
		flex: 1
	},
	sheetTitle: {
		fontWeight: "700",
		fontSize: 36,
		color: "#000",
		marginTop: 15,
		marginLeft: 30
	},
	sheetView: {
		marginLeft: 30,
		marginTop: 15
	},
	sheetDetail: {
		color: "#000",
		fontSize: 24,
		fontWeight: "600",
		flexWrap: "wrap"
	},
	sheetSubDetail: {
		fontSize: 16,
		color: "#666",
		marginLeft: 38
	},
	joinButton: {
		backgroundColor: "red",
		borderRadius: 10,
		flex: 1,
		maxHeight: 50,
		position: "absolute",
		top: 500,
		left: "25%",
		right: "25%"
	},
	joinButtonText: {
		fontWeight: "700",
		fontSize: 18,
		marginLeft: "31%",
	}
});
