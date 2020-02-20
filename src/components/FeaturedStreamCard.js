import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
	Card,
	Text,
	CardItem,
	Grid,
	Col,
	View
} from "native-base";
import TouchableIcon from "../components/TouchableIcon";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaIcon from "react-native-vector-icons/MaterialIcons";

export default class StreamCard extends React.Component {

	render() {
		return (//All props you need will be in this.props.streamInfo
			<Card transparent style={ styles.streamCard }>
				<CardItem header style={ styles.streamCardItem }>
					<View style={ styles.textContainer }>
						<Text style={ styles.streamTitle } ellipsizeMode='tail'
						      numberOfLines={ 2 }>{ this.props.streamInfo.name }</Text>
					</View>
					<Grid style={ styles.buttonGrid }>
						<Col>
							<TouchableIcon><Icon name='external-link-alt' size={ 21 } color='#2B2D42' /></TouchableIcon>
						</Col>
						<Col style={ { flex: 1, flexDirection: "row" } }>
							<TouchableIcon><MaIcon name='report' style={{fontSize: 28}} color='#2B2D42'/></TouchableIcon>
						</Col>
					</Grid>
				</CardItem>
			</Card>
		);
	}
}

const styles = StyleSheet.create({ // todo change border radius
	streamCard: {
		width: 220,
		borderRadius: 15,
		height: 135,
		backgroundColor: "#DE3C4B",
		flex: 1
	},
	streamCardItem: {
		backgroundColor: "#DE3C4B",
		height: 135,
		borderRadius: 12,
		paddingLeft: 15,
		flexDirection: "column",
		alignItems: "flex-start"
	},
	streamTitle: {
		color: "#fff",
		fontWeight: "700",
		maxWidth: 200,
		fontSize: Dimensions.get("window").width * .065,
		top: -2,
		lineHeight: 30
	},
	streamInfo: {
		color: "#2B2D42",
		fontWeight: "800",
		fontSize: 12,
		top: -5
	},
	textContainer: {
		minHeight: 81,
	},
	streamAttendees: {
		color: "#2B2D42",
		fontWeight: "800",
		fontSize: 12
	},
	buttonGrid: {
		bottom: 10,
		maxWidth: 95,
		marginLeft: -15
	}
});
