import React from "react";
import styled from "styled-components";
import { useFiltersContext } from "../store/context/filters_context";
import { formatPrice, getUniqueValues } from "../utils/helper";
import { FaCheck } from "react-icons/fa";

const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
			margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}

	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 0.5rem;
			color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
		max-width: 200px;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
			position: sticky;
			top: 1rem;
		}
	}
`;

const Filters = () => {
	const { updateFiltersAction, clearFiltersAction, filters, products } = useFiltersContext();
	const { text, company, category, color, minPrice, maxPrice, price, shipping } = filters;

	const categories = getUniqueValues(products, "category");
	const companies = getUniqueValues(products, "company");
	const colors = getUniqueValues(products, "colors");

	// console.log(colors);

	return (
		<Wrapper>
			<div className="content">
				<form onSubmit={(evt) => evt.preventDefault()}>
					<div className="form-control">
						<input
							type="text"
							name="text"
							placeholder="Search a product"
							className="search-input"
							value={text}
							onChange={updateFiltersAction}
						/>
					</div>
					<div className="form-control">
						<h5>Category</h5>
						<div>
							{categories.map((cat, index) => {
								return (
									<button
										key={index}
										onClick={updateFiltersAction}
										name="category"
										type="button"
										className={cat.toLowerCase() === category ? "active" : null}
									>
										{cat}
									</button>
								);
							})}
						</div>
					</div>
					<div className="form-control">
						<h5>Company</h5>
						<select name="company" id="company" value={company} onChange={updateFiltersAction} className="company">
							{companies.map((comp, index) => {
								return (
									<option key={index} value={comp}>
										{comp}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-control">
						<h5>colors</h5>
						<div className="colors">
							{colors.map((col, index) => {
								if (col === "all") {
									return (
										<button
											key={index}
											name="color"
											data-color="all"
											onClick={updateFiltersAction}
											className={color === "all" ? "all-btn active" : "all-btn"}
										>
											All
										</button>
									);
								}
								return (
									<button
										key={index}
										name="color"
										style={{ backgroundColor: col }}
										className={col === color ? "color-btn active" : "color-btn"}
										data-color={col}
										onClick={updateFiltersAction}
									>
										{col === color ? <FaCheck /> : null}
									</button>
								);
							})}
						</div>
					</div>
					<div className="form-control">
						<h5>Price</h5>
						<p className="price">{formatPrice(price)}</p>
						<input type="range" name="price" onChange={updateFiltersAction} min={minPrice} max={maxPrice} value={price} />
					</div>
					<div className="form-control shipping">
						<label htmlFor="shipping">free shipping</label>
						<input type="checkbox" name="shipping" id="shipping" onChange={updateFiltersAction} checked={shipping} />
					</div>
				</form>
				<button type="button" className="clear-btn" onClick={clearFiltersAction}>
					clear filters
				</button>
			</div>
		</Wrapper>
	);
};

export default Filters;