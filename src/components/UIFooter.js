import React, { Component } from "react";
import { Container, Header, Content, Footer, FooterTab, Button, Text } from "native-base";

export default class UIFooter extends Component {
	render() {
		return (
			<Container>
				<Header />
				<Content />
				<Footer>
					<FooterTab>
						<Button active={ this.props.homeIsActive }
						    //     onPress={
							// this.props.navigation.navigate("TextConfirm", {
							// 	name: "test",
							// 	phoneNumber: "test"
							// }) }
						>
							<Text>Home</Text>
						</Button>
						<Button active={ this.props.createIsActive }>
							<Text>Create</Text>
						</Button>
						<Button active={ this.props.profileIsActive }>
							<Text>Profile</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
