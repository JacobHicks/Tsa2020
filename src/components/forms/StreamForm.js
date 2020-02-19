import React from "react";
import { Field, reduxForm } from "redux-form";
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { Input, Item, Textarea } from "native-base";

const validate = values => {
	const error = {};

	const { name, location, generalLocation, date, startTime, endTime, description } = values;

	if (name === undefined) {
		error.name = "Stream name is required!";
	} else if (name.length <= 3 || name.length >= 50) {
		error.name = "Stream name must be 4-50 characters long";
	}
	if (location === undefined) {
		error.location = "Location is required!";
	} else if (location.length <= 3 || location.length >= 200) {
		error.location = "Location must be 4-199 characters long";
	}
	if (generalLocation !== undefined && generalLocation.length >= 50) {
		error.generalLocation = "General Location must be less than 50 characters long";
	}
	if (date === undefined) {
		error.location = "Date is required!";
	}
	if (startTime === undefined) {
		error.location = "Start time is required!";
	} else if (startTime.getTime() <= new Date().getTime()) {
		error.startTime = "Stream cannot start in the past!";
	}
	if (endTime === undefined) {
		error.location = "End time is required!";
	}
	if (description !== undefined && description.length >= 500) {
		error.description = "Description must be less then 500 characters";
	}

	if (startTime !== undefined && endTime !== undefined && endTime.getTime() - startTime.getTime() < 900000) {
		error.date = "Stream must be at least 15 minutes!";
	}
	return error;
};

class StreamForm extends React.Component {
	constructor(props) {
		super(props);

		this.renderNameInput = this.renderNameInput.bind(this);
		this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
	}

	componentDidUpdate(prevProps) {
		const enabled = (this.props.valid && !this.props.submitting) || !this.props.anyTouched;
		const wasEnabled = (prevProps.valid && !prevProps.submitting) || !prevProps.anyTouched;

		if (enabled !== wasEnabled) {
			this.props.enabledCallback(enabled);
		}
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={ Keyboard.dismiss } style={ { flex: 1 } }>
				<ScrollView>
					<Field name='name' component={ this.renderNameInput } />
					<Field name='description' component={ this.renderDescriptionInput } />
				</ScrollView>
			</TouchableWithoutFeedback>
		);
	}

	renderNameInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item regular style={ { borderColor: "#425c5a", marginLeft: 20 } }>
				<Input placeholder="what's the plan?" style={ styles.titleInput }
				       selectionColor={ "#DE3C4B" } { ...input }
				       onChangeText={ text => {
					       input.onChange(text);
					       this.props.onTitleChange(text);
				       } } />
			</Item>
		);
	}

	renderDescriptionInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item style={ styles.formItem }>
				<Textarea bordered={ false } underline={ false } rowSpan={ 10 }
				          style={ [styles.formInput, { left: -9, top: 12, width: 300 }] }
				          placeholder={ "description" } selectionColor={ "#DE3C4B" }
				          { ...input } />
			</Item>
		);
	}
}

const styles = StyleSheet.create({
	formInput: {
		color: "#fff",
		fontSize: 18
	},
	formItem: {
		borderColor: "#425c5a",
		marginLeft: 42
	},
	titleInput: {
		height: 80,
		fontSize: 35,
		color: "#FFF",
		fontWeight: "700",
		maxWidth: 387
	}

});

export default reduxForm({
	form: "stream",
	validate
})(StreamForm);
