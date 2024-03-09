const GenderCheckBox = ({ onCheckboxChange, selectedGender }) => {
	const toggleCheckbox = (gender) => {
		// Toggle the selected gender
		const newSelectedGender = selectedGender === gender ? "" : gender;

		// Call the parent component's onCheckboxChange function with the new selected gender
		onCheckboxChange(newSelectedGender);
	};

	return (
		<div className="flex">
			<div className="form-control">
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
					<span className="label-text">Male</span>
					<input
						type="checkbox"
						className="checkbox border-slate-900"
						checked={selectedGender === "male"}
						onChange={() => toggleCheckbox("male")}
					/>
				</label>
			</div>

			<div className="form-control">
				<label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
					<span className="label-text">Female</span>
					<input
						type="checkbox"
						className="checkbox border-slate-900"
						checked={selectedGender === "female"}
						onChange={() => toggleCheckbox("female")}
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckBox;
