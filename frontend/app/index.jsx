import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import LogoSplash from "../components/LogoSplash";
import {router} from "expo-router";

export default function Page() {
    return (
        <TouchableHighlight onPress={() => router.navigate("/camera")}>
            <View style={styles.main}>
                <LogoSplash margin={200}/>
                <Text>Tap anywhere to continue</Text>
            </View>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create(({
    main: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 100,
        backgroundColor: "#f9f5ed",
    }
}));