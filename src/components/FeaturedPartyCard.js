import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
	Card,
	Text,
	CardItem,
	Grid,
	Col
} from "native-base";
import TouchableIcon from "../components/TouchableIcon";

export default class PartyCard extends React.Component {
	render() {
		return (//All props you need will be in this.props.partyInfo
			<Card transparent style={ styles.partyCard }>
				<CardItem header style={ styles.partyCardItem }>
					<Text style={ styles.partyInfo }>OCT 8 @ 5:00 PM</Text>
					<Text style={ styles.partyTitle } ellipsizeMode='tail'
					      numberOfLines={ 2 }>{ this.props.partyInfo.name }</Text>
					<Text style={ styles.partyGeneralLocation }
					      numberOfLines={ 1 }>{ this.props.partyInfo.generalLocation }</Text>
				</CardItem>
				<CardItem footer style={ styles.partyCardItem }>
					<Grid style={ styles.buttonGrid }>
						<Col style={ { flex: 1, flexDirection: "row" } }>
							<TouchableIcon>X<Text style={ styles.partyAttendees }> 25+</Text></TouchableIcon>
						</Col>
						<Col>
							<TouchableIcon>X</TouchableIcon>
						</Col>
						<Col>
							<TouchableIcon>X</TouchableIcon>
						</Col>
						<Col>
							<TouchableIcon>X</TouchableIcon>
						</Col>
					</Grid>
				</CardItem>
			</Card>
		);
	}
}

const styles = StyleSheet.create({ // todo change border radius
	partyCard: {
		width: 220,
		borderRadius: 15,
		height: 135,
		backgroundColor: "#DE3C4B",
		flex: 1
	},
	partyCardItem: {
		backgroundColor: "#DE3C4B",
		borderRadius: 12,
		paddingLeft: 15,
		flexDirection: "column",
		alignItems: "flex-start"
	},
	partyTitle: {
		color: "#fff",
		fontWeight: "700",
		maxWidth: 200,
		fontSize: Dimensions.get("window").width * .06,
		top: -5
	},
	partyInfo: {
		color: "#2B2D42",
		fontWeight: "800",
		fontSize: 12,
		top: -5
	},
	partyGeneralLocation: {
		color: "#f0f3fa",
		fontSize: 14,
		fontWeight: "600",

	},
	partyAttendees: {
		color: "#2B2D42",
		fontWeight: "800",
		fontSize: 12
	},
	buttonGrid: {
		alignContent: "space-between",
		bottom: 10
	}
});
