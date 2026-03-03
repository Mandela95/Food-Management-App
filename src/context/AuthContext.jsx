import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "ldrs/lineSpinner";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
	let requestHeaders = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	};
	let baseUrl = "https://upskilling-egypt.com:3006/api/v1";
	const [loginData, setLoginData] = useState(null);

	const loading = () => {
		return (
			<l-line-spinner
				size="40"
				stroke="3"
				speed="1"
				color="#009247"
			></l-line-spinner>
		);
	};

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
			value={{
				loginData,
				requestHeaders,
				baseUrl,
				saveLoginData,
				logout,
				loading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
