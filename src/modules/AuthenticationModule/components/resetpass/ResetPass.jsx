import React from "react";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			let response = await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/Users/Reset",
				data
			);
			// console.log(response);
			toast.success("Password Reset Successfully");
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
						<div className="p-4 bg-white col-md-6 rounded-4 reset-form">
							<div className="text-center">
								<img src={logo} alt="" className="w-50" />
							</div>
							<div>
								<h3>Reset Password?</h3>
								<p className="text-muted">
									Please Enter Your Otp or Check Your Inbox
								</p>
							</div>
							<div className="form-content">
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="my-2 input-group">
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
													value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
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
									<div className="my-2 input-group">
										<span className="input-group-text" id="basic-addon1">
											<i className="fa fa-lock"></i>
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="OTP"
											{...register("seed", {
												required: "OTP Is Required",
												minLength: {
													value: 4,
													message: "OTP must be 4 characters",
												},
											})}
										/>
									</div>
									{errors.seed && (
										<p className="py-1 alert alert-danger">
											{errors.seed.message}
										</p>
									)}
									<div className="my-2 input-group">
										<span className="input-group-text" id="basic-addon1">
											<i className="fa fa-lock"></i>
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="New Password"
											{...register("password", {
												required: "Enter New Password",
												minLength: {
													value: 6,
													message: "New Password must be at least 6 characters",
												},
											})}
										/>
									</div>
									{errors.password && (
										<p className="py-1 alert alert-danger">
											{errors.password.message}
										</p>
									)}
									<div className="my-2 input-group">
										<span className="input-group-text" id="basic-addon1">
											<i className="fa fa-lock"></i>
										</span>
										<input
											type="text"
											className="form-control"
											placeholder="Confirm New Password"
											{...register("confirmPassword", {
												required: "Confirm New Password",
												minLength: {
													value: 6,
													message: "New Password must be at least 6 characters",
												},
											})}
										/>
									</div>
									{errors.confirmPassword && (
										<p className="py-1 alert alert-danger">
											{errors.confirmPassword.message}
										</p>
									)}
									<button className="mt-2 btn btn-success w-100">
										Reset Password
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
