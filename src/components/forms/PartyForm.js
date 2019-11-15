import React from "react";
import { Field, reduxForm } from "redux-form";
import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, ScrollView } from "react-native";
import { Row, Col, Grid, Input, Item, Label, Textarea, Button } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

const validate = values => {
	const error = {};

	const { name, location, generalLocation, date, startTime, endTime, description } = values;

	if (name === undefined) {
		error.name = "Party name is required!";
	} else if (name.length <= 3 || name.length >= 50) {
		error.name = "Party name must be 4-50 characters long";
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
		error.startTime = "Party cannot start in the past!";
	}
	if (endTime === undefined) {
		error.location = "End time is required!";
	}
	if (description !== undefined && description.length >= 500) {
		error.description = "Description must be less then 500 characters";
	}

	if (startTime !== undefined && endTime !== undefined && endTime.getTime() - startTime.getTime() < 900000) {
		error.date = "Party must be at least 15 minutes!";
	}
	return error;
};

class PartyForm extends React.Component {
	constructor(props) {
		super(props);

		let date = new Date();
		date.setHours(date.getHours() + 1);

		let minDate = new Date();
		minDate.setMinutes(date.getMinutes() + 30);

		let endDate = new Date();
		endDate.setMinutes(date.getMinutes() + 45);

		this.state = {
			startDate: date,
			minDate: minDate,
			endDate: endDate,
			showingDate: false,
			showingStart: false,
			showingEnd: false,
			showDateText: false,
			showStartText: false,
			showEndText: false
		};

		props.enabledCallback(false);

		this.renderNameInput = this.renderNameInput.bind(this);
		this.renderLocationInput = this.renderLocationInput.bind(this);
		this.renderGeneralLocationInput = this.renderGeneralLocationInput.bind(this);
		this.renderDateInput = this.renderDateInput.bind(this);
		this.renderStartInput = this.renderStartInput.bind(this);
		this.renderEndInput = this.renderEndInput.bind(this);
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
					<Field name='location' component={ this.renderLocationInput } />
					<Field name='generalLocation' component={ this.renderGeneralLocationInput } />

					<Item regular style={ styles.formItem }>
						<Button style={ { backgroundColor: "transparent" } }
						        onPress={ () => {
							        Keyboard.dismiss;
							        this.setState({ showingDate: true })
						        } }>
							<Text style={ {
								color: "#DE3C4B",
								fontSize: 18,
								fontWeight: "600"
							} }>{ this.state.showDateText ? this.state.startDate.toLocaleDateString() : "Date" }</Text>
						</Button>
					</Item>

					<Grid>
						<Col style={ { maxWidth: 150 } }>
							<Item regular style={ styles.formItem }>
								<Button transparent onPress={ () => {
									Keyboard.dismiss;
									this.setState({ showingStart: true })
								}
								}>
									<Text style={ {
										color: "#DE3C4B",
										fontSize: 18,
										fontWeight: "600"
									} }>{ this.state.showStartText ? this.state.startDate.toLocaleTimeString(navigator.language, {
										hour: "2-digit",
										minute: "2-digit"
									}) : "Start Time" }</Text>
								</Button>
							</Item>
						</Col>

						<Col style={ { maxWidth: 150 } }>
							<Item regular style={ styles.formItem }>
								<Button transparent onPress={ () => {
									Keyboard.dismiss;
									this.setState({ showingEnd: true })
								}
								}>
									<Text style={ {
										color: "#DE3C4B",
										fontSize: 18,
										fontWeight: "600"
									} }>{ this.state.showEndText ? this.state.endDate.toLocaleTimeString(navigator.language, {
										hour: "2-digit",
										minute: "2-digit"
									}) : "End Time" }</Text>
								</Button>
							</Item>
						</Col>
					</Grid>

					<Field name='description' component={ this.renderDescriptionInput } />

					{
						this.state.showingDate ?
							<Field name='date' component={ this.renderDateInput } />
							:
							undefined
					}

					{
						this.state.showingStart ?
							<Field name='startTime' component={ this.renderStartInput } />
							:
							undefined
					}

					{
						this.state.showingEnd ?
							<Field name='endTime' component={ this.renderEndInput } />
							:
							undefined
					}
				</ScrollView>
			</TouchableWithoutFeedback>
		);
	}

	renderNameInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item regular style={ { borderColor: "#000", marginLeft: 20 } }>
				<Input placeholder="what's the plan?" style={ styles.titleInput }
				       selectionColor={ "#DE3C4B" } { ...input }
				       onChangeText={ text => {
					       input.onChange(text);
					       this.props.onTitleChange(text);
				       } } />
			</Item>
		);
	}

	renderLocationInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item stackedLabel style={ styles.formItem }>
				<Label style={ { color: "#FFF", fontSize: 18, fontWeight: "600" } }>location</Label>
				<Input placeholder="123 main street" style={ styles.formInput }
				       selectionColor={ "#DE3C4B" } { ...input } />
			</Item>
		);
	}

	renderGeneralLocationInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		return (
			<Item stackedLabel success={ false } style={ styles.formItem }>
				<Label style={ { flexDirection: "row" } }>
					<Text style={ { color: "#fff", fontSize: 18, fontWeight: "600" } }>general location</Text>
				</Label>
				<Input placeholder="on main street" style={ styles.formInput }
				       selectionColor={ "#DE3C4B" } { ...input } />
			</Item>
		);
	}

	renderDateInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		if (input.value === "") {
			input.value = this.state.startDate;
		}
		return (
			<DateTimePicker
				value={ input.value }
				minimumDate={ this.state.minDate }
				mode='date'
				display='default'
				style={ { paddingBottom: 1000 } }
				onChange={ (event, date) => {
					this.setState({
						showingDate: false
					});
					if (date !== undefined) {
						input.onChange(date);
						this.setState({
							startDate: date,
							showDateText: true
						});
					}
				} }
			/>
		);
	}

	renderStartInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		if (input.value === "") {
			input.value = this.state.startDate;
		}
		return (
			<DateTimePicker
				value={ input.value }
				minimumDate={ this.state.minDate }
				mode='time'
				display='default'
				minuteInterval={ 5 }
				onChange={ (event, date) => {
					this.setState({
						showingStart: false
					});
					if (date !== undefined) {
						input.onChange(date);
						this.setState({
							startDate: date,
							showStartText: true
						});
					}
				} }
			/>
		);
	}

	renderEndInput({ input, label, type, meta: { touched, error, warning } }) {
		let hasError = error !== undefined;

		if (input.value === "") {
			input.value = this.state.endDate;
		}
		return (
			<DateTimePicker
				value={ input.value }
				minimumDate={ this.state.startDate }
				mode='time'
				display='default'
				minuteInterval={ 5 }
				onChange={ (event, date) => {
					this.setState({
						showingEnd: false
					});
					if (date !== undefined) {
						input.onChange(date);
						this.setState({
							endDate: date,
							showEndText: true
						});
					}
				} }
			/>
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
		borderColor: "#000",
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
	form: "party",
	validate
})(PartyForm);
