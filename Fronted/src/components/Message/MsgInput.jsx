import React from 'react'
import { BsSend } from "react-icons/bs";
const MsgInput = () => {
  return (
    		<form className='px-4 my-3'>
    			<div className='w-full flex'>
    				<input
    					type='text'
    					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
    					placeholder='Send a message'
    				/>
    				<button type='submit' className='relative right-10 text-xl inset-y-0 end-0 flex items-center'>
    					<BsSend />
    				</button>
    			</div>
    		</form>
    	);
    
}

export default MsgInput