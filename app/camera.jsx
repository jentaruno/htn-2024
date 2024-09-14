import {StatusBar} from 'expo-status-bar';
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Camera, CameraView} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.cameraContainer}>
                    <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photo.base64}}/>
                    {hasMediaLibraryPermission && <Button title="Save" onPress={savePhoto}/>}
                    <Button title="Discard" onPress={() => setPhoto(undefined)}/>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <CameraView style={styles.cameraView} ref={cameraRef}>
                    <StatusBar style="auto"/>
                </CameraView>
                <Text>Position the menu in the frame</Text>
                <Button title="Take Pic" onPress={takePic}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    cameraContainer: {
        width: 300,
        height: 600,
    },
    cameraView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});