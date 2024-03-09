import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });

		if (!success) return;

		setLoading(true);

		try {
			const response = await axios.post("/api/auth/signup", {
				fullName,
				username,
				password,
				confirmPassword,
				gender,
			});

			const data = response.data;

			if (data.error) {
				throw new Error(data.error);
			}

			// localstorage
			localStorage.setItem("chat-user", JSON.stringify(data));
			// context
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

// *** validation
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
	if (!fullName || !username || !password || !confirmPassword || !gender) {
		toast.error("All fields are required");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 5) {
		toast.error("Passwords must be at least 5 characters");
		return false;
	}

	return true;
}

export default useSignup;
