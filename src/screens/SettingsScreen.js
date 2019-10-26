import React, { Component } from "react";
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Separator } from "native-base";
import { StyleSheet } from "react-native";
import Header from "../components/Header"

export default class SettingsScreen extends Component {
	render() {
		return (
			<Container style={ styles.body }>
				<Header collegeName={ "UCLA" } />
				<Content>
					<Separator style={ styles.separator }></Separator>
					<ListItem icon>
						<Left>
							<Button disabled style={ { backgroundColor: "#007AFF" } }>
								<Text>{ " >" }</Text>
							</Button>
						</Left>
						<Body>
							<Text style={styles.itemText}>School</Text>
						</Body>
						<Right>
							<Text>UCLA</Text>
							<Text>{ " >" }</Text>
						</Right>
					</ListItem>
					<ListItem icon>
						<Left>
							<Button disabled style={ { backgroundColor: "#007AFF" } }>
								<Text>{ " >" }</Text>
							</Button>
						</Left>
						<Body>
							<Text style={styles.itemText}>Bluetooth</Text>
						</Body>
						<Right>
							<Text>On</Text>
							<Text>{ " >" }</Text>
						</Right>
					</ListItem>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#000",
		height: "100%"
	},
	itemText: {
		color: "#fff"
	},
	separator: {
		backgroundColor: "#000"
	}
});
