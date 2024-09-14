import {StatusBar} from 'expo-status-bar';
import {Button, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {Camera, CameraView} from 'expo-camera';

export default function App() {
    let cameraRef = useRef();
    const [photo, setPhoto] = useState();
    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    function confirmPic() {

    }

    return (
        <View style={styles.container}>
            <Text>{!photo && "Position the menu in the frame"}</Text>
            <CameraContent
                photo={photo}
                setPhoto={setPhoto}
                cameraRef={cameraRef}
            />
            {photo
                ? <View style={styles.buttonGroup}>
                    <Button title="Confirm" onPress={confirmPic}/>
                    <Button title="Discard" onPress={() => setPhoto(undefined)}/>
                </View>
                : <View style={styles.buttonGroup}>
                    <Button title="Take Pic" onPress={takePic}/>
                </View>}
        </View>
    )
}

function CameraContent({photo, setPhoto, cameraRef}) {
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
                <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photo.base64}}/>
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
    container: {
        marginTop: 70,
        alignItems: 'center',
        gap: 20
    },
    contentContainer: {
        width: 300,
        height: 600
    },
    cameraView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
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