import React from "react";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const appendToFormData = (data) => {
		const formData = new FormData();
		formData.append("userName", data.userName);
		formData.append("email", data.email);
		formData.append("country", data.country);
		formData.append("phoneNumber", data.phoneNumber);
		formData.append("profileImage", data.profileImage[0]);
		formData.append("password", data.password);
		formData.append("confirmPassword", data.confirmPassword);
		return formData;
	};

	const onSubmit = async (data) => {
		let registerFormData = appendToFormData(data);
		try {
			let response = await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/Users/Register",
				registerFormData
			);
			// console.log(response);
			toast.success(
				"Account Created Successfully, A verification code has been sent to your email address"
			);
			navigate("/verifyAccount");
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			<div className="container-fluid bg-overlay">
				<div className="justify-content-center row align-items-center">
					<div className="p-4 m-5 bg-white col-md-8 rounded-4">
						<div className="text-center">
							<img src={logo} alt="" className="w-50" />
						</div>
						<div>
							<h3>Register</h3>
							<p className="text-muted">
								Welcome Back! Please enter your details
							</p>
						</div>
						<div className="form-content">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="row">
									<div className="col-md-6">
										<div className="my-1 input-group">
											<span className="input-group-text" id="basic-addon1">
												<i className="fa fa-envelope"></i>
											</span>
											<input
												type="text"
												className="form-control"
												placeholder="UserName"
												{...register("userName", {
													required: "UserName Is Required",
												})}
											/>
										</div>
										{errors.userName && (
											<p className="py-1 alert alert-danger">
												{errors.userName.message}
											</p>
										)}
									</div>

									<div className="col-md-6">
										<div className="my-1 input-group">
											<span className="input-group-text" id="basic-addon1">
												<i className="fa fa-envelope"></i>
											</span>
											<input
												type="text"
												className="form-control"
												placeholder="Email"
												{...register("email", {
													required: "Email Is Required",
													pattern: {
														value:
															/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
														message: "Invalid Email",
													},
												})}
											/>
										</div>
										{errors.email && (
											<p className="py-1 alert alert-danger">
												{errors.email.message}
											</p>
										)}
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="my-1 input-group">
											<span className="input-group-text" id="basic-addon1">
												<i className="fa fa-lock"></i>
											</span>
											<input
												type="text"
												className="form-control"
												placeholder="Country"
												{...register("country", {
													required: "Country Is Required",
												})}
											/>
										</div>
										{errors.country && (
											<p className="py-1 alert alert-danger">
												{errors.country.message}
											</p>
										)}
									</div>
									<div className="col-md-6">
										<div className="my-1 input-group">
											<span className="input-group-text" id="basic-addon1">
												<i className="fa fa-lock"></i>
											</span>
											<input
												type="tel"
												className="form-control"
												placeholder="Phone Number"
												{...register("phoneNumber", {
													required: "Enter Your Phone Number",
												})}
											/>
										</div>
										{errors.phoneNumber && (
											<p className="py-1 alert alert-danger">
												{errors.phoneNumber.message}
											</p>
										)}
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<div className="my-1 input-group">
											<span className="input-group-text" id="basic-addon1">
												<i className="fa fa-lock"></i>
											</span>
											<input
												type="password"
												className="form-control"
												placeholder="New Password"
												{...register("password", {
													required: "Enter Password",
													minLength: {
														value: 6,
														message: "Password must be at least 6 characters",
													},
												})}
											/>
										</div>
										{errors.password && (
											<p className="py-1 alert alert-danger">
												{errors.password.message}
											</p>
										)}
									</div>
									<div className="col-md-6">
										<div className="my-1 input-group">
											<span className="input-group-text" id="basic-addon1">
												<i className="fa fa-lock"></i>
											</span>
											<input
												type="password"
												className="form-control"
												placeholder="Confirm Password"
												{...register("confirmPassword", {
													required: "Confirm Password",
													minLength: {
														value: 6,
														message: "Password must be at least 6 characters",
													},
												})}
											/>
										</div>
										{errors.confirmPassword && (
											<p className="py-1 alert alert-danger">
												{errors.confirmPassword.message}
											</p>
										)}
									</div>
								</div>

								<div className="row">
									<div className="col-md-12">
										<div className="my-1 input-group">
											<input
												type="file"
												className="form-control"
												{...register("profileImage", {
													required: "profileImage is required",
												})}
											/>
										</div>
										{errors.profileImage && (
											<p className="py-1 alert alert-danger">
												{errors.profileImage.message}
											</p>
										)}
									</div>
								</div>
								<div className="my-3 links d-flex justify-content-end">
									<Link className="text-success" to="/login">
										Login Now?
									</Link>
								</div>
								<div className="text-center">
									<button className="btn btn-success w-50">Register</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
