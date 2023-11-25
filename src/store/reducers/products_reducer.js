import {
	SIDEBAR_OPEN,
	SIDEBAR_CLOSE,
	GET_PRODUCTS_BEGINS,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_ERROR,
	GET_PRODUCT_BEGINS,
	GET_PRODUCT_SUCCESS,
	GET_PRODUCT_ERROR,
} from "../actions/actions_types";

const products_reducer = (state, action) => {
	switch (action.type) {
		case SIDEBAR_OPEN: {
			return { ...state, isSidebarOpen: true };
		}
		case SIDEBAR_CLOSE: {
			return { ...state, isSidebarOpen: false };
		}
		case GET_PRODUCTS_BEGINS: {
			return { ...state, productsLoading: true };
		}
		case GET_PRODUCTS_SUCCESS: {
			const featuredProducts = action.payload.filter((product) => product.featured === true);
			return { ...state, productsLoading: false, products: action.payload, featuredProducts };
		}
		case GET_PRODUCTS_ERROR: {
			return { ...state, productsLoading: false, productsError: true };
		}
		case GET_PRODUCT_BEGINS: {
			return { ...state, productLoading: true, productError: false };
		}
		case GET_PRODUCT_SUCCESS: {
			return { ...state, product: action.payload, productLoading: false };
		}
		case GET_PRODUCT_ERROR: {
			return { ...state, productLoading: false, productError: true };
		}
		default: {
			return state;
		}
	}
};

export default products_reducer;
