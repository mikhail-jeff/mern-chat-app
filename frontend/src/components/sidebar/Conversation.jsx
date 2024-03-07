import useConversation from "../../zustand/useConversations";

const Conversation = ({ conversation, lastIndex, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	return (
		<>
			<div
				className={`${isSelected ? "bg-sky-600" : ""} flex gap-2 items-center rounded p-2 py-1 cursor-pointer hover:bg-sky-600`}
				onClick={() => setSelectedConversation(conversation)}>
				<div className="avatar online">
					<div className="w-12 rounded-full">
						<img
							src={conversation.profilePic}
							alt="user avatar"
						/>
					</div>
				</div>

				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between">
						<p className="font-bold">{conversation.fullName}</p>
						<span className="text-xl">{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIndex && <div className="divider my-0 py-0 h-1" />}
		</>
	);
};

export default Conversation;
