import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);

		try {
			const response = await axios.post("/api/auth/logout");

			const data = response.data;

			if (data.error) {
				throw new Error(data.error);
			}

			// localstorage
			localStorage.removeItem("chat-user");
			// context
			setAuthUser(null);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};

export default useLogout;
