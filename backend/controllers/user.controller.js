import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserID = req.user._id;

		// user not included and password field
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserID } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.log(`Error in getUsersForSidebar controller: ${error.message}`);
		res.status(500).json({ error: `Inter Server Error` });
	}
};
