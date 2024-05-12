import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ChangePassword() {
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleOldPasswordVisibility = () => {
		setShowOldPassword(!showOldPassword);
	};
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const validateConfirmPassword = (value) => {
		const newPassword = getValues("newPassword");
		return value === newPassword || "Passwords do not match";
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const onSubmit = async (data) => {
		try {
			let response = await axios.put(
				"https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
				data,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			// logoutProp();
			toast.success("New Password Has been updated successfully");
			console.log(response);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<>
			<div className="m-3">
				<div className="text-center">
					<img className="w-50" src={logo} alt="" />
				</div>
				<h4>Change Password</h4>
				<p className="text-muted">Enter your details below</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-2 input-group">
					<span className="input-group-text" id="basic-addon1">
						<i className="fa fa-lock"></i>
					</span>
					<input
						type={showOldPassword ? "text" : "password"}
						className="form-control"
						placeholder="Old Password"
						{...register("oldPassword", {
							required: "Old Password Is Required",
						})}
					/>
					<span
						onClick={toggleOldPasswordVisibility}
						style={{ cursor: "pointer" }}
						className="input-group-text"
						id="basic-addon2"
					>
						<i
							className={showOldPassword ? "fa fa-eye" : "fa fa-eye-slash"}
						></i>
					</span>
				</div>
				{errors.oldPassword && (
					<p className="py-1 alert alert-danger">
						{errors.oldPassword.message}
					</p>
				)}
				<div className="my-2 input-group">
					<span className="input-group-text" id="basic-addon1">
						<i className="fa fa-lock"></i>
					</span>
					<input
						type={showPassword ? "text" : "password"}
						className="form-control"
						placeholder="New Password"
						{...register("newPassword", {
							required: "Enter New Password",
							minLength: {
								value: 6,
								message: "New Password must be at least 6 characters",
							},
						})}
					/>
					<span
						onClick={togglePasswordVisibility}
						style={{ cursor: "pointer" }}
						className="input-group-text"
						id="basic-addon2"
					>
						<i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
					</span>
				</div>
				{errors.newPassword && (
					<p className="py-1 alert alert-danger">
						{errors.newPassword.message}
					</p>
				)}
				<div className="my-2 input-group">
					<span className="input-group-text" id="basic-addon1">
						<i className="fa fa-lock"></i>
					</span>
					<input
						type={showConfirmPassword ? "text" : "password"}
						className="form-control"
						placeholder="Confirm New Password"
						{...register("confirmNewPassword", {
							required: "Confirm New Password",
							validate: validateConfirmPassword,
							minLength: {
								value: 6,
								message: "New Password must be at least 6 characters",
							},
						})}
					/>
					<span
						onClick={toggleConfirmPasswordVisibility}
						style={{ cursor: "pointer" }}
						className="input-group-text"
						id="basic-addon2"
					>
						<i
							className={showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}
						></i>
					</span>
				</div>
				{errors.confirmNewPassword && (
					<p className="py-1 alert alert-danger">
						{errors.confirmNewPassword.message}
					</p>
				)}
				<button className="mt-5 w-100 btn btn-success">Change Password</button>
			</form>
		</>
	);
}
