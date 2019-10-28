import {Picker, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {SearchableFlatList} from 'react-native-searchable-list';
import {Container, Header, Icon, Input} from 'native-base';

const institutions = require('../../assets/data/us_institutions');

export default class InstitutionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Icon name="ios-search"/>
                    <Input placeholder='Search' onChangeText={text => this.setState({query: text})}/>
                </Header>
                <SearchableFlatList
                    data={institutions}
                    searchTerm={this.state.query}
                    searchAttribute='institution'
                    renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={this.props.onChange(item.institution)}>
                            <Text>{item.institution}</Text>
                        </TouchableWithoutFeedback>
                    }
                    keyExtractor={item => item.unitid.toString()}
                />
            </Container>
        );
    }
}
