import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");

	// hook
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!message) return;

		await sendMessage(message);

		// empty input after sending message
		setMessage("");
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="px-4 my-3">
			<div className="w-full relative">
				<input
					type="text"
					placeholder="Send a message"
					className="w-full border bg-gray-600 p-2.5 border-gray-600 text-sm rounded-lg block text-white"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				<button
					type="submit"
					className="absolute inset-y-0 end-0 flex items-center pe-3">
					{loading ? <div className="loading loading-spinner"></div> : <IoSendSharp />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
