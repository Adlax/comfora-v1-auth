import { useContext, useEffect, useReducer } from "react";
import cart_reducer from "../reducers/cart_reducer";
import { ADD_TO_CART, CLEAR_CART, RECOUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from "../actions/actions_types";

const { createContext } = require("react");

const getCartFromLocalStorage = () => {
	if (localStorage.getItem("cart")) {
		return JSON.parse(localStorage.getItem("cart"));
	} else {
		return [];
	}
};

const initialState = {
	cart: getCartFromLocalStorage(),
	totalItems: 0,
	totalAmount: 0,
	shippingFee: 500,
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cart_reducer, initialState);

	const addToCartAction = (id, color, amount, product) => {
		console.log(id, color, amount, product);
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	};

	const removeFromCartAction = (id) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: id });
	};

	const toggleAmountAction = (id, value) => {
		console.log(id, value);
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
	};

	const clearCartAction = () => {
		dispatch({ type: CLEAR_CART });
	};

	useEffect(() => {
		dispatch({ type: RECOUNT_CART_TOTALS });
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

	const stateValue = {
		...state,
		addToCartAction,
		removeFromCartAction,
		toggleAmountAction,
		clearCartAction,
	};

	return <CartContext.Provider value={stateValue}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
	return useContext(CartContext);
};
