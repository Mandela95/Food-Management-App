import Header from "../../../SharedModule/components/Header/Header";
import homeAvatar from "../../../../assets/images/home-avatar.svg";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContex";
export default function Dashboard() {
	let { loginData } = useContext(AuthContext);

	return (
		<>
			<Header
				title={`Welcome ${loginData?.userName} !`}
				description="This is a welcoming screen for the entry of the application , you can now see the options"
				imageUrl={homeAvatar}
			/>
			<RecipesListHeader />
		</>
	);
}
