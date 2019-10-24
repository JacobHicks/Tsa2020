import React from "react";
import { View, StyleSheet } from "react-native";
import {
	Card,
	Text,
	Left,
	Right, CardItem
} from "native-base";

export default class PartyCard extends React.Component {
	render() {
		return (
			<Card transparent style={ styles.partyCard }>
				<CardItem cardBody>
					<View
						style={ { height: 135, width: null, flex: 1, backgroundColor: "#ee5253" } } />
					<View style={ styles.partyText }>
						<Left>
							<Text style={ styles.partyTitle }>This is the title of party</Text>
							<View>
								<Text style={ styles.partyInfo }>OCT 8 @ 5:00PM</Text>
							</View>
						</Left>
						<Right>
							{/*<Text>{ this.props.attendees }</Text>*/ }
						</Right>
					</View>
				</CardItem>
			</Card>
		);
	}
}

const styles = StyleSheet.create({ // todo change border radius
	partyCard: {
		marginBottom: 10,
		minHeight: 100,
		minWidth: 220,
		borderRadius: 6.67
	},
	partyTitle: {
		textAlign: "left",
		color: "#FFFFFF",
		position: "absolute",
		bottom: 15,
		fontWeight: "600",
	},
	partyText: {
		position: "absolute",
		color: "#FFF",
		bottom: 5
	},
	partyInfo: {
		color: "#FFF"
	}
});
