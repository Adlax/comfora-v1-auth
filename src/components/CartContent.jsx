import React from "react";
import styled from "styled-components";
import { useCartContext } from "../store/context/cart_context";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import CartTotals from "./CartTotals";

const Wrapper = styled.section`
	.link-container {
		display: flex;
		justify-content: space-between;
		margin-top: 2rem;
	}
	.link-btn {
		background: transparent;
		border-color: transparent;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
		background: var(--clr-primary-5);
		color: var(--clr-white);
		border-radius: var(--radius);
		letter-spacing: var(--spacing);
		font-weight: 400;
		cursor: pointer;
	}
	.clear-btn {
		background: var(--clr-black);
	}
`;

const CartContent = () => {
	const { cart, clearCartAction } = useCartContext();

	return (
		<Wrapper className="section section-center">
			<CartColumns />
			{cart.map((cartItem) => {
				return <CartItem key={cartItem.id} {...cartItem} />;
			})}
			<hr />
			<div className="link-container">
				<Link to="/products" className="link-btn">
					continue shopping
				</Link>
				<button type="button" className="link-btn clear-btn" onClick={clearCartAction}>
					clear cart
				</button>
			</div>
			<CartTotals />
		</Wrapper>
	);
};

export default CartContent;
