import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";

export default function RecipeData() {
	const [categoriesList, setCategoriesList] = useState([]);
	const [tagsList, setTagsList] = useState([]);

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// form data for image
	const appendToFormData = (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("price", data.price);
		formData.append("description", data.description);
		formData.append("categoriesIds", data.categoriesIds);
		formData.append("tagId", data.tagId);
		formData.append("recipeImage", data.recipeImage[0]);
		return formData;
	};

	const onSubmit = async (data) => {
		//⭐ send recipe form data not only data⭐
		let recipeFormData = appendToFormData(data);
		try {
			let response = await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/Recipe",
				recipeFormData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			toast.success("Recipe Created successfully");
			navigate("/dashboard/recipes");
		} catch (error) {
			toast.error(error.response.data.message);
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
			setTagsList(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCategoriesList();
		getTagsList();
	}, []);

	return (
		<>
			<RecipesListHeader />
			<div className="p-3 ">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-2 input-group">
						<input
							type="text"
							className="form-control"
							placeholder="Recipe Name"
							{...register("name", {
								required: "Recipe Name is required",
							})}
						/>
					</div>
					{errors.name && (
						<p className="py-1 alert alert-danger">{errors.name.message}</p>
					)}
					<div className="mb-2 input-group">
						<select
							className="form-control"
							{...register("tagId", {
								required: "Tag is required",
							})}
						>
							<option value="">Select Tag</option>
							{tagsList.map((tag) => (
								<option key={tag.id} value={tag.id}>
									{tag.name}
								</option>
							))}
						</select>
					</div>
					{errors.tagId && (
						<p className="py-1 alert alert-danger">{errors.tagId.message}</p>
					)}
					<div className="mb-2 input-group">
						<input
							type="number"
							className="form-control"
							placeholder="Recipe Price"
							{...register("price", {
								required: "Price is required",
								maxLength: { message: "Please enter valid number", value: 3 },
							})}
						/>
					</div>
					{errors.price && (
						<p className="py-1 alert alert-danger">{errors.price.message}</p>
					)}
					<div className="mb-2 input-group">
						<select
							className="form-control"
							{...register("categoriesIds", {
								required: "Category is required",
							})}
						>
							<option value="">Select Category</option>
							{categoriesList.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					{errors.categoriesIds && (
						<p className="py-1 alert alert-danger">
							{errors.categoriesIds.message}
						</p>
					)}
					<div className="mb-2 input-group">
						<textarea
							type="text"
							className="form-control"
							placeholder="Recipe Description"
							{...register("description", {
								required: "Category is required",
							})}
						/>
					</div>
					{errors.description && (
						<p className="py-1 alert alert-danger">
							{errors.description.message}
						</p>
					)}
					{/* image */}
					<div className="mb-2 input-group">
						<input
							type="file"
							className="form-control"
							{...register("recipeImage", {
								required: "Recipe Image is required",
							})}
						/>
					</div>
					{errors.recipeImage && (
						<p className="py-1 alert alert-danger">
							{errors.recipeImage.message}
						</p>
					)}

					<hr />
					<div className="text-end">
						<button
							className="mx-2 btn btn-outline-danger"
							onClick={() => navigate("/dashboard/recipes")}
						>
							Cancel
						</button>
						<button className="btn btn-success">Save</button>
					</div>
				</form>
			</div>
		</>
	);
}
