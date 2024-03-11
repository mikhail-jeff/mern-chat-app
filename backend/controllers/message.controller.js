import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverId, io } from "../socket/socket.js";

// *** SEND MESSAGES
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO
		const receiverSocketId = getReceiverId(receiverId);

		if (receiverSocketId) {
			// send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log(`Error in sendMessage controller: ${error.message}`);
		res.status(500).json({ error: `Internal Server Error` });
	}
};

// *** GET MESSAGES
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // populate actual messages not the reference

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log(`Error in getMessages controller: ${error.message}`);
		res.status(500).json({ error: `Internal Server Error` });
	}
};
