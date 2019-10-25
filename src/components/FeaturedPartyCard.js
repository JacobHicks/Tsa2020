import React from "react";
import { View, StyleSheet } from "react-native";
import {
	Card,
	Text,
	Left,
	Right,
	CardItem,
	Grid,
	Col
} from "native-base";

export default class PartyCard extends React.Component {
	render() {
		return (
			<Card transparent style={ styles.partyCard }>
				<CardItem cardBody style={ styles.partyCardItem }>
					<Text style={ styles.partyTitle } ellipsizeMode='tail' numberOfLines={ 2 }>This is the title.</Text>
				</CardItem>
				<Grid>
					<Col>
						<Text style={ styles.partyAttendees }>25+</Text>
					</Col>
					<Col>
						<Text style={ styles.partyInfo }>OCT 8 @ 5:00PM</Text>
					</Col>
				</Grid>
			</Card>
		);
	}
}

const styles = StyleSheet.create({ // todo change border radius
	partyCard: {
		minWidth: 220,
		borderRadius: 12,
		minHeight: 135,
		backgroundColor: "#ee5253",
		flex: 1,
	},
	partyCardItem: {
		backgroundColor: "#ee5253",
		borderRadius: 12
	},
	partyTitle: {
		color: "#FFF",
		fontWeight: "700",
		fontSize: 16,
		marginLeft: 15,
		marginTop: 15,
	},
	partyInfo: {
		color: "#FFF"
	},
	partyAttendees: {
		color: "#FFF",
		fontWeight: "800",
		fontSize: 18,

	}
});
