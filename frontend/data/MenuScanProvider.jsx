import {createContext, useContext, useEffect, useState} from "react";

const MenuScanContext = createContext(undefined);

export function useMenuScan () {
    const context = useContext(MenuScanContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function MenuScanProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [menuImage, setMenuImage] = useState(null);
    const [foodInfo, setFoodInfo] = useState(null);

    const value = {
        menuImage,
        setMenuImage,
        foodInfo,
        setFoodInfo
    };

    return (
        <MenuScanContext.Provider value={value}>
            {!isLoading && children}
        </MenuScanContext.Provider>
    );
}
