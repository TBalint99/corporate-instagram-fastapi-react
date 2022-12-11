import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { FaPaperPlane } from "react-icons/fa";

export default function Comment({ username, postId, BASE_URL, userAuthType, userAuth, comments, commentInterface }) {

    const [newComment, setNewComment] = useState('')
    const [commentState, setCommentState] = useState([])

    useEffect(() => {
        let commentList = []
        comments.map((comment) => commentList.push(comment))
        setCommentState(commentList)
    },[])

    const handleComment = async (e) => {

        e?.preventDefault()
        
        const json_string = JSON.stringify({
            'username': username,
            'text': newComment,
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
            if (newComment) {
                const response = await fetch(BASE_URL + 'comment/create', requestOptions)
                const data = await response.json()
                setCommentState(prevState => [...prevState, data])
                setNewComment('')
            }
        } catch (error) {
            console.log(error);
        }        
    }

    return (
        <>
            <div className='my-2 border-t border-gray-200'>
                {
                    commentState.map(item => (
                        <p key={(Math.random() + 1).toString(36).substring(7)} className='mx-3 text-md font-normal'><span className='font-semibold'>{item.username}</span> {item.text}</p>
                    ))
                }
            </div>
            {
                commentInterface && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <form className="mx-3 mt-1 mb-2 pt-2 border-t border-gray-200 flex flex-row justify-center items-center">
                            <textarea rows="2" value={newComment} onChange={e => setNewComment(e.target.value)} className="w-full rounded-md px-3 py-2 mt-1 text-md font-light text-gray-900 bg-white border-0 outline-none dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Your comment..." required></textarea>
                            <motion.button
                                onClick={handleComment}
                                type="button"
                                whileHover={{
                                    scale: 1.3,
                                    transition: { duration: 0.1 },
                                }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaPaperPlane className='ml-2 text-lg' />
                            </motion.button>
                        </form>
                    </motion.div>
                )
            }
        </>
  )
}
