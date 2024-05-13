import { useState, useEffect } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import favoritesImg from "../../../../assets/images/header.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import axios from "axios";
import { toast } from "react-toastify";

export default function FavoriteList() {
	let [favsList, setFavsList] = useState([]);

	const baseUrl = "https://upskilling-egypt.com:3006/";
	const getFavsList = async () => {
		try {
			let response = await axios.get(
				`https://upskilling-egypt.com:3006/api/v1/userRecipe/?pageSize=10&pageNumber=1`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			setFavsList(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const removeFromFavorite = async (fav) => {
		try {
			let response = await axios.delete(
				`https://upskilling-egypt.com:3006/api/v1/userRecipe/${fav.id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			toast.success("Recipe Removed from Favourites");
			console.log(response);
			getFavsList();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getFavsList();
	}, []);

	return (
		<>
			<Header
				title="Favorite Items"
				description={
					"You can now add your items that any user can order it from the Application and you can edit"
				}
				imageUrl={favoritesImg}
			/>
			{/* search inputs */}
			<div className="my-3 filtration">
				<div className="row">
					<div className="col-md-6">
						<input
							type="text"
							placeholder="Search here..."
							className="form-control"
						/>
					</div>
					<div className="col-md-3">
						<select className="form-control">
							<option>Plan Type</option>
						</select>
					</div>
					<div className="col-md-3">
						<select className="form-control">
							<option>Plan Price</option>
						</select>
					</div>
				</div>
			</div>
			{/* favorites card */}
			<div className="container mt-md-5">
				<div className="row">
					{favsList.length > 0 ? (
						favsList.map((fav) => (
							<div key={fav.id} className="col-xl-3 col-lg-4 col-md-6">
								<div className="border border-2 shadow position-relative w-100 mb-md-5 rounded-3 text-start bg-light">
									<img
										className="rounded w-100"
										height={300}
										src={baseUrl + fav.recipe.imagePath}
										alt="no image"
									/>
									<div className="top-0 px-1 m-2 position-absolute end-0 bg-body rounded-2">
										<div
											onClick={() => removeFromFavorite(fav)}
											className="bg-white rounded"
											data-toggle="tooltip"
											data-placement="top"
											title="Remove from Favourites"
										>
											<i role="button" className="fa fa-heart text-success"></i>
										</div>
									</div>
									<h6 className="m-3">{`Name: ${fav.recipe.name}`}</h6>
									<p className="m-3">{`Description: ${fav.recipe.description}`}</p>
								</div>
							</div>
						))
					) : (
						<NoData />
					)}
				</div>
			</div>
		</>
	);
}
