import {createContext, useContext, useEffect, useState} from "react";

const GET_INFO_API_LINK = "localhost:8000/"
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

    async function fetchFoodInfo(image) {
        try {
            const response = await fetch(
                GET_INFO_API_LINK,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: image
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch food info");
            }
            const data = await response.json();
            setFoodInfo(data);
            console.log(data);
        } catch (e) {
            throw Error("Failed to fetch user data: ", e);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const handleScanImage = async () => {
            try {
                await fetchFoodInfo(menuImage.base64);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        handleScanImage();
    }, [menuImage]);

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
