import {Button, StyleSheet, Text, View} from 'react-native';
import {useRef, useState} from 'react';
import CameraContent from "../components/CameraContent";

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

const styles = StyleSheet.create(({
    container: {
        marginTop: 70,
        alignItems: 'center',
        gap: 20
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
}))