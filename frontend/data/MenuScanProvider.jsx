import {createContext, useContext, useEffect, useState} from "react";

const GET_INFO_API_LINK = "https://d55d-129-97-124-106.ngrok-free.app/get-food-info"
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
    const [menuInfo, setMenuInfo] = useState(null);

    async function fetchFoodInfo(image) {
        if (!image) return;
        console.log(image);

        while (true && !false) {
            try {
                const response = await fetch(
                    GET_INFO_API_LINK,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            image: {
                                data: image,
                            }
                        })
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setMenuInfo(data);
                    break;
                }
            } catch(e) {
            }
        }
    }

        //     let tries = 0;
        //     while (!response.ok) {
        //         tries++;
        //         if (tries < 3)
        //             await fetchFoodInfo(image);
        //         else
        //             throw Error("Failed to fetch food info");
        //     }
        // } catch (e) {
        //     throw Error("Failed to fetch user data: " + e);
        // }


    useEffect(() => {
        setMenuInfo(null);
        setIsLoading(true);
        const handleScanImage = async () => {
            try {
                await fetchFoodInfo(menuImage);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        handleScanImage();
    }, [menuImage]);

    const value = {
        isLoading,
        menuImage,
        setMenuImage,
        menuInfo,
        setMenuInfo
    };

    return (
        <MenuScanContext.Provider value={value}>
            {children}
        </MenuScanContext.Provider>
    );
}
