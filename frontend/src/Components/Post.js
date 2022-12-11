import React, { useEffect, useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Comment from './Comment';
import { motion } from "framer-motion"


export default function Post({ img_url, caption, user, timestamp, comments, postId, BASE_URL, userAuth, userAuthType, username }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [commentInterface, setCommentInterface] = useState(false)
    const [likes, setLikes] = useState([])
    const [userLike, setUserLike] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const getLikes = async (postId) => {
        try {
            const response = await fetch(BASE_URL + `like/all_likes/${postId}`)
            const data = await response.json()
            setLikes(data);
            const like = data.filter((item) => item.username === username)
            if (like.length !== 0 && userAuth) {
                setUserLike(true)
            }
            setLikesCount(Object.keys(data).length)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLikes(postId)
    },[])

    const handleLike = async () => {

        if (userAuth) {
            const json_string = JSON.stringify({
                'username': username,
                'post_id': postId
            })
    
            const requestOptions = {
                method: 'POST',
                headers: new Headers({
                  'Authorization': userAuthType + ' ' + userAuth,
                  'Content-Type': 'application/json'
                }),
                body: json_string
            }
    
            try {
                
                const response = await fetch(BASE_URL + 'like/like', requestOptions)
                const data = await response.json()
                setUserLike(true)
                setLikesCount(prevCount => prevCount + 1)
            } catch (error) {
                console.log(error);
            }  
        }
    }

    const handleDislike = async () => {

        const json_string = JSON.stringify({
            'username': username,
            'post_id': postId
        })

        const requestOptions = {
            method: 'DELETE',
            headers: new Headers({
              'Authorization': userAuthType + ' ' + userAuth,
              'Content-Type': 'application/json'
            }),
            body: json_string
        }

        try {
            
            const response = await fetch(BASE_URL + 'like/dislike', requestOptions)
            const data = await response.json()
            setUserLike(false)
            setLikesCount(prevCount => prevCount - 1)
        } catch (error) {
            console.log(error);
        }  
    }

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
                {
                    userLike === true ?
                    <motion.button
                        onClick={handleDislike}
                        type="button"
                        whileHover={{
                            scale: 1.3,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FcLike className='ml-3 hover:cursor-pointer' />
                    </motion.button> :
                    <motion.button
                        onClick={handleLike}
                        type="button"
                        whileHover={{
                            scale: 1.3,
                            transition: { duration: 0.1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FcLikePlaceholder className='ml-3 hover:cursor-pointer' />
                    </motion.button>
                }
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
            {
                likesCount !== 0 && <p className='mx-3 text-md font-semibold'>{likesCount} likes</p> 
            }
            <div className='flex flex-col mx-3 text-md'>
                <p className='font-semibold'>{user}</p>
                <p className='my-1'>{caption}</p>
            </div>
            <p className='mx-3 font-thin text-sm text-gray-500'>{formatDate(timestamp)}</p>
            {
                <Comment username={username} postId={postId} BASE_URL={BASE_URL} userAuthType={userAuthType} userAuth={userAuth} comments={comments} commentInterface={commentInterface} />
            }
        </div>
    )
}
