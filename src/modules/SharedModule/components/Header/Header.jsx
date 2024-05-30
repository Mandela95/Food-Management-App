import React from "react";

export default function Header({ title, description, imageUrl }) {
	return (
		<>
			<div className="my-2 container-fluid header-container">
				<div className="row align-items-center">
					<div className="px-5 text-white col-md-8">
						<div className="mx-4 content">
							<h2>{title}</h2>
							<p className="w-75">{description}</p>
						</div>
					</div>
					<div className="text-center col-md-4">
						<img className="w-75" src={imageUrl} alt="" />
					</div>
				</div>
			</div>
		</>
	);
}
