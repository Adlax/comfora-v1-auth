import React, { useEffect } from "react";
import { useProductsContext } from "../store/context/products_context";
import { formatPrice } from "../utils/helper";
import { single_product_url as url } from "../utils/constants";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import { AddToCart, ProductImages, Stars } from "../components";

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
	}

	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`;

const SingleProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { fetchSingleProductAction, product, productLoading: loading, productError: error } = useProductsContext();

	useEffect(() => {
		fetchSingleProductAction(`${url}${id}`);
		// console.log(product);
	}, [id]);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [error]);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <Error />;
	}

	// console.log(product);
	const { name, price, description, stock, stars, reviews, id: sku, company, images } = product;

	return (
		<Wrapper>
			<PageTitle title={name} product />
			<div className="section section-center page">
				<Link to="/products" className="btn">
					back to products
				</Link>
				<div className="product-center">
					<ProductImages images={images} />
					<section className="content">
						<h2>{name}</h2>
						<Stars stars={stars} reviews={reviews} />
						<h5 className="price">{formatPrice(price)}</h5>
						<p className="description">{description}</p>
						<p className="info">
							<span>Available : </span>
							{stock > 0 ? "In stock" : "Out of stock"}
						</p>
						<p className="info">
							<span>SKU : </span>
							{sku}
						</p>
						<p className="info">
							<span>Brand : </span>
							{company}
						</p>
						<hr />
						{stock > 0 && <AddToCart product={product} />}
					</section>
				</div>
			</div>
		</Wrapper>
	);
};

export default SingleProductPage;
