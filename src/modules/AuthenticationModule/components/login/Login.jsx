import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { ToastContext } from "../../../../context/ToastContext";
import { AuthContext } from "../../../../context/AuthContex";

export default function Login() {
	const { saveLoginData } = useContext(AuthContext);
	let { getToastValue } = useContext(ToastContext);
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			let response = await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/Users/Login",
				data
			);
			localStorage.setItem("token", response.data.token);
			saveLoginData();
			getToastValue("success", "Logged in successfully");
			navigate("/dashboard");
		} catch (error) {
			getToastValue("error", error.response.data.message);
		}
	};
	return (
		<>
			<div className="auth-container">
				<div className="container-fluid bg-overlay">
					<div className="justify-content-center row vh-100 align-items-center">
						<div className="p-5 bg-white col-md-6 rounded-4">
							<div className="text-center">
								<img src={logo} alt="" className="w-50" />
							</div>
							<div className="form-content">
								<h3>Log In</h3>
								<p className="text-muted">
									Welcome Back! Please enter your details
								</p>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="mb-3 input-group">
										<span className="input-group-text" id="basic-addon1">
											<i className="fa fa-envelope"></i>
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="Enter Your Email"
											{...register("email", {
												required: "Email is required",
												pattern: {
													value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
													message: "Invalid Email",
												},
											})}
										/>
									</div>
									{errors.email && (
										<p className="py-2 alert alert-danger">
											{errors.email.message}
										</p>
									)}
									<div className="mb-3 input-group">
										<span className="input-group-text" id="basic-addon1">
											<i className="fa fa-lock"></i>
										</span>
										<input
											type={showPassword ? "text" : "password"}
											className="form-control"
											placeholder="Password"
											{...register("password", {
												required: "Password is required",
												minLength: {
													value: 6,
													message: "Password must be at least 6 characters",
												},
											})}
										/>
										{/* eye show password icon toggler */}
										<span
											onClick={togglePasswordVisibility}
											style={{ cursor: "pointer" }}
											className="input-group-text"
											id="basic-addon2"
										>
											<i
												className={
													showPassword ? "fa fa-eye" : "fa fa-eye-slash"
												}
											></i>
										</span>
									</div>
									{errors.password && (
										<p className="py-2 alert alert-danger">
											{errors.password.message}
										</p>
									)}
									<div className="mb-4 d-flex justify-content-between">
										<Link className="text-black" to="/register">
											Register Now?
										</Link>
										<Link className="text-success" to="/forgetpass">
											Forgot Password?
										</Link>
									</div>
									<button className="btn btn-success w-100">Login</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
