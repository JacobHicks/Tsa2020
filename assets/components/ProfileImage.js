import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ProfileImage extends React.Component {
    render() {
        return (
            <Image
                style={styles.image}
                source={require('../images/chad.jpg')}>
                <View style={{position: 'absolute', left: 12, bottom: 8, flexDirection: 'row'}}>
                    <Text style={styles.name}>
                        Chad Smith
                    </Text>
                    <Icon name="graduation-cap"
                          style={[styles.education, {
                              position: 'relative',
                              textAlignVertical: 'bottom',
                              marginLeft: 12,
                              marginBottom: 4,
                          }]}/>
                    <Text style={[styles.education, {
                        position: 'relative',
                        textAlignVertical: 'bottom',
                        marginLeft: 4,
                        marginBottom: 3,
                    }]}>
                        Prager University
                    </Text>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },

    name: {
        fontFamily: 'Segoe UI',
        fontSize: 27,
        color: '#cdcdcd',
    },

    education: {
        fontFamily: 'Segoe UI',
        fontSize: 14,
        color: '#8a8686',
    },
});
