import {Camera, CameraView} from "expo-camera";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";

export default function CameraContent({photo, cameraRef}) {
    const [hasCameraPermission, setHasCameraPermission] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    if (photo) {
        return (
            <SafeAreaView style={styles.contentContainer}>
                <Image style={styles.preview} source={{uri: photo}}/>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.contentContainer}>
            <CameraView style={styles.cameraView} ref={cameraRef}>
                <StatusBar style="auto"/>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        width: 300,
        height: 600
    },
    cameraView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});