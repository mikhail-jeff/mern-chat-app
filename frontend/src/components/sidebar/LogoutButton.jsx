import { BiLogOutCircle } from "react-icons/bi";

const LogoutButton = () => {
	return (
		<div className="mt-auto">
			<BiLogOutCircle
				title="Logout"
				className="w-7 h-7 text-white cursor-pointer"
			/>
		</div>
	);
};

export default LogoutButton;
