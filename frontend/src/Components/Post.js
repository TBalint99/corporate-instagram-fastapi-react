import React, { useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Comment from './Comment';


export default function Post({ img_url, caption, user, timestamp, comments, postId, BASE_URL, userAuth, userAuthType }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [commentInterface, setCommentInterface] = useState(false)
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    
    //console.log(BASE_URL + `post/delete/${postId}`);

    const deletePost = async (postId) => {

        const requestOptions = {
            method: 'DELETE',
            headers: new Headers({
              'Authorization': userAuthType + ' ' + userAuth,
              'Content-Type': 'application/json'
            })
        }

        try {
            console.log(BASE_URL + `post/delete/${postId}`);
            const response = await fetch(BASE_URL + `post/delete/${postId}`, requestOptions)
            const data = await response.json()
            if (response.ok) {
                window.location.reload()
                return data
            }
            console.log(data);
            throw response
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col bg-white hover:bg-gray-100 border rounded-lg shadow-md lg:w-1/3 md:w-1/3 sm:w-4/5 mb-4 mx-1">
            <div className='my-3 mx-3 font-medium cursor-pointer flex flex-row justify-between items-center text-l'>
                <p>{user}</p>
                <button>
                    {
                        userAuth && (
                            <IoIosMore className='text-xl' onClick={() => setDropdownOpen(!dropdownOpen)} />
                        )
                    }
                </button>
                {
                    dropdownOpen && (
                        <div className="absolute z-10 mt-28 ml-44 sm:ml-96 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <p onClick={() => deletePost(postId)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</p>
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
                <FaRegComment
                    className='ml-3 hover:cursor-pointer'
                    onClick={() => {
                            if (userAuth) {
                                setCommentInterface(!commentInterface)
                            }
                        }
                    }
                />
            </div>
            <div className='flex flex-col mx-3 text-md'>
                <p className='font-semibold'>{user}</p>
                <p className='my-1'>{caption}</p>
            </div>
            <p className='mx-3 font-thin text-sm text-gray-500'>{formatDate(timestamp)}</p>
            {
                <Comment user={user} postId={postId} BASE_URL={BASE_URL} userAuthType={userAuthType} userAuth={userAuth} comments={comments} commentInterface={commentInterface} />
            }
        </div>
    )
}
