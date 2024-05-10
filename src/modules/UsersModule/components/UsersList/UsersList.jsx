import Header from "../../../SharedModule/components/Header/Header";
import usersImg from "../../../../assets/images/recipes.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UsersList() {
	const [usersList, setUsersList] = useState([]);
	const [UserNameValue, setUserNameValue] = useState("");
	const [EmailValue, setEmailValue] = useState("");
	const [CountryValue, setCountryValue] = useState("");
	const [GroupValue, setGroupValue] = useState("");
	const [ArrayOfPages, setArrayOfPages] = useState([]);

	const getUsersList = async (
		userName,
		email,
		country,
		groups,
		pageSize,
		pageNumber
	) => {
		try {
			let response = await axios.get(
				`https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
					params: {
						userName: userName,
						email: email,
						country: country,
						groups: groups,
					},
				}
			);
			setArrayOfPages(
				Array(response.data.totalNumberOfPages)
					.fill()
					.map((_, i) => i + 1)
			);
			setUsersList(response.data.data);
		} catch (error) {
			console.log(error);
		}
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
	}, []);

	return (
		<>
			<Header
				title="Users List"
				description="You can now add your items that any user can order it from the Application and you can edit"
				imageUrl={usersImg}
			/>
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
							<th scope="col">Group</th>
							<th scope="col">Country</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{usersList.length > 0 ? (
							usersList.map((item, index) => (
								<tr key={item.id}>
									<th scope="row">{index + 1}</th>
									<td>{item.userName}</td>
									<td>{item.email}</td>
									<td>{item.group.name}</td>
									<td>{item.country}</td>
									<td>
										<i
											role="button"
											className="mx-2 fa fa-edit text-info"
											aria-hidden="true"
											title="edit"
										></i>
										<i
											role="button"
											className="fa fa-trash text-danger"
											aria-hidden="true"
											title="delete"
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

				{/* pagination */}
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
				</nav>
			</div>
		</>
	);
}
