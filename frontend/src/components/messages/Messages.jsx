import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const { loading, messages } = useGetMessages();
	const lastMessageRef = useRef();

	// scroll down to the latest message
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 100);
	}, [messages]);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div
						key={message._id}
						ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

			{!loading && messages.length == 0 && <p className="text-center">Send a message to start a conversation</p>}
		</div>
	);
};

export default Messages;
