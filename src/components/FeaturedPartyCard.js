import React from "react";
import { StyleSheet } from "react-native";
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
					<Text style={styles.partyGeneralLocation}>@ Main Street</Text>
				</CardItem>
				<CardItem footer style={ styles.partyCardItem }>
					<Grid style={ styles.buttonGrid }>
						<Col style={{ flex: 1, flexDirection: "row", }}>
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
		backgroundColor: "#ee5253",
		flex: 1,
	},
	partyCardItem: {
		backgroundColor: "#ee5253",
		borderRadius: 12,
		paddingLeft: 15,
		flexDirection: "column",
		alignItems: "flex-start"
	},
	partyTitle: {
		color: "#fff",
		fontWeight: "700",
		fontSize: 22,
		maxWidth: 200
	},
	partyInfo: {
		color: "#4D3540",
		fontWeight: "700",
		fontSize: 14
	},
	partyGeneralLocation: {
		color: "#FFF",
		fontSize: 16,

	},
	partyAttendees: {
		color: "#333",
		fontWeight: "800",
		fontSize: 12
	},
	buttonGrid: {
		alignContent: "space-between",
		bottom: -10
	}
});
