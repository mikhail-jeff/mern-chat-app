import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversations";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();

	const { selectedConversation } = useConversation();

	const fromAuthUser = message.senderId === authUser._id;
	const chatClassName = fromAuthUser ? "chat-end" : "chat-start";
	const profilePic = fromAuthUser ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromAuthUser ? "bg-sky-600" : "";

	const formattedTime = extractTime(message.createdAt);

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img
						src={profilePic}
						alt="user avatar"
					/>
				</div>
			</div>

			<div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
			<div className="chat-footer opacity-45 text-xs flex gap-1 items-center">{formattedTime}</div>
		</div>
	);
};

export default Message;
