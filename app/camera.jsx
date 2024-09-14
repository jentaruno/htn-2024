import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useRef, useState} from 'react';
import CameraContent from "../components/CameraContent";
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
            <View style={styles.buttonGroup}>
                <FontAwesome.Button
                    color={'#000000'}
                    backgroundColor={'#ffffff'}
                    borderRadius={100}
                    size={30}
                    iconStyle={styles.buttonIcon}
                    name={"rotate-right"}
                    onPress={() => setPhoto(undefined)}
                />
                {photo
                    ? <Pressable style={styles.button} onPress={confirmPic}>
                        <Text style={styles.text}>Confirm</Text>
                    </Pressable>
                    : <FontAwesome.Button
                        color={'#000000'}
                        backgroundColor={'#f9a61f'}
                        borderRadius={100}
                        iconStyle={styles.buttonIcon}
                        size={40}
                        name="camera"
                        onPress={takePic}/>
                }
                <FontAwesome.Button
                    color={'#000000'}
                    backgroundColor={'#ffffff'}
                    borderRadius={100}
                    size={30}
                    iconStyle={styles.buttonIcon}
                    name={"image"}
                    onPress={() => setPhoto(undefined)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(({
    container: {
        margin: 'auto',
        alignItems: 'center',
        gap: 20
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    button: {
        color: '#000000',
        backgroundColor: '#f9a61f',
        padding: 12,
        borderRadius: 100
    },
    buttonIcon: {
        marginLeft: 8
    }
}))