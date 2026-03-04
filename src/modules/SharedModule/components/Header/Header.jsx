
export default function Header({ title, description, imageUrl }) {
	return (
		<>
			<div className="my-2 container-fluid header-container">
				<div className="row align-items-center flex-nowrap">
					<div className="px-3 px-md-5 text-white header-text-col">
						<div className="mx-0 mx-md-4 content py-3">
							<h2>{title}</h2>
							<p className="mb-0">{description}</p>
						</div>
					</div>
					<div className="text-center d-none d-lg-block header-img-col">
						<img className="w-75" src={imageUrl} alt="" />
					</div>
				</div>
			</div>
		</>
	);
}
