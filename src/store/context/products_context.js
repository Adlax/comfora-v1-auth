import axios from "axios";
import { products_url as url } from "../../utils/constants";
import {
	SIDEBAR_CLOSE,
	SIDEBAR_OPEN,
	GET_PRODUCTS_BEGINS,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_PRODUCT_BEGINS,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_ERROR,
} from "../actions/actions_types";
import products_reducer from "../reducers/products_reducer";

const { createContext, useContext, useReducer, useEffect } = require("react");

const initialState = {
	isSidebarOpen: false,
	productsLoading: false,
	productsError: false,
	products: [],
	featuredProducts: [],
	product: {},
	productLoading: false,
	productError: false,
};

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(products_reducer, initialState);

	const openSidebarAction = () => {
		dispatch({ type: SIDEBAR_OPEN });
	};

	const closeSidebarAction = () => {
		dispatch({ type: SIDEBAR_CLOSE });
	};

	const fetchProductsAction = async (url) => {
		dispatch({ type: GET_PRODUCTS_BEGINS });
		try {
			const response = await axios.get(url);
			const products = response.data;
			dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
		} catch (error) {
			dispatch({ type: GET_PRODUCTS_ERROR });
			console.log(error);
		}
	};

	const fetchSingleProductAction = async (url) => {
		dispatch({ type: GET_PRODUCT_BEGINS });
		try {
			const response = await axios.get(url);
			const product = response.data;
			dispatch({ type: GET_PRODUCT_SUCCESS, payload: product });
		} catch (error) {
			dispatch({ type: GET_PRODUCT_ERROR });
		}
	};

	useEffect(() => {
		fetchProductsAction(url);
	}, []);

	const stateValue = {
		...state,
		openSidebarAction,
		closeSidebarAction,
		fetchSingleProductAction,
	};

	return <ProductsContext.Provider value={stateValue}>{children}</ProductsContext.Provider>;
};

export const useProductsContext = () => {
	return useContext(ProductsContext);
};
