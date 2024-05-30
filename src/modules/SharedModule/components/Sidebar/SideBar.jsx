import { useContext, useState } from "react";
import toggler from "../../../../assets/images/3.png";

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../../AuthenticationModule/components/changePassword/ChangePassword";
import { AuthContext } from "../../../../context/AuthContex";
export default function SideBar() {
	const { loginData, logout } = useContext(AuthContext);
	const [isCollapse, setIsCollapse] = useState(false);
	const toggleCollapse = () => {
		setIsCollapse(!isCollapse);
	};

	console.log(loginData);

	// const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Body>
					<ChangePassword logoutProp={logout} />
				</Modal.Body>
			</Modal>
			<div className="sidebar-container">
				<Sidebar collapsed={isCollapse}>
					<Menu
						menuItemStyles={{
							button: {
								// the active class will be added automatically by react router
								// so we can use it to style the active menu item
								[`&.active`]: {
									backgroundColor: "#f00 !important",
									color: "#fff !important",
								},
							},
						}}
					>
						<MenuItem
							className="sidebarLogo"
							onClick={toggleCollapse}
							icon={<img src={toggler} />}
						/>
						<MenuItem
							title="Home"
							className="home"
							icon={<i className="fa fa-home"></i>}
							component={<Link to="/dashboard" />}
						>
							Home
						</MenuItem>
						{loginData?.userGroup == "SuperAdmin" ? (
							<MenuItem
								title="Users"
								icon={<i className="fas fa-user-friends"></i>}
								component={<Link to="/dashboard/users" />}
							>
								Users
							</MenuItem>
						) : (
							""
						)}
						<MenuItem
							title="Recipes"
							icon={<i className="fas fa-utensils"></i>}
							component={<Link to="/dashboard/recipes" />}
						>
							Recipes
						</MenuItem>
						{loginData?.userGroup == "SuperAdmin" ? (
							<MenuItem
								title="Categories"
								icon={<i className="fas fa-calendar-alt"></i>}
								component={<Link to="/dashboard/categories" />}
							>
								Categories
							</MenuItem>
						) : (
							""
						)}
						{loginData?.userGroup == "SystemUser" ? (
							<MenuItem
								title="Favorites"
								icon={<i className="far fa-heart"></i>}
								component={<Link to="/dashboard/favorites" />}
							>
								Favorites
							</MenuItem>
						) : (
							""
						)}
						<MenuItem
							title="Change Password"
							icon={<i className="fa fa-lock"></i>}
							onClick={handleShow}
						>
							Change Password
						</MenuItem>
						<MenuItem
							title="Logout"
							icon={<i className="fas fa-sign-out-alt"></i>}
							component={<Link to="/login" />}
							onClick={logout}
						>
							Logout
						</MenuItem>{" "}
					</Menu>
				</Sidebar>
			</div>
		</>
	);
}
