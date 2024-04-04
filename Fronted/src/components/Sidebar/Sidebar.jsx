import React from 'react'
import SearchInput from './SearchInput'
import Chats from './Chats'
import Logout from './Logout'
const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
		<SearchInput />
/		<div className='divider px-3'></div>
			<Chats />
			<Logout />
</div>

  )
}

export default Sidebar