import FoodInfoList from "../components/FoodInfoList";
import {useMenuScan} from "../data/MenuScanProvider";
import {ActivityIndicator} from "react-native";

export default function Page() {
    const {isLoading, menuInfo} = useMenuScan();

    return isLoading
        ? <ActivityIndicator size={"large"}/>
        : <FoodInfoList foodInfos={menuInfo}/>;
}