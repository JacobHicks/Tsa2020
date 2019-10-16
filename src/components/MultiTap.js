/*------------------------------------------------------
|   Purpose:
|       Component that allows any other component to have
|       double-tap functionality.
|   Props:
|       function onPress():
|           The function to be executed when double tapped
|       number delay (optional):
|           Delay between presses to count as a double tap
|       Component[] children (optional):
|           Components that are getting double tap functionality
|   Returns:
|       Component with double tap functionality with its children
|   Authors:
|       Jacob Hicks
*-------------------------------------------------------------------*/

import React from "react";
import { TouchableWithoutFeedback } from "react-native";

export default class MultiTap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expirationTime: -1,
			numTaps: 0
		};

		this.handleTap = this.handleTap.bind(this);
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={ this.handleTap }>
				{ this.props.children }
			</TouchableWithoutFeedback>
		);
	}

	//Checks if the time of the (current time - last time) is within the bounds of delay
	handleTap = () => {
		if(this.state.expirationTime === -1) {
			this.setState({
				expirationTime: Date.now() + this.props.delay,
				numTaps: 1
			});

			this.listenTaps(this.props.delay === undefined ? 300 : this.props.delay)
		}
		else {
			this.setState({
				numTaps: this.state.numTaps + 1
			});
		}
	};

	listenTaps(delay) {
		setTimeout(() => {
			if(this.state.numTaps === 1) {
				this.props.onPress();
			}
			else if(this.state.numTaps >= 2) {
				this.props.onDoublePress();
			}
			this.setState({
				expirationTime: -1,
				numTaps: 0
			})
		}, delay);
	}
}
