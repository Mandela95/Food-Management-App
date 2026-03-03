import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { useState } from "react";

export default function MasterLayout({ loginData }) {
	const [isCollapse, setIsCollapse] = useState(false);

	return (
		<>
			<div className="d-flex">
				<div>
					<SideBar 
						loginData={loginData} 
						isCollapse={isCollapse} 
						setIsCollapse={setIsCollapse} 
					/>
				</div>
				<div className="container-fluid vh-100 w-100"
					style={{ 
						marginLeft: isCollapse ? '80px' : '250px',
						transition: 'margin-left 0.3s ease'
					}}
				>
					<Navbar loginData={loginData} />
					<Outlet />
				</div>
			</div>
		</>
	);
}
