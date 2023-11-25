import { ADD_TO_CART, CLEAR_CART, RECOUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from "../actions/actions_types";

const cart_reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			const { id, amount, color, product } = action.payload;
			const tempItem = state.cart.find((item) => item.id === id + color);
			if (tempItem) {
				const tempCart = state.cart.map((item) => {
					if (item.id === id + color) {
						let newAmount = item.amount + amount;
						if (newAmount > item.max) {
							newAmount = item.max;
						}
						return { ...item, amount: newAmount };
					}
					return item;
				});
				return { ...state, cart: tempCart };
			} else {
				const newItem = {
					id: id + color,
					name: product.name,
					color: color,
					amount,
					image: product.images[0].url,
					price: product.price,
					max: product.stock,
				};
				return { ...state, cart: [...state.cart, newItem] };
			}
		}
		case REMOVE_CART_ITEM: {
			const tempCart = state.cart.filter((item) => item.id !== action.payload);
			return { ...state, cart: tempCart };
		}
		case CLEAR_CART: {
			return { ...state, cart: [] };
		}
		case TOGGLE_CART_ITEM_AMOUNT: {
			const { id, value } = action.payload;
			const tempCart = state.cart.map((item) => {
				if (item.id === id) {
					if (value === "increase") {
						let newAmount = item.amount + 1;
						if (newAmount > item.max) {
							newAmount = item.max;
						}
						return { ...item, amount: newAmount };
					}
					if (value === "decrease") {
						let newAmount = item.amount - 1;
						if (newAmount < 1) {
							newAmount = 1;
						}
						return { ...item, amount: newAmount };
					}
				} else {
					return item;
				}
			});
			return { ...state, cart: tempCart };
		}
		case RECOUNT_CART_TOTALS: {
			const { totalItems, totalAmount } = state.cart.reduce(
				(acc, curr) => {
					const { amount, price } = curr;
					acc.totalItems += amount;
					acc.totalAmount += amount * price;
					return acc;
				},
				{ totalItems: 0, totalAmount: 0 }
			);
			return { ...state, totalItems, totalAmount };
		}
		default: {
			return { ...state };
		}
	}
};

export default cart_reducer;
