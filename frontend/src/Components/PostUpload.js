import React, { useContext, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import { User } from '../Utils/User';
import { motion } from "framer-motion"

const fileTypes = ["JPG", "PNG"];

export default function PostUpload({ BASE_URL }) {

    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [imageUploadVisibility, setImageUploadVisibility] = useState(false)
    const [postCaption, setPostCaption] = useState('')
    const { state } = useContext(User)
    const { userAuth, userAuthType, userId } = state

    //console.log(`${userAuthType} ${userAuth}`)

    const handleImageUpload = async (file) => {

        setImage(file)

        const formData = new FormData()
        formData.append('image', file)

        const requestOptions = {
            method: 'POST',
            body: formData
        }

        try {
            const response = await fetch(BASE_URL + 'post/upload_image', requestOptions)
            const data = await response.json()
            setImageUrl(data.filename)
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostUpload = async (e) => {

        e?.preventDefault()
        
        const json_string = JSON.stringify({
            'image_url': imageUrl,
            'image_url_type': 'relative',
            'caption': postCaption,
            'creator_id': userId
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
            if (imageUrl) {
                const response = await fetch(BASE_URL + 'post/create', requestOptions)
                const data = await response.json()
                console.log(data);
                window.location.reload()
            } else {
                alert('Upload image to create a post!')
            }
        } catch (error) {
            console.log(error);
        }        
    }

    //console.log(imageUrl);

    return (
        userAuth && (
            <div
                className='lg:w-1/3 md:w-1/3 sm:w-4/5 mx-auto mb-5'
            >
                {
                    imageUploadVisibility && (
                        <FileUploader
                        id="dropzone-file"
                        handleChange={handleImageUpload}
                        name="file"
                        types={fileTypes}
                        >
                            <motion.div
                                className="flex items-center justify-center mx-1"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">      
                                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                        {
                                            image ?
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Successfully</span> uploaded...</p>
                                            :
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        }
                                        <p className="text-xs text-gray-500 dark:text-gray-400">JPG or PNG (MAX. 800x400px)</p>
                                    </div>
                                </label>
                            </motion.div>
                        </FileUploader>
                    )
                }
                <form  className='mx-1 mt-2'>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea id="comment" rows="4" onChange={e => setPostCaption(e.target.value)} className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write your thoughts..." required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <motion.button
                                type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm "
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.1 },
                                  }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePostUpload}
                            >
                                Create post
                            </motion.button>
                            <div className="flex pl-0 space-x-1 sm:pl-2">
                                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Attach file</span>
                                </button>
                                <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Set location</span>
                                </button>
                                <button onClick={() => setImageUploadVisibility(!imageUploadVisibility)} type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Upload image</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    )
}
