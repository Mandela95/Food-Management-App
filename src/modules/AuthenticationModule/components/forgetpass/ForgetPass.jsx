import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPass({ saveLoginData }) {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			let response = await axios.post(
				"https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
				data
			);
			// console.log(response);
			toast.success("Your request is being processed, please check your email");
			navigate("/resetpass");
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			<div className="auth-container">
				<div className="container-fluid bg-overlay">
					<div className="justify-content-center row vh-100 align-items-center">
						<div className="p-4 bg-white col-md-6 rounded-4">
							<div className="text-center">
								<img src={logo} alt="" className="w-50" />
							</div>
							<div>
								<h3>Forgot Your Password?</h3>
								<p className="text-muted">
									No worries! Please enter your email and we will send a
									password reset link
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
									<button className=" btn btn-success w-100">Submit</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
