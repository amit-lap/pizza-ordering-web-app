import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a new context for the cart
const CartContext = createContext();

/**
 * Provider component for managing the cart state and operations.
 * @param {object} children - React components to be wrapped by the provider.
 */
export const CartProvider = ({ children }) => {
    // State variables for managing cart, selected pizza, order details, and ingredients
    const [cart, setCart] = useState([]); // Array to hold pizzas in the cart
    const [selectedPizza, setSelectedPizza] = useState({ ingredients: [], price: 10 }); // State for the currently selected pizza
    const [orderDetails, setOrderDetails] = useState(null); // State to hold order details
    const [ingredients, setIngredients] = useState([]); // Array to hold ingredients

    // Fetch ingredients from the API when the component mounts
    useEffect(() => {
        fetch('/api/ingredients')
            .then(response => response.json())
            .then(data => setIngredients(data))
            .catch(error => console.error('Error fetching ingredients:', error));
    }, []);

    /**
     * Adds a pizza to the cart.
     * @param {object} pizza - The pizza object to add to the cart.
     */
    const addToCart = (pizza) => {
        setCart([...cart, pizza]);
    };

    /**
     * Removes a pizza from the cart based on its index.
     * @param {number} index - The index of the pizza to remove.
     */
    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    /**
     * Updates a pizza in the cart at a specific index with new data.
     * @param {number} index - The index of the pizza to update.
     * @param {object} updatedPizza - The updated pizza object.
     */
    const updatePizzaInCart = (index, updatedPizza) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            updatedCart[index] = updatedPizza;
            return updatedCart;
        });
    };

    /**
     * Clears all pizzas from the cart.
     */
    const clearCart = () => {
        setCart([]);
    };

    // Render the provider with the provided values
    return (
        <CartContext.Provider value={{
            cart, // Current state of the cart
            addToCart, // Function to add a pizza to the cart
            removeFromCart, // Function to remove a pizza from the cart
            updatePizzaInCart, // Function to update a pizza in the cart
            clearCart, // Function to clear the cart
            selectedPizza, // Current selected pizza
            setSelectedPizza, // Function to set the selected pizza
            orderDetails, // Current order details
            setOrderDetails, // Function to set the order details
            ingredients, // Current list of ingredients
            setIngredients // Function to set the list of ingredients
        }}>
            {children} {/* Render children components wrapped by the provider */}
        </CartContext.Provider>
    );
};

/**
 * Custom hook to access the cart context values within components.
 * @returns {object} - Cart context values and functions.
 */
export const useCart = () => {
    return useContext(CartContext);
};
