import { useState } from "react";
import { IoSend } from "react-icons/io5";
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
			className="px-2 my-2">
			<div className="w-full flex gap-2">
				<textarea
					type="text"
					placeholder="Write a message..."
					className="w-full border bg-[#1D232A] p-2.5 border-gray-600 text-md rounded-md block text-white max-h-12 outline-none"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>

				<button
					type="submit"
					className="flex items-center transform transition-transform active:scale-75 duration-300">
					{loading ? (
						<div className="loading loading-spinner"></div>
					) : (
						<IoSend
							size={30}
							className="text-[#1D232A]"
						/>
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
