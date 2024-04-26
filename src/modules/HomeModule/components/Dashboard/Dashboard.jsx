import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import homeAvatar from "../../../../assets/images/home-avatar.svg";
export default function Dashboard() {
	return (
		<>
			<Header
				title="Welcome Upskilling !"
				description="This is a welcoming screen for the entry of the application , you can now see the options"
				imageUrl={homeAvatar}
			/>
		</>
	);
}
