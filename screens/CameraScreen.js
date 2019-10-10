import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Camera } from 'expo';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';
import navOptions from '../styles/NavOptions';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const newWidth = winHeight * (3 / 4);

export default class AllItemsScreen extends React.Component {
    static navigationOptions = {
        ...navOptions,
        title: 'All Products'
    };
    camera = null;

    state = {
        hasCameraPermission: null
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission =
            camera.status === 'granted' && audio.status === 'granted';

        this.setState({ hasCameraPermission });
    }

    render() {
        const { hasCameraPermission } = this.state;

        // if (hasCameraPermission === null) {
        //     return <View />;
        // } else if (hasCameraPermission === false) {
        //     return <Text>Access to camera has been denied.</Text>;
        // }

        return (
            <View>
                <Camera
                    style={styles.preview}
                    ref={camera => (this.camera = camera)}
                />
            </View>
        );
    }
    // static navigationOptions = {
    //   ...navOptions,
    //   title: 'Expired'
    // };

    // render() {
    //   return (
    //     <ScrollView style={styles.container}>
    //       {/* Go ahead and delete ExpoLinksView and replace it with your
    //          * content, we just wanted to provide you with some helpful links */}
    //       <ExpoLinksView />
    //     </ScrollView>
    //   );
    // }
}

const styles = StyleSheet.create({
    preview: {
        height: winHeight,
        width: newWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    }
});
