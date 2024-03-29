import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversations";
import useGetConversations from "../../hooks/useGetConversations";

import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");

	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!search) return;

		if (search.length < 3) {
			return toast.error("Must be at least 3 characters long");
		}

		// search algorithm
		const conversation = conversations.find((conversation) => conversation.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			return toast.error("No such user found");
		}
	};
	return (
		<form
			className="flex items-center gap-2"
			onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Search..."
				className="input focus:outline-none rounded-full bg-[#1D232A]"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				type="submit"
				className="btn btn-circle text-white">
				<IoSearchSharp className="w-6 h-6 outline-none" />
			</button>
		</form>
	);
};

export default SearchInput;
