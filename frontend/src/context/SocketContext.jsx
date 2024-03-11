/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const { authUser } = useAuthContext();

	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		let socket = null;
		if (authUser) {
			socket = io("http://localhost:5000", {
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socket);

			// listen to events(can be used both on server and client)
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});
		}

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
