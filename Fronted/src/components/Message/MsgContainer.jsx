import React, { useEffect } from 'react'
import Msges from './Msges';
import MsgInput from './MsgInput';
import { TiMessages } from "react-icons/ti";
import useChat from '../../zustand/useChat';
import { useAuthContext } from '../../context/AuthContext';

const MsgContainer = () => {
	const { selectedChat, setSelectedChat } = useChat();

	useEffect(() => {
		// cleanup function (unmounts) basically user no longer availaible in browser
		return () => setSelectedChat(null);
	}, [setSelectedChat]);
  return (
    		<>
				<div className='md:min-w-[450px] flex flex-col'>
    			{
						!selectedChat ? (
							<NoChat />
						) : <>
    				{/* Header */}
    				<div className='bg-green-700 px-4 py-2 mb-2'>
    					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedChat.fullname}</span>
    				</div>
    				<Msges />
    				<MsgInput />
    			</>
					}
    		</div>
				</>
    	);
}

export default MsgContainer;

const NoChat = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullname} </p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
