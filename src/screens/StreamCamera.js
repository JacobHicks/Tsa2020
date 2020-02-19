import React from "react";
import {StyleSheet, View} from "react-native";
import {Button} from "native-base";
import {NodeCameraView} from "react-native-nodemediaclient";
import MaIcon from "react-native-vector-icons/MaterialIcons";
import axios from "react-native-axios";

export default class StreamCamera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streaming: false
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <NodeCameraView
                    style={styles.nodeCameraView}
                    ref={(vb) => {
                        this.vb = vb;
                    }}
                    outputUrl={"rtmp://live.mux.com/app/" + navigation.getParam('id')}
                    camera={{cameraId: 0, cameraFrontMirror: true}}
                    audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
                    video={{preset: 12, bitrate: 400000, profile: 1, fps: 30, videoFrontMirror: false}}
                    autopreview={true}
                />

                <View style={styles.controlsContainerLayout}>
                    <View style={styles.controlsContainer}>
                        <Button style={styles.button} transparent onPress={() => {
                            if(!this.state.streaming) {
                                this.setState({
                                    streaming: true
                                });

                                this.vb.start();
                            }
                            else {
                                this.setState({
                                    streaming: false
                                });

                                this.vb.stop();
                            }
                        }}>
                            <MaIcon name={this.state.streaming ? 'pause' : 'play-arrow'} size={30} style={styles.icon}/>
                        </Button>

                        <Button transparent style={styles.button} onPress={() => {
                            const credentials = {
                                username: '6dae45d5-fb79-4240-8d35-30d3163f6609',
                                password: '8jVOYbKu9PDq7Jw1T1wAi1e/WgZUg5dLPpmzVctBkIceWfBtpNUZu5Md5C8fSl9ZWxXSAO56f44'
                            };

                            this.setState({
                                streaming: false
                            });

                            this.vb.stop();

                            navigation.getParam('hostedReference').delete();
                            navigation.getParam('streamReference').delete();

                            axios.delete('https://api.mux.com/video/v1/live-streams/' + navigation.getParam('id'), {auth: credentials}).catch(e => {
                                console.log(e);
                            });

                            navigation.navigate('Home');
                        }}>
                            <MaIcon name='stop' size={30} style={styles.icon}/>
                        </Button>
                    </View>
                </View>
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

    nodeCameraView: {
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
