import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


export default class PartyCard extends React.Component {
	render() {
		return (
			<View style={ styles.partyCard }>
				<Text style={ styles.partyTitle }>{ this.props.title }</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	partyCard: {
		padding: 0,
		backgroundColor: 'red',
		margin: 5,
		marginBottom: 10,
		minHeight: 120,
		minWidth: 220,
	},
	partyTitle: {
		marginBottom: 20
	},
});
