import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useRef, useState} from 'react';
import CameraContent from "../components/CameraContent";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useMenuScan} from "../data/MenuScanProvider";
import { router } from 'expo-router';

export default function App() {
    let cameraRef = useRef();
    const [photo, setPhoto] = useState();
    const {setMenuImage} = useMenuScan();

    async function takePic() {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto("data:image/jpg;base64," + newPhoto.base64);
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 2],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    }

    function confirmPic() {
        setMenuImage(photo);
        router.navigate("/food-info")

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
                    onPress={pickImage}
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