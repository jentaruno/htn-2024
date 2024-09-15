import {useState} from 'react';
import {Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FoodInfoList from './FoodInfoList';

export function BottomDrawerTrigger() {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOpenBottomSheet} style={{
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: '#86827e',
                paddingVertical: 12,
                borderRadius: 8
            }}>
                <Text text={'Open Drawer'} color={'#86827e'} size={16}/>
            </TouchableOpacity>
            <BottomDrawer
                isOpen={isBottomSheetOpen}
                handleClose={handleCloseBottomSheet}
            />
        </View>
    )
}

export default function BottomDrawer({isOpen, handleClose}) {
    const windowHeight = Dimensions.get('window').height;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            // We use the state here to toggle visibility of Bottom Sheet
            visible={isOpen}
            // We pass our function as default function to close the Modal
            onRequestClose={handleClose}>

            <View style={[styles.bottomSheet, {height: windowHeight * 0.6}]}>
                <View style={{flex: 0, width: '100%', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text family={'Poppins-med'} size={16} color={'#86827e'}>Preview</Text>
                    <TouchableOpacity onPress={handleClose}>
                        <FontAwesome name={"close"}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <FoodInfoList></FoodInfoList>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'red'
    },
});