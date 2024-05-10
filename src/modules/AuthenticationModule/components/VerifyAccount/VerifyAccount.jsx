import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyAccount() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			let response = await axios.put(
				"https://upskilling-egypt.com:3006/api/v1/Users/verify",
				data
			);
			// console.log(response.data.token);
			toast.success("Account verified successfully");
			navigate("/login");
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
								<h3>Verify Account</h3>
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
											type="text"
											className="form-control"
											placeholder="Code"
											{...register("code", {
												required: "Code is required",
												minLength: {
													value: 4,
													message: "Code must be 4 characters",
												},
											})}
										/>
									</div>
									{errors.code && (
										<p className="py-2 alert alert-danger">
											{errors.code.message}
										</p>
									)}
									<button className="btn btn-success w-100">
										Verify Account
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
