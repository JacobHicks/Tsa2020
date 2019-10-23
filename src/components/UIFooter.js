import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Footer, FooterTab, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UIFooter = function (props) {

    return (
        <Footer style={styles.footer}>
            <FooterTab style={styles.footerTab}>
                <Button active={props.homeIsActive} style={styles.footerButton}
                    //     onPress={
                    // this.props.navigation.navigate("TextConfirm", {
                    // 	name: "test",
                    // 	phoneNumber: "test"
                    // }) }
                >
                    <Icon name='home' size={43} color='#FFF'/>
                    <Text style={styles.footerButtonText}>Home</Text>
                </Button>
                <Button active={props.createIsActive} style={styles.footerButton}>
                    <Icon name='control-point' size={43} color='#FFF'/>
                    <Text style={styles.footerButtonText}>Host</Text>
                </Button>
                <Button active={props.profileIsActive} style={styles.footerButton}>
                    <Icon name='person' size={43} color='#FFF'/>
                    <Text style={styles.footerButtonText}>Profile</Text>
                </Button>
            </FooterTab>
        </Footer>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#000',
        borderTopWidth: 1,
        borderColor: '#FFF',
        height: 88,
    },
    footerTab: {
        backgroundColor: '#000',
    },
    footerButton: {
        backgroundColor: '#000',
        borderRadius: 0,
    },
    footerButtonText: {
        color: '#FFF',
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '700'
    },


});

export default UIFooter;
