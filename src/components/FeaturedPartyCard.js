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
import Icon from "react-native-vector-icons/MaterialIcons";

function formatAMPM(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	return `${ hours }:${ minutes } ${ ampm }`;
}

export default class PartyCard extends React.Component {
	formatDate(time) {
		const formattedTime = new Date(time);
		const now = new Date();
		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		if (now > formattedTime) {
			return "NOW";
		} else if ((formattedTime.getDate() === now.getDate()) && (formattedTime.getMonth() === now.getMonth()) && (formattedTime.getFullYear() === now.getFullYear())) { // im sorry it has to be like this
			return "TODAY";
		} else {
			return `${ months[formattedTime.getMonth()] } ${ formattedTime.getDate() } @ ${ formatAMPM(formattedTime) }`;
		}
	}

	render() {
		return (//All props you need will be in this.props.partyInfo
			<Card transparent style={ styles.partyCard }>
				<CardItem header style={ styles.partyCardItem }>
					<Text style={ styles.partyInfo }>{ this.formatDate(this.props.partyInfo.time) }</Text>
					<Text style={ styles.partyTitle } ellipsizeMode='tail'
					      numberOfLines={ 2 }>{ this.props.partyInfo.name }</Text>
					<Text style={ styles.partyGeneralLocation }
					      numberOfLines={ 1 }>{ this.props.partyInfo.generalLocation }</Text>
				</CardItem>
				<CardItem footer style={ styles.partyCardItem }>
					<Grid style={ styles.buttonGrid }>
						<Col style={ { flex: 1, flexDirection: "row" } }>
							<TouchableIcon><Icon name='add-circle' size={ 20 } color='#2B2D42' /><Text style={ styles.partyAttendees }> 25+</Text></TouchableIcon>
						</Col>
						<Col>
							<TouchableIcon><Icon name='caretup' size={ 20 } color='#2B2D42' /></TouchableIcon>
						</Col>
						<Col>
							<TouchableIcon><Icon name='share' size={ 20 } color='#2B2D42' /></TouchableIcon>
						</Col>
						<Col>
							<TouchableIcon><Icon name='info' size={ 20 } color='#2B2D42' /></TouchableIcon>
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
		bottom: 10,
	}
});
