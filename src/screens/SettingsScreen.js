import React, { Component } from "react";
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from "native-base";
import { StyleSheet } from "react-native";
import Header from "../components/Header"

export default class SettingsScreen extends Component {
	render() {
		return (
			<Container style={ styles.body }>
				<Header schoolName={ "test" } />
				<Content>
					<ListItem icon>
						<Left>
							<Button style={ { backgroundColor: "#FF9501" } }>
								<Text>test</Text>
							</Button>
						</Left>
						<Body>
							<Text>Airplane Mode</Text>
						</Body>
						<Right>
							<Switch value={ false } />
						</Right>
					</ListItem>
					<ListItem icon>
						<Left>
							<Button style={ { backgroundColor: "#007AFF" } }>
								<Text>test</Text>
							</Button>
						</Left>
						<Body>
							<Text>Wi-Fi</Text>
						</Body>
						<Right>
							<Text>GeekyAnts</Text>
							<Text>test</Text>
						</Right>
					</ListItem>
					<ListItem icon>
						<Left>
							<Button style={ { backgroundColor: "#007AFF" } }>
								<Text>test</Text>
							</Button>
						</Left>
						<Body>
							<Text>Bluetooth</Text>
						</Body>
						<Right>
							<Text>On</Text>
							<Text>test</Text>
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
	}
});
