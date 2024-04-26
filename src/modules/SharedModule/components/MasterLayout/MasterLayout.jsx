import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";

export default function MasterLayout({ loginData }) {
	return (
		<>
			<div className="d-flex">
				<div>
					<SideBar />
				</div>
				<div className="w-100 me-3">
					<Navbar loginData={loginData} />
					<Outlet />
				</div>
			</div>
		</>
	);
}
