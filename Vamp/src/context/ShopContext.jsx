/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
const ShopContext = createContext();

function ShopContextProvider({ children }) {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    async function addToCart(itemId, size) {

        if (!size) {
            toast.error('Select Product Size')
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;

            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    }

    function getCartCount() {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }

                } catch (error) {

                }
            }

        }
        return totalCount;

    }

    async function updateQuantity(itemId, size, quantity) {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    function getCartAmount() {
        let totalAmount = 0;
        for (const items in cartItems) {

            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }

        }
        return totalAmount;

    }

    return <ShopContext.Provider
        const value={{
            products,
            currency,
            delivery_fee,
            search,
            setSearch,
            showSearch,
            setShowSearch,
            cartItems,
            addToCart,
            getCartCount,
            updateQuantity,
            getCartAmount
        }}
    >
        {children}

    </ShopContext.Provider>
}


function useShop() {
    const context = useContext(ShopContext);

    if (context === undefined) {
        throw new Error("ShopContext  was used outside the ShopcontextProvider");
    }

    return context;
}
export { ShopContextProvider, useShop };