export const signup = async (req, res) => {
	try {
		const {} = req.body;
	} catch (error) {}
};

export const login = (req, res) => {
	res.send("Login user");
};

export const logout = (req, res) => {
	res.send("Logout user");
};
