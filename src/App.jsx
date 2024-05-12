import "./App.css";

import { createHashRouter, Navigate, RouterProvider } from "react-router-dom";
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
import RecipeData from "./modules/RecipesModule/components/RecipeData/RecipeData";
import VerifyAccount from "./modules/AuthenticationModule/components/VerifyAccount/VerifyAccount";
import FavoriteList from "./modules/FavoritesModule/components/FavoriteList/FavoriteList";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContex";

function App() {
	let { loginData, saveLoginData } = useContext(AuthContext);
	// could be router like documentation or routes
	const routes = createHashRouter([
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
				{ path: "recipeData", element: <RecipeData /> },
				{
					path: "users",
					element:
						loginData && loginData.userGroup === "SuperAdmin" ? (
							<UsersList />
						) : (
							<Navigate to="/login" />
						),
				},
				{
					path: "categories",
					element:
						loginData && loginData.userGroup === "SuperAdmin" ? (
							<CategoriesList />
						) : (
							<Navigate to="/login" />
						),
				},
				{
					path: "favorites",
					element:
						loginData && loginData.userGroup === "SystemUser" ? (
							<FavoriteList />
						) : (
							<Navigate to="/login" />
						),
				},
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
				{ path: "verifyAccount", element: <VerifyAccount /> },
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
