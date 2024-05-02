import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import recipesImg from "../../../../assets/images/header.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import axios from "axios";

export default function RecipesList() {
	const [recipesList, setRecipesList] = useState([]);

	console.log(recipesList);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getRecipesList = async () => {
		try {
			let response = await axios.get(
				"https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			// console.log(response.data.data);
			setRecipesList(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRecipesList();
	}, []);

	return (
		<>
			<Header
				title="Recipes Items"
				description={
					"You can now add your items that any user can order it from the Application and you can edit"
				}
				imageUrl={recipesImg}
			/>
			<div className="container">
				<div className="row">
					<div className="p-3 col-6">
						<h4>Recipes Table Details</h4>
						<span>You can check all details</span>
					</div>
					<div className="px-0 py-4 col-6 d-flex justify-content-end">
						<button className="py-3 btn btn-success">Add New Recipe</button>
					</div>
				</div>
			</div>

			<table className="table p-2 m-3">
				<thead>
					<tr className="text-muted">
						<th scope="col">No.</th>
						<th scope="col">Item Name</th>
						<th scope="col">Image</th>
						<th scope="col">Price</th>
						<th scope="col">Description</th>
						<th scope="col">category</th>
						<th scope="col">Tag</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{recipesList.length > 0 ? (
						recipesList.map((item, index) => (
							<tr key={item.id}>
								<th scope="row">{index + 1}</th>
								<td>{item.name}</td>
								<td>{item.imagePath}</td>
								<td>{item.price}</td>
								<td>{item.description}</td>
								{/* <td>{item?.category[0].name}</td> */}
								<td>{item.tag.name}</td>
								<td>
									<i
										role="button"
										className="me-3 fa fa-edit text-primary"
										title="edit"
									></i>
									<i
										role="button"
										className="text-danger fa fa-trash"
										title="delete"
									></i>
								</td>
							</tr>
						))
					) : (
						<td colSpan={4}>
							<NoData />
						</td>
					)}
				</tbody>
			</table>
		</>
	);
}
