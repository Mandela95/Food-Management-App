import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import avatar from "../../../../assets/images/avatar.png";
import ChangePassword from "../../../AuthenticationModule/components/changePassword/ChangePassword";
import { AuthContext } from "../../../../context/AuthContext";

export default function Navbar({ loginData }) {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();
	
	const [showChangePassword, setShowChangePassword] = useState(false);
	const handleChangePasswordClose = () => setShowChangePassword(false);
	const handleChangePasswordShow = () => setShowChangePassword(true);
	
	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<>
			{/* Change Password Modal */}
			<Modal show={showChangePassword} onHide={handleChangePasswordClose}>
				<Modal.Body>
					<ChangePassword logoutProp={logout} />
				</Modal.Body>
			</Modal>

			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="mb-2 d-flex align-items-center navbar-nav ms-auto mb-lg-0">							<li className="nav-item">
								<Dropdown align="end">
									<Dropdown.Toggle 
										variant="link" 
										id="profile-dropdown"
										className="nav-link d-flex align-items-center text-decoration-none text-dark p-2 rounded"
										style={{ 
											transition: 'all 0.2s ease',
											border: '1px solid transparent'
										}}
									>
										<img 
											className="me-2 rounded-circle" 
											src={avatar} 
											alt="User Avatar" 
											style={{ 
												width: '35px', 
												height: '35px', 
												objectFit: 'cover',
												border: '2px solid #e9ecef'
											}}
										/>
										<div className="d-none d-md-flex flex-column align-items-start">
											<span className="fw-semibold" style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>
												{loginData?.userName}
											</span>
											<small className="text-muted" style={{ fontSize: '0.75rem', lineHeight: '1' }}>
												{loginData?.userGroup}
											</small>
										</div>
										<i className="fas fa-chevron-down ms-2 text-muted" style={{ fontSize: '0.8rem' }}></i>
									</Dropdown.Toggle>

									<Dropdown.Menu className="shadow-sm">
										{/* User Info Section */}
										<div className="px-3 py-2 border-bottom">
											<div className="d-flex align-items-center">
												<img 
													src={avatar} 
													alt="User Avatar" 
													className="rounded-circle me-2"
													style={{ width: '50px', height: '50px', objectFit: 'cover' }}
												/>
												<div>
													<p className="mb-0 fw-bold">{loginData?.userName}</p>
													<small className="text-muted">{loginData?.userEmail}</small>
													<br />
													<span className="badge bg-success">{loginData?.userGroup}</span>
												</div>
											</div>
										</div>
										
										<Dropdown.Item 
											onClick={handleChangePasswordShow}
											className="py-2"
										>
											<i className="fa fa-lock me-2 text-muted"></i>
											Change Password
										</Dropdown.Item>
										
										<Dropdown.Divider />
										
										<Dropdown.Item 
											onClick={handleLogout}
											className="py-2 text-danger"
										>
											<i className="fas fa-sign-out-alt me-2"></i>
											Logout
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
