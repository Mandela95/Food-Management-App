import React from "react";
import avatar from "../../../../assets/images/avatar.png";

export default function Navbar({ loginData }) {
	return (
		<>
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
						<ul className="mb-2 d-flex align-items-center navbar-nav ms-auto mb-lg-0">
							<li className="nav-item">
								<a className="nav-link">
									<img className="mx-1" role="button" src={avatar} alt="" />
									{loginData?.userName}
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" aria-current="page">
									<i className="fas fa-bell"></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
