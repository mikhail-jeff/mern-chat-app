import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);

		if (!success) return;

		setLoading(true);

		try {
			const response = await axios.post("/api/auth/login", {
				username,
				password,
			});

			const data = response.data;

			if (data.error) {
				throw new Error(data.error);
			}

			console.table(data);

			// localstorage
			localStorage.setItem("chat-user", JSON.stringify(data));
			// context
			setAuthUser(data);
		} catch (error) {
			if (error.response && error.response.status === 400) {
				// Handle specific error for incorrect username/password
				toast.error("Invalid credentials");
			} else {
				// Handle other errors
				toast.error("An error occurred while logging in");
			}
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Username and password are required");
		return false;
	}

	return true;
}
