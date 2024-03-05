import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

import { BiShow } from "react-icons/bi";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	// signup hook
	const { loading, signup } = useSignup();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// signup hook
		await signup(inputs);

		// clears after submitting
		setInputs({
			fullName: "",
			username: "",
			password: "",
			confirmPassword: "",
			gender: "",
		});

		// reset password toggle
		setShowPassword(false);
		setShowConfirmPassword(false);
	};

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
				<h2 className="text-3xl font-semibold text-center text-gray-300 mb-10">Sign-up</h2>

				<form onSubmit={handleSubmit}>
					<label className="input input-bordered flex items-center gap-2 mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-5 h-5 opacity-70">
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
						</svg>
						<input
							type="text"
							className="grow"
							placeholder="Full Name"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</label>

					<label className="input input-bordered flex items-center gap-2 mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-5 h-5 opacity-70">
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
						</svg>
						<input
							type="text"
							className="grow"
							placeholder="Username"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</label>

					<label className="input input-bordered flex items-center gap-2 mb-4 relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-5 h-5 opacity-70">
							<path
								fillRule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clipRule="evenodd"
							/>
						</svg>
						<input
							type={showPassword ? "text" : "password"}
							className="grow"
							placeholder="Password"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
						<BiShow
							className="absolute right-3 top-3 cursor-pointer w-6 h-6"
							onClick={togglePasswordVisibility}
						/>
					</label>

					<label className="input input-bordered flex items-center gap-2 mb-2 relative">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-5 h-5 opacity-70">
							<path
								fillRule="evenodd"
								d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
								clipRule="evenodd"
							/>
						</svg>
						<input
							type={showConfirmPassword ? "text" : "password"}
							className="grow"
							placeholder="Confirm Password"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
						<BiShow
							className="absolute right-3 top-3 cursor-pointer w-6 h-6"
							onClick={toggleConfirmPasswordVisibility}
						/>
					</label>

					<GenderCheckBox
						onCheckboxChange={handleCheckboxChange}
						selectedGender={inputs.gender}
					/>

					<p className="text-sm mt-2 inline-block">
						&nbsp; Already have an account?
						<Link
							to={"/login"}
							className="text-gray-800 font-bold ml-2">
							Login
						</Link>
					</p>

					<div>
						<button
							className="btn btn-block btn-sm mt-2 h-11 text-lg"
							disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Sign-up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
