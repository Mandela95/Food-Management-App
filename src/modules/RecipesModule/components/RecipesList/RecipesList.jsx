import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import recipesImg from "../../../../assets/images/recipes.png";

export default function RecipesList() {
	return (
		<>
			<Header
				title="Recipes Items"
				description={
					"You can now add your items that any user can order it from the Application and you can edit"
				}
				imageUrl={recipesImg}
			/>
		</>
	);
}
