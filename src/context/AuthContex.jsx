// Todo: shared context of data shared
// baseUrl
// header authorization
// logic of login data and jwt
//
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
	let requestHeaders = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	};
	let baseUrl = "https://upskilling-egypt.com:3006/api/v1";
	const [loginData, setLoginData] = useState(null);

	const saveLoginData = () => {
		let encodedToken = localStorage.getItem("token");
		let decodedToken = jwtDecode(encodedToken);
		// console.log(decodedToken);
		setLoginData(decodedToken);
	};

	useEffect(() => {
		if (localStorage.getItem("token")) {
			saveLoginData();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ loginData, requestHeaders, baseUrl, saveLoginData }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
