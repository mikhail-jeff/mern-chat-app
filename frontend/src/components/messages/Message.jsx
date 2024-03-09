import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversations";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();

	const { selectedConversation } = useConversation();

	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePIc = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-sky-600" : "";

	const formattedTime = extractTime(message.createdAt);

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img
						src={profilePIc}
						alt="user avatar"
					/>
				</div>
			</div>

			<div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
		</div>
	);
};

export default Message;
