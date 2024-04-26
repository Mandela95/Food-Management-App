import "./App.css";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ForgetPass from "./modules/AuthenticationModule/components/forgetpass/ForgetPass";
import Login from "./modules/AuthenticationModule/components/login/Login";
import Register from "./modules/AuthenticationModule/components/register/Register";
import ResetPass from "./modules/AuthenticationModule/components/resetpass/ResetPass";
import CategoriesList from "./modules/CategoriesModule/components/CategoriesList/CategoriesList";
import Dashboard from "./modules/HomeModule/components/Dashboard/Dashboard";
import RecipesList from "./modules/RecipesModule/components/RecipesList/RecipesList";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";

function App() {
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

	// could be router like documentation or routes
	const routes = createBrowserRouter([
		{
			path: "dashboard",
			element: (
				<ProtectedRoute loginData={loginData}>
					<MasterLayout loginData={loginData} />
				</ProtectedRoute>
			),
			errorElement: <NotFound />,
			children: [
				// { index: true, element: <Dashboard /> },
				{ path: "", element: <Dashboard /> },
				{ path: "dashboard", element: <Dashboard /> },
				{ path: "home", element: <Dashboard /> },
				{ path: "recipes", element: <RecipesList /> },
				{ path: "users", element: <UsersList /> },
				{ path: "categories", element: <CategoriesList /> },
			],
		},
		{
			path: "/",
			element: <AuthLayout />,
			errorElement: <NotFound />,
			children: [
				{ path: "", element: <Login saveLoginData={saveLoginData} /> },
				{ path: "login", element: <Login saveLoginData={saveLoginData} /> },
				{ path: "register", element: <Register /> },
				{ path: "forgetpass", element: <ForgetPass /> },
				{ path: "resetpass", element: <ResetPass /> },
			],
		},
	]);

	return (
		<>
			<ToastContainer />
			<RouterProvider router={routes}></RouterProvider>
		</>
	);
}

export default App;
