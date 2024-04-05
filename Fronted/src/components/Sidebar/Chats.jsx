import React from 'react'
import Chat from './Chat'
import useGetChat from '../../hooks/useGetChat';
import { getRandomEmoji } from '../../utils/emoji';

const Chats = () => {
  const { loading, chat } = useGetChat();
  return (
		<>
		<div className='py-2 flex flex-col overflow-auto'> 
			{chat.map((chat, idx) => (
				<Chat
					key={chat._id}
					chat={chat}
          emoji={getRandomEmoji()}
					lastIdx={idx === chat.length - 1}
				/>
			))}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
		</>
  )
}

export default Chats