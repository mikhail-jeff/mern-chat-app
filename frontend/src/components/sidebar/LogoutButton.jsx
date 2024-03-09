import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className="mt-auto p-2">
			{!loading ? (
				<BiLogOutCircle
					title="Logout"
					className="w-8 h-8 cursor-pointer text-[#1D232A]"
					onClick={logout}
				/>
			) : (
				<span className="loading loading-spinner"></span>
			)}
		</div>
	);
};

export default LogoutButton;
