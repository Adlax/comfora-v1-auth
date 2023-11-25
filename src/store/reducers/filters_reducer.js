import { LOAD_PRODUCTS, SET_GRID_VIEW, SET_LIST_VIEW, SORT_PRODUCTS, UPDATE_SORT, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from "../actions/actions_types";

const filters_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_PRODUCTS: {
			let prices = action.payload.map((prod) => prod.price);
			let maxPrice = Math.max(...prices);
			let minPrice = Math.min(...prices);
			return {
				...state,
				products: [...action.payload],
				filteredProducts: [...action.payload],
				filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
			};
		}
		case SET_GRID_VIEW: {
			return { ...state, gridView: true };
		}
		case SET_LIST_VIEW: {
			return { ...state, gridView: false };
		}
		case UPDATE_SORT: {
			return { ...state, sort: action.payload };
		}
		case SORT_PRODUCTS: {
			const { sort, filteredProducts } = state;
			let tempProducts = [...filteredProducts];
			if (sort === "price-lowest") {
				tempProducts = tempProducts.sort((prod1, prod2) => prod1.price - prod2.price);
			}
			if (sort === "price-highest") {
				tempProducts = tempProducts.sort((prod1, prod2) => prod2.price - prod1.price);
			}
			if (sort === "name-a") {
				tempProducts = tempProducts.sort((prod1, prod2) => {
					return prod1.name.localeCompare(prod2.name);
				});
			}
			if (sort === "name-z") {
				tempProducts = tempProducts.sort((prod1, prod2) => {
					return prod2.name.localeCompare(prod1.name);
				});
			}
			return { ...state, filteredProducts: tempProducts };
		}
		case UPDATE_FILTERS: {
			const { name, value } = action.payload;
			return { ...state, filters: { ...state.filters, [name]: value } };
		}
		case FILTER_PRODUCTS: {
			// console.log("REDUCER : filter products");
			const { products } = state;
			const { text, category, company, color, price, shipping } = state.filters;
			let tempProducts = [...products];
			if (text) {
				tempProducts = tempProducts.filter((prod) => prod.name.toLowerCase().startsWith(text));
			}
			if (category !== "all") {
				tempProducts = tempProducts.filter((prod) => prod.category === category);
			}
			if (company !== "all") {
				tempProducts = tempProducts.filter((prod) => prod.company === company);
			}
			if (color !== "all") {
				// includes or find ?
				tempProducts = tempProducts.filter((prod) => prod.colors.includes(color));
				// tempProducts = tempProducts.filter((prod) => prod.colors.find((col) => col === color));
			}
			if (price) {
				tempProducts = tempProducts.filter((prod) => prod.price <= price);
			}
			if (shipping) {
				tempProducts = tempProducts.filter((prod) => prod.shipping);
			}
			return { ...state, filteredProducts: tempProducts };
		}
		case CLEAR_FILTERS: {
			return {
				...state,
				filters: { ...state.filters, text: "", company: "all", category: "all", color: "all", price: state.filters.maxPrice, shipping: false },
			};
		}
		default: {
			return { ...state };
		}
	}
};

export default filters_reducer;
