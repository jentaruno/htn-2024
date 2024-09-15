//import {BottomDrawerTrigger} from "../components/BottomDrawer";
import FoodInfoList from "../components/FoodInfoList";
import {useState} from "react";
import {useMenuScan} from "../data/MenuScanProvider";

export default function Page() {
    const [foodInfos, setFoodInfos] = useState([
        {
            "productName": "пшенная с маслом",
            "productNameTranslation": "millet with butter",
            "description": "millet porridge with butter",
            "possibleAllergens": [
                "Wheat",
                "Milk"
            ]
        }
    ]);
    const {menuInfo} = useMenuScan();

    return <FoodInfoList foodInfos={menuInfo}/>;
}