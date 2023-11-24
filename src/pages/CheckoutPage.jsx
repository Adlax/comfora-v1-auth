import React from "react";
import { PageTitle } from "../components";
import styled from "styled-components";

const Wrapper = styled.div``;

const CheckoutPage = () => {
	return (
		<main>
			<PageTitle title="checkout" />
			<Wrapper className="page">
				<h1>checkout</h1>
			</Wrapper>
		</main>
	);
};

export default CheckoutPage;
