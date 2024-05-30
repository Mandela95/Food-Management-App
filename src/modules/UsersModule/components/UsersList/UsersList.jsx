import Header from "../../../SharedModule/components/Header/Header";
import usersImg from "../../../../assets/images/recipes.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/images/no-data.png";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContex";
import Modal from "react-bootstrap/Modal";
import { ModalFooter } from "react-bootstrap";
import { toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";

export default function UsersList() {
	let { requestHeaders, baseUrl } = useContext(AuthContext);
	const [usersList, setUsersList] = useState([]);
	const [UserNameValue, setUserNameValue] = useState("");
	const [EmailValue, setEmailValue] = useState("");
	const [CountryValue, setCountryValue] = useState("");
	const [GroupValue, setGroupValue] = useState("");
	// const [ArrayOfPages, setArrayOfPages] = useState([]);

	const [pageNumber, setPageNumber] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const [isLoading, setIsLoading] = useState(false);

	const [userId, setUserId] = useState(null);
	const [nameUser, setNameUser] = useState(null);
	const [showDelete, setShowDelete] = useState(false);
	const [showView, setShowView] = useState(false);
	const [selectedUserGroup, setSelectedUserGroup] = useState("");
	const [selectedUserName, setSelectedUserName] = useState("");
	const [selectedUserEmail, setSelectedUserEmail] = useState("");
	const [selectedUserCountry, setSelectedUserCountry] = useState("");

	const handleViewClose = () => setShowView(false);

	const handleCloseShowUser = () => {
		setShowView(false);
	};

	// function for handling showing the delete modal
	const handleShowDelete = (id, name) => {
		// set the values to handle  them in the delete process
		setUserId(id);
		setNameUser(name);
		setShowDelete(true);
	};
	const handleShowUser = (user) => {
		// setSelectedUser(user);
		setSelectedUserName(user.userName);
		setSelectedUserEmail(user.email);
		setSelectedUserCountry(user.country);
		setSelectedUserGroup(user.group.name);
		setShowView(true);
	};

	// function for handling hiding the delete modal
	const handleCloseDelete = () => {
		// resetting the values to default after closing the modal
		setShowDelete(false);
		setUserId(null);
		setNameUser(null);
	};

	// function for delete category to the server
	const onDeleteSubmit = async () => {
		try {
			const response = await axios.delete(`${baseUrl}/Users/${userId}`, {
				headers: requestHeaders,
			});
			handleCloseDelete();
			toast.success(`Deleted ${nameUser} Successfully`);
			getUsersList("", "", "", "", 10, 1);
		} catch (err) {
			toast.error(err.response.data.message);
			handleCloseDelete();
		}
	};

	const getUsersList = async (userName, email, country, groups, pageSize) => {
		setIsLoading(true);
		try {
			let response = await axios.get(
				`${baseUrl}/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				{
					headers: requestHeaders,
					params: {
						userName: userName,
						email: email,
						country: country,
						groups: groups,
					},
				}
			);
			// setArrayOfPages(
			// 	Array(response.data.totalNumberOfPages)
			// 		.fill()
			// 		.map((_, i) => i + 1)
			// );
			setUsersList(response.data.data);
			setTotalPages(response.data.totalNumberOfPages);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const getUserNameValue = (input) => {
		setUserNameValue(input.target.value);
		getUsersList(input.target.value, EmailValue, CountryValue, GroupValue);
	};

	const getEmailValue = (input) => {
		setEmailValue(input.target.value);
		getUsersList(UserNameValue, input.target.value, CountryValue, GroupValue);
	};
	const getCountryValue = (input) => {
		setCountryValue(input.target.value);
		getUsersList(UserNameValue, EmailValue, input.target.value, GroupValue);
	};
	const getGroupsValue = (input) => {
		setGroupValue(input.target.value);
		getUsersList(UserNameValue, EmailValue, CountryValue, input.target.value);
	};

	useEffect(() => {
		getUsersList("", "", "", "", 10, 1);
	}, [pageNumber]);

	return (
		<>
			<Header
				title="Users List"
				description="You can now add your items that any user can order it from the Application and you can edit"
				imageUrl={usersImg}
			/>

			{/* Modal for View */}
			<Modal show={showView} onHide={handleViewClose}>
				<Modal.Header closeButton>
					<h3>User Details</h3>
				</Modal.Header>
				<Modal.Body>
					<div>
						<p className="">{`Name: ${selectedUserName}`}</p>
						<p className="">{`Email: ${selectedUserEmail}`}</p>
						<p className="">{`Country: ${selectedUserCountry}`}</p>
						<p className="">{`Group: ${selectedUserGroup}`}</p>
					</div>
				</Modal.Body>
				<ModalFooter className="py-3">
					<button
						onClick={handleCloseShowUser}
						className={`btn py-1 px-3 fs-6 fw-medium btn btn-outline-success `}
					>
						Back
					</button>
				</ModalFooter>
			</Modal>

			{/* modal handle delete  */}
			<Modal
				className="posModalDelete"
				show={showDelete}
				onHide={handleCloseDelete}
			>
				<Modal.Body className="mt-2 px-4">
					<div className="addCatModalHead text-end">
						<div className="addCatModalHeadClose ">
							<i
								onClick={() => handleCloseDelete()}
								className="fa-solid fa-close btn border-danger py-1 px-2 rounded-circle   text-danger "
							></i>
						</div>
					</div>

					<div className="delete text-center mt-4">
						<img src={noDataImg} alt="" />
						<h5 className="my-2">
							Delete This <span className="text-danger">user</span> ?
						</h5>
						<p>
							are you sure you want to delete this item ? if you are sure just
							click on delete it
						</p>
					</div>

					<div className="addCatModalFooter"></div>
				</Modal.Body>
				<ModalFooter className="py-3">
					<button
						onClick={onDeleteSubmit}
						className={`btn py-1 px-3 fs-6  fw-medium  btn btn-outline-danger `}
					>
						Delete user {nameUser}
					</button>
				</ModalFooter>
			</Modal>

			<div className="p-4 container-fluid">
				<div className="row">
					<div className="col-md-6">
						<h4>Users Table Details</h4>
						<span>You can check all details</span>
					</div>
				</div>

				<div className="my-3 filteration">
					<div className="row">
						<div className="col-md-3">
							<input
								placeholder="Search By Username"
								type="text"
								className="form-control"
								onChange={getUserNameValue}
							/>
						</div>
						<div className="col-md-3">
							<input
								type="text"
								placeholder="Search By Email"
								className="form-control"
								onChange={getEmailValue}
							/>
						</div>
						<div className="col-md-3">
							<input
								type="text"
								placeholder="Search By Country"
								className="form-control"
								onChange={getCountryValue}
							/>
						</div>
						<div className="col-md-2">
							<input
								type="text"
								placeholder="Search By Group"
								className="form-control"
								onChange={getGroupsValue}
							/>
						</div>
					</div>
				</div>

				<br />
				<table className="table table-hover">
					<thead>
						<tr className="table-secondary">
							<th scope="col">#</th>
							<th scope="col">User Name</th>
							<th scope="col">Email</th>
							<th scope="col">Country</th>
							<th scope="col">Group</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{usersList.length > 0 ? (
							usersList.map((user, index) => (
								<tr key={user.id}>
									<th scope="row">{index + 1}</th>
									<td>{user.userName}</td>
									<td>{user.email}</td>
									<td>{user.country}</td>
									<td>{user.group.name}</td>
									<td>
										<i
											role="button"
											className="mx-2 fa fa-eye text-info"
											aria-hidden="true"
											title="View"
											onClick={() => handleShowUser(user)}
										></i>
										<i
											role="button"
											className="fa fa-trash text-danger"
											aria-hidden="true"
											title="Delete"
											onClick={() => handleShowDelete(user.id, user.userName)}
										></i>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6">
									<NoData />
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{isLoading ? (
					""
				) : (
					<ResponsivePagination
						current={pageNumber}
						total={totalPages}
						onPageChange={setPageNumber}
					/>
				)}

				{/* pagination
				<nav
					className="d-flex justify-content-center"
					aria-label="Page navigation"
				>
					<ul role="button" className="pagination">
						<li className="page-item">
							<a className="page-link" aria-label="Previous" title="Previous">
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>

						{ArrayOfPages.map((pageNo) => (
							<li
								key={pageNo}
								className="page-item"
								onClick={() =>
									getUsersList(
										UserNameValue,
										EmailValue,
										CountryValue,
										GroupValue,
										10,
										pageNo
									)
								}
							>
								<a className="page-link">{pageNo}</a>
							</li>
						))}

						<li className="page-item">
							<a className="page-link" aria-label="Next" title="Next">
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</nav> */}
			</div>
		</>
	);
}
