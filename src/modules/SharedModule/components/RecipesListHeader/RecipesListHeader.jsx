import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesListHeader() {
	const navigate = useNavigate();
	return (
		<>
			<div className="p-5 container-fluid recipeListHeader">
				<div className="row">
					<div className="col-md-6">
						<div className="mx-4">
							<h5>
								Fill the <span className="text-success">Recipes</span> !
							</h5>
							<p className="w-75">{}</p>
						</div>
					</div>
					<div className="text-md-end col-md-6">
						<button
							className="btn btn-success"
							onClick={() => navigate("/dashboard/recipes")}
						>
							All Recipes <i className="fa fa-arrow-right"></i>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
