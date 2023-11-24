import React from "react";
import styled from "styled-components";
import { Filters, PageTitle, ProductsList, Sort } from "../components";

const Wrapper = styled.div`
	.products {
		display: grid;
		gap: 3rem 1.5rem;
		margin: 4rem auto;
	}
	@media (min-width: 768px) {
		.products {
			grid-template-columns: 200px 1fr;
		}
	}
`;

const ProductsPage = () => {
	return (
		<main>
			<PageTitle title="products" />
			<Wrapper className="page">
				<div className="section-center products">
					<Filters />
					<div>
						<Sort />
						<ProductsList />
					</div>
				</div>
			</Wrapper>
		</main>
	);
};

export default ProductsPage;
