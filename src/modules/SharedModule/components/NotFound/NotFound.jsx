import React from "react";
import logo from "../../../../assets/images/logo.png";
import notfound from "../../../../assets/images/404 Not Found.png";
import Login from "../../../AuthenticationModule/components/login/Login";
import { useNavigate, Link } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<>
			<div className="container-fluid not-found">
				<div className="row">
					<div className="col-lg-6">
						<div style={{ marginBottom: "100px" }}>
							<img
								className="m-2"
								style={{ width: "250px" }}
								src={logo}
								alt="food recipe logo"
							/>
						</div>
						<div className="m-3">
							<h2>Oops</h2>
							<h3 style={{ color: "#009247" }}>Page Not Found</h3>
							<p className="text-muted">
								This Page doesn’t exist or was removed! We suggest you back to
								home.
							</p>
							<button
								className="my-5 btn btn-success"
								style={{ width: "300px" }}
								onClick={() => navigate("/login")}
							>
								<i className="p-2 mx-2 fas fa-long-arrow-alt-left"></i> Back to
								Home
							</button>
						</div>
					</div>
					<div className="col-lg-6">
						<img className="my-5 w-100" src={notfound} alt="" />
					</div>
				</div>
			</div>
		</>
	);
}
