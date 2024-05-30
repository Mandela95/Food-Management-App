import { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import categoriesImg from "../../../../assets/images/recipes.png";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContex";
export default function CategoriesList() {
	let { requestHeaders, baseUrl } = useContext(AuthContext);
	const [categoriesList, setCategoriesList] = useState([]);

	const [show, setShow] = useState(false);
	const [categoryId, setCategoryId] = useState();

	const handleClose = () => {
		// resetting the values to default after closing the modal
		setNameCategory(null);
		setCategoryId(null);
		setCheckIsUpdate(false);
		setShow(false);
		setValue("name", "");
	};

	const handleShow = () => setShow(true);
	const [nameValue, setNameValue] = useState("");
	const [arrayOfPages, setArrayOfPages] = useState([]);

	const [nameCategory, setNameCategory] = useState(null);
	const [checkIsUpdate, setCheckIsUpdate] = useState(false);

	const [showDelete, setShowDelete] = useState(false);
	const handleDeleteClose = () => setShowDelete(false);
	const handleDeleteShow = (id) => {
		setCategoryId(id);
		setShowDelete(true);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	//⭐ add new category Crud - create⭐
	const onAddSubmit = async (data) => {
		handleClose();
		try {
			let response = await axios.post(`${baseUrl}/Category`, data, {
				headers: requestHeaders,
			});
			getCategoriesList(nameValue, 10);
			toast.success("Category Has been added successfully");
			setValue("name", "");
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	//⭐get categories list => cRud - retrieve⭐
	const getCategoriesList = async (name, pageSize, pageNumber) => {
		try {
			let response = await axios.get(
				`${baseUrl}/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				{
					headers: requestHeaders,
					params: { name: name },
				}
			);
			setArrayOfPages(
				Array(response.data.totalNumberOfPages)
					.fill()
					.map((_, i) => i + 1)
			);
			setCategoriesList(response.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	//⭐ delete category cruD - delete⭐
	const onDeleteSubmit = async () => {
		try {
			let response = await axios.delete(`${baseUrl}/Category/${categoryId}`, {
				headers: requestHeaders,
			});
			handleDeleteClose();
			toast.success("Category deleted successfully");
			getCategoriesList(nameValue, 10);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = (id, name) => {
		// invoke the function to show modal add and edit
		setShow(true);
		// set the values to handle  them in the update process
		setCategoryId(id);
		setNameCategory(name);
		setCheckIsUpdate(true);
		setValue("name", name);
	};

	//⭐ update category crUd - update⭐
	const onUpdateSubmit = async (data) => {
		try {
			let response = await axios.put(
				`${baseUrl}/Category/${categoryId}`,
				data,
				{
					headers: requestHeaders,
				}
			);
			handleClose();
			toast.success("Category updated successfully");
			getCategoriesList(nameValue, 10);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const getNameValue = (input) => {
		setNameValue(input.target.value);
		getCategoriesList(input.target.value, 10, 1);
	};

	useEffect(() => {
		getCategoriesList("", 10, 1);
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
					<Modal.Title>
						{checkIsUpdate ? "Update Category" : "Add Category"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						onSubmit={handleSubmit(
							!checkIsUpdate ? onAddSubmit : onUpdateSubmit
						)}
					>
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
						<button className="mt-5 float-end btn btn-success">
							{checkIsUpdate ? "Update" : "Save"}
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
					<Button variant="outline-danger" onClick={() => onDeleteSubmit()}>
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

			{/* search input - filtration */}

			<div className="my-3 filtration">
				<div className="row">
					<div className="col-md-12">
						<input
							type="text"
							placeholder="Search By Category Name"
							className="form-control"
							onChange={getNameValue}
						/>
					</div>
				</div>
			</div>

			<table className="table p-2 m-1">
				<thead>
					<tr className="table-row">
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
								<td>
									{new Date(item.creationDate).toLocaleString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</td>
								<td>
									<i
										role="button"
										className="mx-2 fa fa-edit text-info"
										title="edit"
										onClick={() => handleUpdate(item.id, item.name)}
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

			{/* pagination */}

			<nav
				className="my-2 d-flex justify-content-center"
				aria-label="Page navigation example"
			>
				<ul role="button" className="pagination pointer">
					<li className="page-item">
						<a className="page-link" aria-label="Previous" title="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					{arrayOfPages.map((pageNumber) => (
						<li
							key={pageNumber}
							className="page-item"
							onClick={() => getCategoriesList(nameValue, 10, pageNumber)}
						>
							<a className="page-link">{pageNumber}</a>
						</li>
					))}
					{/* // Todo: handle arrows prev and next */}
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
