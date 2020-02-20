import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "native-base";
import MaIcon from "react-native-vector-icons/MaterialIcons";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Stream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buffering: false
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Video
                    style={styles.video}
                    source={{uri: "https://stream.mux.com/" + navigation.getParam('playbackId') + ".m3u8"}}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    // onBuffer={this.onBuffer}
                 />

                <Button transparent style={{position: 'absolute', left: 0, top: 0}} onPress={() => {
                    navigation.navigate('Home');
                }}>
                    <Icon name='arrow-back' size={30} color='#8ea7a6'/>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center"
    },

    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    button: {},

    controlsContainer: {
        borderRadius: 16,
        backgroundColor: "#425c5a",
        flexDirection: 'row'
    },

    controlsContainerLayout: {
        position: 'absolute',
        bottom: 8,
        left: 0,
        right: 0,
        alignItems: 'center'
    },

    icon: {
        color: "#cb9e78",
        padding: 8
    }
});
