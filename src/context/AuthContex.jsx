import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

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

	function logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		toast.success("Logged Out successfully");
		Navigate("/login");
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			saveLoginData();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{ loginData, requestHeaders, baseUrl, saveLoginData, logout }}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
