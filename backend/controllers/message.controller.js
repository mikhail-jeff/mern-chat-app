export const sendMessage = async (req, res) => {
	res.send(`messsage sent ${req.params.id}`);
};
