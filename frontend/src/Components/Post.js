import React, { useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function Post({ img_url, caption, user, timestamp, comments }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className="flex flex-col bg-white hover:bg-gray-100 border rounded-lg shadow-md lg:w-1/3 md:w-1/3 sm:w-4/5 mb-4 mx-1">
            <div className='my-3 mx-3 font-medium cursor-pointer flex flex-row justify-between items-center text-l'>
                <p>{user}</p>
                <button>
                    <IoIosMore className='text-xl' onClick={() => setDropdownOpen(!dropdownOpen)} />
                </button>
                {
                    dropdownOpen && (
                        <div className="absolute z-10 mt-28 ml-44 sm:ml-96 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</p>
                                </li>
                                <li>
                                    <p className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</p>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
            <div className=''>
                <LazyLoadImage
                    src={img_url}
                    alt="Image Alt"
                    effect="blur"
                />
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
                        <p key={(Math.random() + 1).toString(36).substring(7)} className='mx-3 text-md font-normal'><span className='font-semibold'>{item.username}</span> {item.text}</p>
                    ))
                }
            </div>
        </div>
    )
}
