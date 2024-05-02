import React from "react";
import noDataImg from "../../../../assets/images/no-data.png";

export default function DeleteData({ deleteItem }) {
	return (
		<div className="text-center">
			<img src={noDataImg} alt="" />
			<h5>Delete this {deleteItem}</h5>
			<p>
				are you sure you want to delete this item ? if you are sure just click
				on delete it
			</p>
		</div>
	);
}
