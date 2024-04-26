import React, { useState } from "react";
import toggler from "../../../../assets/images/3.png";

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
export default function SideBar() {
	const [isCollapse, setIsCollapse] = useState(false);
	const toggleCollapse = () => {
		setIsCollapse(!isCollapse);
	};
	return (
		<>
			<div className="sidebar-container">
				<Sidebar collapsed={isCollapse}>
					<Menu
						menuItemStyles={{
							button: {
								// the active class will be added automatically by react router
								// so we can use it to style the active menu item
								[`&.active`]: {
									backgroundColor: "#f00",
									color: "#fff",
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
						<MenuItem
							title="Users"
							icon={<i className="fas fa-user-friends"></i>}
							component={<Link to="/dashboard/users" />}
						>
							Users
						</MenuItem>
						<MenuItem
							title="Recipes"
							icon={<i className="fas fa-th-large"></i>}
							component={<Link to="/dashboard/recipes" />}
						>
							Recipes
						</MenuItem>
						<MenuItem
							title="Categories"
							icon={<i className="fas fa-calendar-alt"></i>}
							component={<Link to="/dashboard/categories" />}
						>
							Categories
						</MenuItem>
						<MenuItem
							title="Change Password"
							icon={<i className="fa fa-lock"></i>}
							// TODO: show change password modal
						>
							Change Password
						</MenuItem>
						<MenuItem
							title="Logout"
							icon={<i className="fas fa-sign-out-alt"></i>}
							component={<Link to="/login" />}
						>
							Logout
						</MenuItem>
					</Menu>
				</Sidebar>
			</div>
		</>
	);
}
