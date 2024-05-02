import React from "react";
import noDataImg from "../../../../assets/images/no-data.png";

export default function NoData() {
	return (
		<div className="m-5 text-center ">
			<img src={noDataImg} alt="" />
			<h2>No Data!</h2>
			<p className="text-muted">
				are you sure you want to delete this item ? if you are sure just click
				on delete it
			</p>
		</div>
	);
}
