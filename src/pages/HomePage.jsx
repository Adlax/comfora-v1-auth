import React from "react";
import { FeaturedProducts, Portrait, Services, Contact } from "../components";

const HomePage = () => {
	return (
		<main>
			<Portrait />
			<FeaturedProducts />
			<Services />
			<Contact />
		</main>
	);
};

export default HomePage;
