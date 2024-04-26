import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import usersImg from "../../../../assets/images/recipes.png";

export default function UsersList() {
	return (
		<>
			<Header
				title="Users List"
				description="You can now add your items that any user can order it from the Application and you can edit"
				imageUrl={usersImg}
			/>
		</>
	);
}
