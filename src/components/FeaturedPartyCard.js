import React from "react";
import { View, StyleSheet, Image } from "react-native";
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
					<Image
						source={ { uri: this.props.imageURL } }
						style={ { height: 135, width: null, flex: 1 } } />
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
		margin: 7,
		marginBottom: 10,
		minHeight: 75,
		minWidth: 220,
	},
	partyTitle: {
		marginBottom: 20,
		textAlign: "left",
		paddingTop: "10%",
		color: "#FFFFFF",
		// marginLeft: "5%"
	},
	partyText: {
		position: "absolute",
		left: 0,
		bottom: 0,
		color: "#FFF"
	},
	partyInfo: {
		color: "#FFF",
	}
});