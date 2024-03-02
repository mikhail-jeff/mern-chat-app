import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
	const { fullName, username, password, confirmPassword, gender } = req.body;

	try {
		if (password != confirmPassword) {
			return res.status(400).json({ error: `Passwords don't match` });
		}

		const user = await User.findOne({ username });

		if (user) {
			res.status(400).json({ error: `username already exists` });
		}

		//hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = await User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			//Generate JWT
			generateTokenAndSetCookie(newUser._id, res);

			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: `Invalid user data` });
		}
	} catch (error) {
		console.log(`Error in signup controller: ${error.message}`);
		res.status(500).json({ error: `Internal Server Error` });
	}
};

export const login = (req, res) => {
	res.send("Login user");
};

export const logout = (req, res) => {
	res.send("Logout user");
};
