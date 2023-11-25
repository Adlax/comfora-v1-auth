import React from "react";
import { PageTitle, StripeCheckout } from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCartContext } from "../store/context/cart_context";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.empty {
		text-align: center;
	}
`;

const CheckoutPage = () => {
	const { cart } = useCartContext();
	return (
		<main>
			<PageTitle title="checkout" />
			<Wrapper className="page">
				{cart.length < 1 ? (
					<div className="empty">
						<h2>Your cart is empty</h2>
						<Link to="/products" className="btn">
							Fill it
						</Link>
					</div>
				) : (
					<StripeCheckout />
				)}
			</Wrapper>
		</main>
	);
};

export default CheckoutPage;
