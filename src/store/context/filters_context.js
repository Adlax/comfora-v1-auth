import { createContext, useContext, useEffect, useReducer, useState } from "react";
import filters_reducer from "../reducers/filters_reducer";
import { useProductsContext } from "./products_context";
import { LOAD_PRODUCTS, SET_GRID_VIEW, SET_LIST_VIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from "../actions/actions_types";

export const filtersInitialState = {
	text: "",
	company: "all",
	category: "all",
	color: "all",
	minPrice: 0,
	maxPrice: 0,
	price: 0,
	shipping: false,
};

const initialState = {
	filteredProducts: [],
	products: [],
	gridView: false,
	sort: "price-lowest",
	filters: filtersInitialState,
};

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
	const [state, dispatch] = useReducer(filters_reducer, initialState);
	const { products } = useProductsContext();

	const setGridViewAction = () => {
		dispatch({ type: SET_GRID_VIEW });
	};

	const setListViewAction = () => {
		dispatch({ type: SET_LIST_VIEW });
	};

	const updateSortAction = (evt) => {
		const value = evt.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	const updateFiltersAction = (evt) => {
		let name = evt.target.name;
		let value = evt.target.value;
		console.log(name, value);
		if (name === "category") {
			value = evt.target.textContent;
		}
		if (name === "color") {
			value = evt.target.dataset.color;
		}
		if (name === "price") {
			value = Number(value);
		}
		if (name === "shipping") {
			value = evt.target.checked;
		}
		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const clearFiltersAction = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]);

	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [products, state.sort, state.filters]);

	const stateValue = {
		...state,
		setGridViewAction,
		setListViewAction,
		updateSortAction,
		updateFiltersAction,
		clearFiltersAction,
	};

	return <FiltersContext.Provider value={stateValue}>{children}</FiltersContext.Provider>;
};

export const useFiltersContext = () => {
	return useContext(FiltersContext);
};
