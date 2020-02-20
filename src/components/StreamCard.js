import React from "react";
import {View, StyleSheet, Share, Dimensions} from "react-native";
import {
    Card,
    CardItem,
    Text,
    Button,
    Grid,
    Col
} from "native-base";
import TouchableIcon from "../components/TouchableIcon";
import ReactNativeHaptic from "react-native-haptic";
import {firebase} from "@react-native-firebase/dynamic-links";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaIcon from "react-native-vector-icons/MaterialIcons";


export default class StreamCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enrolled: this.props.streamInfo.enrolled
        };

    }

    onShare = async (name) => { //todo fix spaces in url name
        const link = await firebase.dynamicLinks().buildLink({
            link: "https://tsa2020.page.link/joinStream/" + name,
            domainUriPrefix: "https://tsa2020.page.link/joinStream"
        });

        await Share.share({
            message: link
        });
    };


    render() {
        return (
            <View style={[styles.streamCard, styles.defaultStyle]}>
                <CardItem cardBody
                          style={[styles.cardBody, this.state.enrolled ? styles.userIsGoing : styles.defaultStyle]}>
                    <Text style={styles.title} numberOfLines={2}>{this.props.streamInfo.name}</Text>
                </CardItem>

                <View style={{flexDirection: 'row', marginTop: 24, marginLeft: 'auto'}}>
                    <Button style={styles.shareButton}
                            onPress={() => this.onShare(this.props.streamInfo.name)}>
                        <Text style={styles.shareButtonText}><Icon name='external-link-alt' size={18}
                                                                   color='#999'/></Text>
                    </Button>

                    <Button style={styles.reportButton}
                            onPress={() => {
                            }}>
                        <Text style={styles.shareButtonText}><MaIcon name='report' style={{fontSize: 24}} size={24}
                                                                     color='#999'/></Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    streamCard: {
        padding: 0,
        backgroundColor: "#000",
        paddingBottom: 25,
        flexDirection: 'row',
        marginLeft: '3%',
        width: "94%",
        marginBottom: 16,
        borderRadius: 15,
        flex: 1
    },
    cardBody: {
        backgroundColor: "#000",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: 'center'
    },
    userIsGoing: {
        backgroundColor: "#111"
    },
    defaultStyle: {},
    title: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 24,
        marginTop: 16,
        marginLeft: 16,
        maxWidth: Dimensions.get("window").width * 0.65
    },
    host: {
        fontSize: 14,
        color: "#999",
        position: "absolute",
        left: 14,
        top: 22,
        fontWeight: "600"
    },
    buttonGrid: {
        marginTop: -30,
        left: Dimensions.get("window").width * .73,
        marginBottom: -25
    },
    shareButton: {
        backgroundColor: "transparent",
    },
    reportButton: {
        backgroundColor: "transparent",
        marginLeft: -12
    }
});
