import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { useState, useEffect } from "react";

export default function MasterLayout({ loginData }) {
	const [isCollapse, setIsCollapse] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
	const [showMobileSidebar, setShowMobileSidebar] = useState(false);

	// Handle window resize
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 992;
			setIsMobile(mobile);
			if (!mobile) {
				setShowMobileSidebar(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const toggleMobileSidebar = () => {
		setShowMobileSidebar(!showMobileSidebar);
	};

	const closeMobileSidebar = () => {
		setShowMobileSidebar(false);
	};
	return (
		<>
			<div className="d-flex">
				{/* Mobile Overlay */}
				{isMobile && showMobileSidebar && (
					<div 
						className="sidebar-overlay show" 
						onClick={closeMobileSidebar}
					></div>
				)}

				<SideBar 
					loginData={loginData} 
					isCollapse={isMobile ? false : isCollapse} 
					setIsCollapse={setIsCollapse}
					onMobileItemClick={closeMobileSidebar}
					isMobile={isMobile}
					showMobileSidebar={showMobileSidebar}
				/>
				<div 
					className="main-content container-fluid w-100"
					style={{ 
						marginLeft: isMobile ? '0' : (isCollapse ? '80px' : '250px'),
						transition: 'margin-left 0.3s ease',
						paddingTop: isMobile ? '0' : '0',
						minHeight: '100vh',
						overflowX: 'hidden'
					}}
				>
					<Navbar 
						loginData={loginData} 
						isMobile={isMobile}
						showMobileSidebar={showMobileSidebar}
						toggleMobileSidebar={toggleMobileSidebar}
					/>
					<Outlet />
				</div>
			</div>
		</>
	);
}
