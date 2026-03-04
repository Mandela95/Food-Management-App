import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../../../context/AuthContext";
import ResponsivePagination from "react-responsive-pagination";

export default function RecipesList() {
	let { loginData, requestHeaders, baseUrl } = useContext(AuthContext);
	const navigate = useNavigate();
	const [recipesList, setRecipesList] = useState([]);
	const [categoriesList, setCategoriesList] = useState([]);
	const [tagsList, setTagsList] = useState([]);
	const [recipeId, setRecipeId] = useState();

	const [nameValue, setNameValue] = useState("");
	const [catValue, setCatValue] = useState("");
	const [tagValue, setTagValue] = useState("");

	const [pageNumber, setPageNumber] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const [showDelete, setShowDelete] = useState(false);

	let {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const handleDeleteClose = () => setShowDelete(false);
	const handleDeleteShow = (id) => {
		setRecipeId(id);
		setShowDelete(true);
	};	// const [show, setShow] = useState(false);
	const [SelectedRecipe, setSelectedRecipe] = useState(null);
	const [showView, setShowView] = useState(false);
	const [loading, setLoading] = useState(false);
	
	// Image preview states
	const [showImagePreview, setShowImagePreview] = useState(false);
	const [previewImageSrc, setPreviewImageSrc] = useState("");

	const handleViewClose = () => {
		setShowView(false);
		setSelectedRecipe(null);
	};

	const handleViewShow = (item) => {
		setSelectedRecipe(item);
		setShowView(true);
	};
	
	// Image preview functions
	const handleImagePreview = (imageSrc) => {
		setPreviewImageSrc(imageSrc);
		setShowImagePreview(true);
	};
	
	const handleImagePreviewClose = () => {
		setShowImagePreview(false);
		setPreviewImageSrc("");
	};
	const onViewSubmit = async () => {
		try {
			setLoading(true);
			await axios.post(
				`${baseUrl}/userRecipe/`,
				{ recipeId: SelectedRecipe.id },
				{
					headers: requestHeaders,
				}
			);
			toast.success("Recipe Added to Favourites Successfully");
		} catch (error) {
			console.error("Error favoriting recipe:", error);
		} finally {
			setLoading(false);
			handleViewClose();
		}
	};const [showUpdate, setShowUpdate] = useState(false);
	const [currentEditingRecipe, setCurrentEditingRecipe] = useState(null);
	
	const handleUpdateClose = () => {
		setShowUpdate(false);
		setCurrentEditingRecipe(null);
		// Reset form values
		setValue("name", "");
		setValue("description", "");
		setValue("price", "");
		setValue("tagId", "");
		setValue("categoriesIds", "");
	};
	
	const handleUpdateShow = (item) => {
		setRecipeId(item.id);
		setCurrentEditingRecipe(item);
		setValue("name", item.name);
		setValue("description", item.description);
		setValue("price", item.price);
		setValue("tagId", item.tag.id);
		setValue("categoriesIds", item.category[0]?.id);
		setShowUpdate(true);
	};

	const goToRecipeData = () => {
		navigate("/dashboard/recipeData");
	};

	//  get recipes list
	const getRecipesList = async (name, tagId, catId, pageSize, pageNumber) => {
		try {
			let response = await axios.get(
				`${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				{
					headers: requestHeaders,
					params: {
						name: name,
						tagId: tagId,
						categoryId: catId,
					},
				}
			);
			setTotalPages(response.data.totalNumberOfPages);
			console.log(response.data.totalNumberOfPages);
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
		// Only append image if a new one is selected
		if (data.recipeImage && data.recipeImage.length > 0) {
			formData.append("recipeImage", data.recipeImage[0]);
		}
		formData.append("categoriesIds", data.categoriesIds);
		return formData;
	};
	//Todo: handle update submit
	const onUpdateSubmit = async (data) => {
		let recipeFormData = appendToFormData(data);
		try {
			let response = await axios.put(
				`${baseUrl}/Recipe/${recipeId}`,
				recipeFormData,
				{
					headers: requestHeaders,
				}
			);
			toast.success("Recipe Updated Successfully");
			handleUpdateClose();
			getRecipesList(nameValue, tagValue, catValue, 5, pageNumber);
			console.log(response);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};
	// ⭐ delete recipe cruD - delete⭐
	const onDeleteSubmit = async () => {
		try {
			let response = await axios.delete(`${baseUrl}/Recipe/${recipeId}`, {
				headers: requestHeaders,
			});
			console.log(response);
			handleDeleteClose();
			toast.success(`Recipe deleted successfully`);
			getRecipesList(nameValue, tagValue, catValue, 5, pageNumber);
		} catch (error) {
			console.log(error);
		}
	};

	// get categories list
	const getCategoriesList = async () => {
		try {
			let response = await axios.get(
				`${baseUrl}/Category/?pageSize=10&pageNumber=1`,
				{
					headers: requestHeaders,
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
			let response = await axios.get(`${baseUrl}/tag`, {
				headers: requestHeaders,
			});
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
	}, []);

	useEffect(() => {
		getRecipesList(nameValue, tagValue, catValue, 5, pageNumber);
	}, [pageNumber]);

	return (
		<>			<Header
				title="Recipes Items"
				description="Discover and manage delicious recipes. You can add new recipes, edit existing ones, and organize them by categories and tags."
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
							{/* <div className="text-center col-md-6">
								<img className="" src={recipesImg} alt="no img" />
							</div> */}
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
									required: "Description is required",
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
									required: "Price is required",
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
							<p className="p-2 alert alert-danger">{errors.tagId.message}</p>
						)}						<div className="mb-2 input-group">
							<input
								type="file"
								className="form-control bg-light"
								{...register("recipeImage")}
							/>
						</div>						{/* Display current image */}
						{currentEditingRecipe && (
							<div className="mb-2 text-center">
								<p className="text-muted mb-2">Current Image:</p>
								{currentEditingRecipe.imagePath ? (
									<>
										<img
											src={`https://upskilling-egypt.com:3006/${currentEditingRecipe.imagePath}`}
											alt="Current recipe"
											className="img-thumbnail"
											style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
											onClick={() => handleImagePreview(
												`https://upskilling-egypt.com:3006/${currentEditingRecipe.imagePath}`
											)}
										/>
										<div className="mt-1">
											<small className="text-muted">Click image to preview • Upload a new image to replace it</small>
										</div>
									</>
								) : (
									<>
										<img
											src={noDataImg}
											alt="No image available"
											className="img-thumbnail"
											style={{ width: '150px', height: '150px', objectFit: 'cover', opacity: 0.6 }}
										/>
										<div className="mt-1">
											<small className="text-muted">No image available • Upload an image to add one</small>
										</div>
									</>
								)}
							</div>
						)}

						<div className="mb-2 input-group">
							<select
								className="form-control bg-light"
								{...register("categoriesIds", {
									required: "CategoriesIds is required",
								})}
							>
								<option value="">Select Category</option>
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
			</Modal>			{/* view modal for users favorites */}
			<Modal show={showView} onHide={handleViewClose}>
				<Modal.Header closeButton>
					<h3>Recipe Details</h3>
				</Modal.Header>
				<Modal.Body>
					{SelectedRecipe && (
						<>
							<div className="text-center my-3">
								<img
									className="rounded w-50 mb-md-3"
									src={SelectedRecipe.imagePath ? 
										`https://upskilling-egypt.com:3006/${SelectedRecipe.imagePath}` : 
										noDataImg
									}
									alt="Recipe Image"
								/>
							</div>
							<div>
								<p className="">{`Recipe Name: ${SelectedRecipe.name}`}</p>
								<p className="">{`Recipe Description: ${SelectedRecipe.description}`}</p>
								<p className="">{`Recipe Price: ${SelectedRecipe.price} LE`}</p>
							</div>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={onViewSubmit}
						className="btn btn-success w-100"
						disabled={loading}
					>
						{loading ? "Adding..." : "Add To Favorite"}
					</button>
				</Modal.Footer>
			</Modal>

			{/* Image Preview Modal */}
			<Modal show={showImagePreview} onHide={handleImagePreviewClose} size="lg" centered>
				<Modal.Header closeButton>
					<h3>Recipe Image</h3>
				</Modal.Header>
				<Modal.Body className="text-center">
					<img
						src={previewImageSrc}
						alt="Recipe Preview"
						style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
					/>
				</Modal.Body>
			</Modal>
			<div className="container">
				<div className="row">
					<div className="p-3 col-12 col-md-6">
						<h4>Recipes Table Details</h4>
						<span>You can check all details</span>
					</div>
					<div className="px-3 py-2 py-md-4 col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
						{loginData?.userGroup == "SuperAdmin" && (
							<button className="py-2 btn btn-success" onClick={goToRecipeData}>
								Add New Recipe
							</button>
						)}
					</div>
				</div>
			</div>
			{/* search inputs - filtration */}
			<div className="my-3 filtration px-2">
				<div className="row g-2">
					<div className="col-12 col-md-6">
						<input
							type="text"
							placeholder="Search by recipe name"
							className="form-control"
							onChange={getNameValue}
						/>
					</div>
					<div className="col-6 col-md-3">
						<select className="form-control" onChange={getCategoryValue}>
							<option>Search By Category</option>
							{categoriesList.map((cat) => (
								<option key={cat.id} value={cat.id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-6 col-md-3">
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
			<div className="table-responsive">
			<table className="table table-hover text-center">
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
				<tbody className="align-middle">
					{recipesList.length > 0 ? (
						recipesList.map((item, index) => (
							<tr key={item.id}>
								<th scope="row">{index + 1}</th>
								<td>{item?.name}</td>								<td>
									{item?.imagePath ? (
										<img
											className="recipeImg"
											title={item.name}
											src={
												"https://upskilling-egypt.com:3006/" + item.imagePath
											}
											onClick={() => handleImagePreview(
												"https://upskilling-egypt.com:3006/" + item.imagePath,
												item.name
											)}
											style={{ cursor: 'pointer' }}
										/>
									) : (
										<img
											className="recipeImg"
											src={noDataImg}
											alt="No Img"
											title="default img"
											onClick={() => handleImagePreview(noDataImg, item.name)}
											style={{ cursor: 'pointer' }}
										/>
									)}
								</td>
								<td>{item?.price}</td>
								<td>{item?.description}</td>
								<td>{item?.category[0]?.name}</td>
								<td>{item?.tag.name}</td>
								{loginData?.userGroup == "SuperAdmin" ? (					<td>
									<i
										role="button"
										className="me-3 fa fa-edit text-info"
										title="edit"
										onClick={() => handleUpdateShow(item)}
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
								{loginData?.userGroup == "SystemUser" ? (
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
						<td colSpan={8}>
							<NoData />
						</td>
					)}
					</tbody>
			</table>
			</div>
			{/* pagination */}
			<div className="my-2 d-flex justify-content-center">
				<ResponsivePagination
					current={pageNumber}
					total={totalPages}
					onPageChange={setPageNumber}
				/>
			</div>
		</>
	);
}
