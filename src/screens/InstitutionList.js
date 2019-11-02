import {Picker, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback} from 'react-native';
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

    institutionSelected(institution) {
        const {navigation} = this.props;
        navigation.navigate('InitialSignup', {
            institution: institution
        });
    }

    render() {
        return (
            <Container style={{backgroundColor: '#000'}}>
                <Header searchBar rounded>
                    <Icon name="ios-search"/>
                    <Input placeholder='Search' onChangeText={text => this.setState({query: text})}/>
                </Header>
                <SearchableFlatList
                    data={institutions}
                    searchTerm={this.state.query}
                    searchAttribute='institution'
                    renderItem={({item}) =>
                        <TouchableHighlight onPress={() => this.institutionSelected(item.institution)}>
                            <Text style={styles.institutionName}>{item.institution}</Text>
                        </TouchableHighlight>
                    }
                    keyExtractor={item => item.unitid.toString()}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    institutionName: {
        color: '#FFF',

        fontSize: 18,
        lineHeight: 43,
        fontWeight: '700',

        paddingTop: 8,
        paddingBottom: 8
    }
});
