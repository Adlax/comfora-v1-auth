import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CheckoutPage, ErrorPage, HomePage, PrivateRoutePage as PrivateRoute, ProductsPage, SingleProductPage, CartPage, AboutPage, AuthWrapper } from "./pages";
import { Navbar, Sidebar, Footer } from "./components";

const App = () => {
	return (
		<AuthWrapper>
			<Router>
				<Navbar />
				<Sidebar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path="/products/:id" element={<SingleProductPage />} />
					<Route
						path="/checkout"
						element={
							<PrivateRoute>
								<CheckoutPage />
							</PrivateRoute>
						}
					/>
					<Route path="/*" element={<ErrorPage />} />
				</Routes>
				<Footer />
			</Router>
		</AuthWrapper>
	);
};

export default App;
