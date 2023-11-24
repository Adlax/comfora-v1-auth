const formatPrice = (price) => {
	const newPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price / 100);
	return newPrice;
};

const getUniqueValues = (array, property) => {
	let newArray = array.map((item) => item[property]);
	if (property === "colors") {
		newArray = newArray.flat();
	}
	// console.log(newArray);
	const set = new Set([...newArray]);
	const result = ["all", ...set];
	return result;
};
export { formatPrice, getUniqueValues };
