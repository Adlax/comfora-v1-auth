import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { useFiltersContext } from "../store/context/filters_context";

const ProductsList = () => {
	const { filteredProducts: products, gridView } = useFiltersContext();

	if (products.length < 1) {
		return <h5 style={{ textTransform: "none" }}>Sorry, no products match your criteria...</h5>;
	}

	if (gridView === false) {
		return <ListView products={products} />;
	}

	return <GridView products={products} />;
};

export default ProductsList;
