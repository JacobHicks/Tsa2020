import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Footer, FooterTab, Button, Text} from "native-base";
import MaIcon from "react-native-vector-icons/MaterialIcons";

const UIFooter = function (props) {
    const navigation = props.navigation;
    const name = navigation.getParam("name");
    const institution = navigation.getParam("institution");
    return (
        <Footer style={styles.footer}>
            <FooterTab style={styles.footerTab}>
                <Button style={styles.footerButton}
                        onPress={() => navigation.navigate("Home", {name: name, institution: institution})}
                >
                    {props.homeIsActive ? <MaIcon name='home' size={30} style={styles.active}/> :
                        <MaIcon name='home' size={30} style={styles.icon}/>}
                </Button>

                <Button style={styles.footerButton}
                        onPress={() => navigation.navigate("CreateStream", {name: name, institution: institution})}
                >
                    <MaIcon name="add-circle-outline" size={30} style={styles.icon}/>
                </Button>

                <Button style={styles.footerButton}
                        onPress={() => navigation.navigate("Profile", {name: name, institution: institution})}
                >
                    {props.profileIsActive ? <MaIcon name='person' size={30} style={styles.active}/> :
                        <MaIcon name='perm-identity' size={30} style={styles.icon}/>}

                </Button>
            </FooterTab>
        </Footer>
    );
};

const styles = StyleSheet.create({
    footer: {
        height: 50,
        position: 'absolute',
        bottom: 0
    },
    footerTab: {
        backgroundColor: "#425c5a",
    },
    footerButton: {
        backgroundColor: "#425c5a",
        borderRadius: 0,
        marginBottom: 12
    },
    footerButtonText: {
        color: "#8ea7a6",
        fontSize: 13,
        textAlign: "center",
        fontWeight: "700"
    },
    active: {
        color: "#cb9e78"
    },
    icon: {
        color: "#8ea7a6"
    }

});

export default UIFooter;
