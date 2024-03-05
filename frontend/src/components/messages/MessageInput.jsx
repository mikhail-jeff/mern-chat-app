import { IoSendSharp } from "react-icons/io5";

const MessageInput = () => {
	return (
		<form className="px-4 my-3">
			<div className="w-full relative">
				<input
					type="text"
					placeholder="Send a message"
					className="w-full border bg-gray-600 p-2.5 border-gray-600 text-sm rounded-lg block text-white"
				/>

				<button
					type="submit"
					className="absolute inset-y-0 end-0 flex items-center pe-3">
					<IoSendSharp />
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
