import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import recipesImg from "../../../../assets/images/header.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
useNavigate;

export default function RecipesList() {
	const navigate = useNavigate();
	const [recipesList, setRecipesList] = useState([]);
	const [categoriesList, setCategoriesList] = useState([]);
	const [tagsList, setTagsList] = useState([]);
	const [recipeId, setRecipeId] = useState();
	const [userData, setUserData] = useState(null);

	const [nameValue, setNameValue] = useState("");
	const [catValue, setCatValue] = useState("");
	const [tagValue, setTagValue] = useState("");

	const [arrayOfPages, setArrayOfPages] = useState([]);

	const [showDelete, setShowDelete] = useState(false);

	let {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleDeleteClose = () => setShowDelete(false);
	const handleDeleteShow = (id) => {
		setRecipeId(id);
		setShowDelete(true);
	};
	const [show, setShow] = useState(false);
	const [SelectedRecipeImage, setSelectedRecipeImage] = useState("");
	const [SelectedRecipeDesc, setSelectedRecipeDesc] = useState("");
	const [SelectedRecipe, setSelectedRecipe] = useState(null);
	const [showView, setShowView] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleViewClose = () => setShowView(false);

	const handleViewShow = (item) => {
		setSelectedRecipe(item);
		setSelectedRecipeImage(
			"https://upskilling-egypt.com:3006/" + item.imagePath
		);
		setSelectedRecipeDesc(item.description);
		setRecipeId(item.id);
		setShowView(true);
	};

	const onViewSubmit = async () => {
		try {
			setLoading(true);
			await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/userRecipe/",
				{ recipeId: recipeId },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			toast.success("Added to Favourites");
			console.log("Recipe Added To Favorite Successfully!");
		} catch (error) {
			console.error("Error favoriting recipe:", error);
		} finally {
			setLoading(false);
			handleViewClose();
		}
	};

	const [showUpdate, setShowUpdate] = useState(false);
	const handleUpdateClose = () => setShowUpdate(false);
	const handleUpdateShow = (item) => {
		setRecipeId(item);
		setShowUpdate(true);
	};

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);

	const goToRecipeData = () => {
		navigate("/dashboard/recipeData");
	};

	//  get recipes list
	const getRecipesList = async (name, tagId, catId, pageSize, pageNumber) => {
		try {
			let response = await axios.get(
				`https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					params: {
						name: name,
						tagId: tagId,
						categoryId: catId,
					},
				}
			);
			setArrayOfPages(
				Array(response.data.totalNumberOfPages)
					.fill()
					.map((_, i) => i + 1)
			);
			console.log(arrayOfPages);
			// console.log(response.data.data);
			setRecipesList(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	//AppendToUpdate
	const appendToFormData = (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("price", data.price);
		formData.append("tagId", data.tagId);
		formData.append("recipeImage", data.recipeImage[0]);
		formData.append("categoriesIds", data.categoriesIds);
		return formData;
	};

	//update submit
	const onUpdateSubmit = async (data) => {
		let recipeFormData = appendToFormData(data);
		try {
			let response = await axios.put(
				`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
				recipeFormData,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			);
			toast.success("Recipe Updated");
			handleUpdateClose();
			getRecipesList();
			console.log(response);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	// ⭐ delete recipe cruD - delete⭐
	const onDeleteSubmit = async () => {
		try {
			let response = await axios.delete(
				`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			handleDeleteClose();
			toast.success(`Category deleted successfully`);
			getRecipesList();
		} catch (error) {
			console.log(error);
		}
	};

	// get categories list
	const getCategoriesList = async () => {
		try {
			let response = await axios.get(
				"https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			setCategoriesList(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	// get tags list
	const getTagsList = async () => {
		try {
			let response = await axios.get(
				"https://upskilling-egypt.com:3006/api/v1/tag",
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			// console.log(response.data);
			setTagsList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getNameValue = (input) => {
		setNameValue(input.target.value);
		getRecipesList(input.target.value, tagValue, catValue, 5, 1);
	};

	const getTagValue = (input) => {
		setTagValue(input.target.value);
		getRecipesList(nameValue, input.target.value, catValue, 5, 1);
	};

	const getCategoryValue = (input) => {
		setCatValue(input.target.value);
		getRecipesList(nameValue, tagValue, input.target.value, 5, 1);
	};

	useEffect(() => {
		getRecipesList("", "", "", 5, 1);
		getCategoriesList();
		getTagsList();
		setUserData(JSON.parse(localStorage.getItem("userData")));
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
			<Modal show={showDelete} onHide={handleDeleteClose}>
				<Modal.Header className="mb-4 border-bottom-0" closeButton>
					<Modal.Title>Delete Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeleteData deleteItem={"Recipe"} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={onDeleteSubmit}>
						Delete this item
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal for update */}

			<Modal show={showUpdate} onHide={handleUpdateClose}>
				<Modal.Header closeButton>
					<h3>Update Recipe</h3>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(onUpdateSubmit)} className="my-4">
						<div className="row justify-content-center">
							<div className="text-center col-md-6">
								<img className="" src={recipesImg} alt="no img" />
							</div>
						</div>
						<div className="mb-3 input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Recipe name"
								{...register("name", {
									required: "Name is required",
								})}
							/>
						</div>
						{errors.name && (
							<p className="p-2 alert alert-danger">{errors.name.message}</p>
						)}

						<div className="mb-2 input-group">
							<textarea
								className="form-control bg-light"
								placeholder="Recipe description"
								{...register("description", {
									required: "description is required",
								})}
							/>
						</div>
						{errors.description && (
							<p className="p-2 alert alert-danger">
								{errors.description.message}
							</p>
						)}

						<div className="mb-2 input-group">
							<input
								type="number"
								className="form-control bg-light"
								placeholder="Recipe price"
								{...register("price", {
									required: "price is required",
								})}
							/>
						</div>
						{errors.price && (
							<p className="p-2 alert alert-danger">{errors.price.message}</p>
						)}

						<div className="mb-2 input-group">
							<select
								className="form-control bg-light"
								{...register("tagId", {
									required: "tag is required",
								})}
							>
								<option value="">select</option>
								{tagsList.map((tag) => (
									<option key={tag.id} value={tag.id}>
										{tag.name}
									</option>
								))}
							</select>
						</div>
						{errors.tagId && (
							<p className="p-2 alert alert-danger">{errors.tagId.message}</p>
						)}

						<div className="mb-2 input-group">
							<input
								type="file"
								className="form-control bg-light"
								{...register("recipeImage", {
									required: "image is required",
								})}
							/>
						</div>
						{errors.recipeImage && (
							<p className="p-2 alert alert-danger">
								{errors.recipeImage.message}
							</p>
						)}

						<div className="mb-2 input-group">
							<select
								className="form-control bg-light"
								{...register("categoriesIds", {
									required: "categoriesIds is required",
								})}
							>
								<option value="">select</option>
								{categoriesList.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
						{errors.categoriesIds && (
							<p className="p-2 alert alert-danger">
								{errors.categoriesIds.message}
							</p>
						)}

						<button className="btn btn-success w-100">Update</button>
					</form>
				</Modal.Body>
			</Modal>

			{/* view modal for users favorites */}

			<Modal show={showView} onHide={handleViewClose}>
				<Modal.Header closeButton>
					<h3>Recipe Details</h3>
				</Modal.Header>
				<Modal.Body>
					<div className="text-center">
						<img
							className="rounded w-50 mb-md-3"
							src={SelectedRecipeImage}
							alt="Recipe Image"
						/>
						<p className="">{SelectedRecipeDesc}</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={onViewSubmit}
						className="btn btn-success w-100"
						disabled={loading}
					>
						{loading ? "Add To Favorite" : "Favorite"}
					</button>
				</Modal.Footer>
			</Modal>
			<div className="container">
				<div className="row">
					<div className="p-3 col-6">
						<h4>Recipes Table Details</h4>
						<span>You can check all details</span>
					</div>
					<div className="px-0 py-4 col-6 d-flex justify-content-end">
						{userData?.userGroup == "SuperAdmin" ? (
							<button className="py-3 btn btn-success" onClick={goToRecipeData}>
								Add New Recipe
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</div>

			{/* search inputs - filtration */}

			<div className="my-3 filtration">
				<div className="row">
					<div className="col-md-6">
						<input
							type="text"
							placeholder="Search by recipe name"
							className="form-control"
							onChange={getNameValue}
						/>
					</div>
					<div className="col-md-3">
						<select className="form-control" onChange={getCategoryValue}>
							<option>Search By Category</option>
							{categoriesList.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-md-3">
						<select className="form-control" onChange={getTagValue}>
							<option>Search By Tag</option>
							{tagsList.map((tag) => (
								<option key={tag.id} value={tag.id}>
									{tag.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<table className="table p-2 m-1">
				<thead>
					<tr className="table-row">
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
								<td>{item?.name}</td>
								<td>
									{item?.imagePath ? (
										<img
											className="recipeImg"
											title={item.name}
											src={
												"https://upskilling-egypt.com:3006/" + item.imagePath
											}
										/>
									) : (
										<img
											className="recipeImg"
											src={noDataImg}
											alt="No Img"
											title="default img"
										/>
									)}
								</td>
								<td>{item?.price}</td>
								<td>{item?.description}</td>
								<td>{item?.category[0]?.name}</td>
								<td>{item?.tag.name}</td>
								{userData?.userGroup == "SuperAdmin" ? (
									<td>
										<i
											role="button"
											className="me-3 fa fa-edit text-info"
											title="edit"
											onClick={() => handleUpdateShow(item.id)}
										></i>
										<i
											role="button"
											className="text-danger fa fa-trash"
											title="delete"
											onClick={() => handleDeleteShow(item.id)}
										></i>
									</td>
								) : (
									""
								)}
								{userData?.userGroup == "SystemUser" ? (
									<td>
										<i
											role="button"
											onClick={() => handleViewShow(item)}
											className="fa fa-eye text-primary"
											aria-hidden="true"
											title="View"
										></i>
									</td>
								) : (
									""
								)}
							</tr>
						))
					) : (
						<td colSpan={4}>
							<NoData />
						</td>
					)}
				</tbody>
			</table>

			{/* pagination */}
			<nav
				className="my-2 d-flex justify-content-center"
				aria-label="Page navigation example"
			>
				<ul role="button" className="pagination">
					<li className="page-item">
						<a className="page-link" aria-label="Previous" title="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					{arrayOfPages.map((pageNumber) => (
						<li
							// Todo: key here
							key={pageNumber}
							className="page-item"
							onClick={() =>
								getRecipesList(nameValue, tagValue, catValue, 5, pageNumber)
							}
						>
							<a className="page-link">{pageNumber}</a>
						</li>
					))}
					{/* Todo: handle arrows */}
					<li className="page-item">
						<a className="page-link" aria-label="Next" title="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
}
