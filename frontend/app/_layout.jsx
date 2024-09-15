import { Slot } from 'expo-router';
import {MenuScanProvider} from "../data/MenuScanProvider";

export default function Layout() {
    return (
        <MenuScanProvider>
            <Slot/>
        </MenuScanProvider>
    )
}