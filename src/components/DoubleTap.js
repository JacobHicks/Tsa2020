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

import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

export default class DoubleTap extends React.Component {
    constructor(props) {
        super(props);
        this.handleDoubleTap = this.handleDoubleTap.bind(this);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
                {this.props.children}
            </TouchableWithoutFeedback>
        );
    }

    //Checks if the time of the (current time - last time) is within the bounds of delay
    handleDoubleTap = () => {
        const currentTime = Date.now();
        const tapDelay = this.props.delay === undefined ? 300 : this.props.delay;
        if (this.lastTapTime && (currentTime - this.lastTapTime) < tapDelay) {
            this.props.onPress();
        } else {
            this.lastTapTime = currentTime;
        }
    };
}
