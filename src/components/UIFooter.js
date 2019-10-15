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
						<Button>
							<Text>B</Text>
						</Button>
						<Button>
							<Text>B</Text>
						</Button>
						<Button active>
							<Text>B</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		);
	}
}
