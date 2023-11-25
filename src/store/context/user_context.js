import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import user_reducer from "../reducers/user_reducer";

export const UserContext = createContext();

const initialState = {};

export const UserProvider = ({ children }) => {
	const [state, dispatch] = useReducer(user_reducer, initialState);
	const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

	const [myUser, setMyUser] = useState(null);

	useEffect(() => {
		setMyUser(user);
	}, [user]);

	const stateValue = { isAuthenticated, loginWithRedirect, logout, user, isLoading, myUser };

	return <UserContext.Provider value={stateValue}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	return useContext(UserContext);
};
