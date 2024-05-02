import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import categoriesImg from "../../../../assets/images/recipes.png";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { toast } from "react-toastify";
export default function CategoriesList() {
	const [categoriesList, setCategoriesList] = useState([]);

	const [show, setShow] = useState(false);
	const [categoryId, setcategoryId] = useState();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showDelete, setShowDelete] = useState(false);
	const handleDeleteClose = () => setShowDelete(false);
	const handleDeleteShow = (id) => {
		setcategoryId(id);
		setShowDelete(true);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	//⭐ add new category Crud - create⭐
	const onSubmit = async (data) => {
		try {
			let response = await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/Category",
				data,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			handleClose();
			getCategoriesList();
			toast.success("Category Has been added successfully");
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	//⭐get categories list => cRud - retrieve⭐
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

	//⭐ delete category cruD - delete⭐
	const onDeleteSubmit = async () => {
		try {
			let response = await axios.delete(
				`https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			handleDeleteClose();
			toast.success("Category deleted successfully");
			getCategoriesList();
		} catch (error) {
			console.log(error);
		}
	};

	//⭐ update category crUd - update⭐
	const updateCategoryList = async () => {
		try {
			let response = await axios.put(
				`https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			handleClose();
			getCategoriesList();
			toast.success("Category updated successfully");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCategoriesList();
	}, []);
	return (
		<>
			<Header
				title="Categories Item"
				description="You can now add your items that any user can order it from the Application and you can edit"
				imageUrl={categoriesImg}
			/>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header className="mb-4 border-bottom-0" closeButton>
					<Modal.Title>Add Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Category Name"
								{...register("name", {
									required: "Name is required",
								})}
							/>
						</div>
						{errors.name && (
							<p className="py-2 my-2 alert alert-danger">
								{errors.name.message}
							</p>
						)}
						<button
							onClick={handleClose}
							className="mt-5 float-end btn btn-success"
						>
							Save
						</button>
					</form>
				</Modal.Body>
			</Modal>
			<Modal show={showDelete} onHide={handleDeleteClose}>
				<Modal.Header className="mb-4 border-bottom-0" closeButton>
					<Modal.Title>Delete Category</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeleteData deleteItem={"Category"} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" onClick={onDeleteSubmit}>
						Delete this item
					</Button>
				</Modal.Footer>
			</Modal>
			<div className="container">
				<div className="row">
					<div className="p-3 col-6">
						<h4>Categories Table Details</h4>
						<span>You can check all details</span>
					</div>
					<div className="px-0 py-4 col-6 d-flex justify-content-end">
						<button onClick={handleShow} className="py-3 btn btn-success">
							Add New Category
						</button>
					</div>
				</div>
			</div>
			<table className="table p-2 m-3">
				<thead>
					<tr className="text-muted">
						<th scope="col">No.</th>
						<th scope="col">Category Name</th>
						<th scope="col">Creation Date</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					{categoriesList.length > 0 ? (
						categoriesList?.map((item, index) => (
							<tr key={item.id}>
								<th scope="row">{index + 1}</th>
								<td>{item.name}</td>
								<td>{item.creationDate}</td>
								<td>
									<i
										role="button"
										className="mx-3 fa fa-edit text-primary"
										title="edit"
										onClick={handleShow}
									></i>
									<i
										role="button"
										className="text-danger fa fa-trash"
										title="delete"
										onClick={() => handleDeleteShow(item.id)}
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