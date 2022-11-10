import React from 'react'
import { IoIosMore } from "react-icons/io";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";


export default function Post({ img_url, caption, user, timestamp, comments }) {
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div class="flex flex-col bg-white hover:bg-gray-100 border rounded-lg shadow-md w-1/3 mb-4">
            <div className='my-3 mx-3 font-medium cursor-pointer flex flex-row justify-between items-center text-l'>
                <p>{user}</p>
                <IoIosMore className='text-xl' />
            </div>
            <div className=''>
                <img src={img_url} class="object-cover w-full max-h-fit" alt="Post"></img>
            </div>
            <div className='flex felx-row text-2xl font-bold my-2'>
                <FcLikePlaceholder className='ml-3 hover:cursor-pointer' />
                <FaRegComment className='ml-3 hover:cursor-pointer' />
            </div>
            <div className='flex flex-col mx-3 text-md'>
                <p className='font-semibold'>{user}</p>
                <p className='my-1'>{caption}</p>
            </div>
            <p className='mx-3 font-thin text-sm text-gray-500'>{formatDate(timestamp)}</p>
            <div className='my-2 border-t border-gray-200'>
                {
                    comments.map(item => (
                        <p className='mx-3 text-md font-normal'><span className='font-semibold'>{item.username}</span> {item.text}</p>
                    ))
                }
            </div>
        </div>
    )
}
