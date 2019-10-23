import React from "react";
import { View, StyleSheet } from "react-native";
import {
	Card,
	CardItem,
	Text,
	Left,
	Right
} from "native-base";

export default class PartyCard extends React.Component {
	render() {
		return (
			<Card transparent style={ styles.partyCard }>
				<CardItem cardBody>
					<View style={ { height: 200, width: null, flex: 1, backgroundColor: "#4834d4" } }>
						<CalendarIcon style={ styles.calendarIcon } />
					</View>

					<View style={ styles.partyText }>
						<Left>
							<Text style={ styles.partyTitle }>{ this.props.title }</Text>
							<View>
								<Text style={ styles.partyInfo }>{ this.props.time } | { this.props.host }</Text>
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

const styles = StyleSheet.create({
	partyCard: {
		padding: 0,
		marginBottom: 10,
		minHeight: 120,
		minWidth: 220
		// borderRadius: 6.67
	},
	partyTitle: {
		bottom: 25,
		textAlign: "left",
		paddingTop: "10%",
		color: "#FFFFFF",
		fontSize: 30,
		fontWeight: "600",
		position: "absolute",
		left: 12
	},
	partyText: {
		position: "absolute",
		bottom: 10,
		color: "#FFF"
	},
	partyInfo: {
		color: "#FFF",
		left: 14,

	}
});
