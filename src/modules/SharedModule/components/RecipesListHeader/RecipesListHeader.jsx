import { useNavigate } from "react-router-dom";

export default function RecipesListHeader() {
	const navigate = useNavigate();
	return (
		<>
			<div className="p-3 p-md-5 container-fluid recipeListHeader">
				<div className="row align-items-center">
					<div className="col-12 col-sm-6 mb-3 mb-sm-0">
						<div className="mx-2 mx-md-4">
							<h5>
								Fill the <span className="text-success">Recipes</span> !
							</h5>
						</div>
					</div>
					<div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end align-items-center">
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
