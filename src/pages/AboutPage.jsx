import React from "react";
import styled from "styled-components";
import { PageTitle } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const Wrapper = styled.section`
	display: grid;
	gap: 4rem;
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		height: 500px;
		object-fit: cover;
	}
	p {
		line-height: 2;
		max-width: 45em;
		margin: 0 auto;
		margin-top: 2rem;
		color: var(--clr-grey-5);
	}
	.title {
		text-align: left;
	}
	.underline {
		margin-left: 0;
	}
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
`;

const AboutPage = () => {
	return (
		<main>
			<PageTitle title="about" />
			<Wrapper className="page section section-center">
				<img src={aboutImg} alt="about-image" />
				<article>
					<div className="title">
						<h2>our story</h2>
						<div className="underline"></div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex error ea dolore inventore sunt molestiae laudantium impedit
							blanditiis ut minima nesciunt quibusdam nostrum perferendis, rem est sit eius atque quam. Rem repellat veritatis harum?
							Facilis repellendus quos ex neque consectetur, voluptatum ducimus harum, voluptatem exercitationem hic atque, iste similique
							natus?
						</p>
					</div>
				</article>
			</Wrapper>
		</main>
	);
};

export default AboutPage;
