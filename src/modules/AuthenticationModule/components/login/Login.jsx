import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ saveLoginData }) {
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
			// console.log(response.data.token);
			toast.success("Logged in successfully");
			navigate("/dashboard");
		} catch (error) {
			toast.error(error.response.data.message);
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
											type="password"
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
									</div>
									{errors.password && (
										<p className="py-2 alert alert-danger">
											{errors.password.message}
										</p>
									)}
									<div className="my-3 links d-flex justify-content-between">
										<Link to="/register">Register Now?</Link>
										<Link to="/forgetpass">Forgot Password?</Link>
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
