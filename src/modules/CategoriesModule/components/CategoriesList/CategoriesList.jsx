import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import categoriesImg from "../../../../assets/images/recipes.png";
export default function CategoriesList() {
	return (
		<>
			<Header
				title="Categories Item"
				description="You can now add your items that any user can order it from the Application and you can edit"
				imageUrl={categoriesImg}
			/>
		</>
	);
}
