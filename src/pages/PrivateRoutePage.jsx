import React from "react";
import { useUserContext } from "../store/context/user_context";
import { Navigate } from "react-router-dom";

const PrivateRoutePage = ({ children }) => {
	const { myUser, loginWithRedirect } = useUserContext();
	if (!myUser) {
		return <Navigate to="/" />;
	}
	return children;
};

export default PrivateRoutePage;
