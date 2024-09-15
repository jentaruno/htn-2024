import FoodInfoList from "../components/FoodInfoList";
import {useMenuScan} from "../data/MenuScanProvider";
import {ActivityIndicator, StyleSheet, View} from "react-native";

export default function Page() {
    const {isLoading, menuInfo} = useMenuScan();

    return (
        <View style={styles.container}>
            {isLoading
                ? <ActivityIndicator size={"large"}/>
                : <FoodInfoList foodInfos={menuInfo}/>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#F9F5ED'
    },
});
