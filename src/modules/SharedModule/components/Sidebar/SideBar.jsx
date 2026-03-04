import { useContext, useState } from "react";
import toggler from "../../../../assets/images/3.png";

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "../../../AuthenticationModule/components/changePassword/ChangePassword";
import { AuthContext } from "../../../../context/AuthContext";
export default function SideBar({ isCollapse, setIsCollapse, onMobileItemClick, isMobile, showMobileSidebar }) {
	const { loginData, logout } = useContext(AuthContext);
	const location = useLocation();
	
	const toggleCollapse = () => {
		if (!isMobile) {
			setIsCollapse(!isCollapse);
		}
	};

	// Handle menu item click on mobile - close sidebar
	const handleMenuItemClick = () => {
		if (isMobile && onMobileItemClick) {
			onMobileItemClick();
		}
	};

	// Check if a route is active
	const isActive = (path) => {
		if (path === "/dashboard") {
			return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
		}
		return location.pathname.startsWith(path);
	};

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
			<div 
				className={`sidebar-container ${isMobile && showMobileSidebar ? 'show' : ''}`} 
				style={{ 
					position: 'fixed', 
					top: 0, 
					left: 0, 
					height: '100vh', 
					zIndex: 1000 
				}}
			>
				<Sidebar collapsed={isCollapse} style={{ border: "none" }}>
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
							className={`home ${location.pathname === "/dashboard" ? "active" : ""}`}
							icon={<i className="fa fa-home"></i>}
							component={<Link to="/dashboard" />}
							onClick={handleMenuItemClick}
						>
							Home
						</MenuItem>
						{loginData?.userGroup == "SuperAdmin" ? (
							<MenuItem
								title="Users"
								className={isActive("/dashboard/users") ? "active" : ""}
								icon={<i className="fas fa-user-friends"></i>}
								component={<Link to="/dashboard/users" />}
								onClick={handleMenuItemClick}
							>
								Users
							</MenuItem>
						) : (
							""
						)}
						<MenuItem
							title="Recipes"
							className={isActive("/dashboard/recipes") ? "active" : ""}
							icon={<i className="fas fa-utensils"></i>}
							component={<Link to="/dashboard/recipes" />}
							onClick={handleMenuItemClick}
						>
							Recipes
						</MenuItem>
						{loginData?.userGroup == "SuperAdmin" ? (
							<MenuItem
								title="Categories"
								className={isActive("/dashboard/categories") ? "active" : ""}
								icon={<i className="fas fa-calendar-alt"></i>}
								component={<Link to="/dashboard/categories" />}
								onClick={handleMenuItemClick}
							>
								Categories
							</MenuItem>
						) : (
							""
						)}
						{loginData?.userGroup == "SystemUser" ? (
							<MenuItem
								title="Favorites"
								className={isActive("/dashboard/favorites") ? "active" : ""}
								icon={<i className="far fa-heart"></i>}
								component={<Link to="/dashboard/favorites" />}
								onClick={handleMenuItemClick}
							>
								Favorites
							</MenuItem>
						) : (
							""
						)}
						<MenuItem
							title="Change Password"
							icon={<i className="fa fa-lock"></i>}
							onClick={() => { handleMenuItemClick(); handleShow();
							}}
						>
							Change Password
						</MenuItem>
						<MenuItem
							title="Logout"
							icon={<i className="fas fa-sign-out-alt"></i>}
							component={<Link to="/login" />}
							onClick={() => { handleMenuItemClick(); logout();	
							}}
						>
							Logout
						</MenuItem>{" "}
					</Menu>
				</Sidebar>
			</div>
		</>
	);
}
