import React, { useContext, useEffect, useState} from 'react'
import { motion } from "framer-motion"
import { User } from '../Utils/User'

export default function Layout(props) {

    const { dispatch } = useContext(User)

    const [menuVisibility, setMenuVisibility] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [authToken, setAuthToken] = useState(null)
    const [authErrorMessage, setAuthErrorMessage] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            setAuthToken(localStorage.getItem('authToken'))
        }
    }, [authToken])

    const logIn = async (e) => {
        e?.preventDefault()

        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const requestOptions = {
            method: 'POST',
            body: formData
        }

        try {
            const response = await fetch(props.BASE_URL + 'login', requestOptions)
            const data = await response.json()
            if (response.ok) {
                // console.log(data)
                setShowLoginModal(false)
                setAuthToken(data.access_token)
                setAuthErrorMessage(null)
                localStorage.setItem('authToken', data.access_token)
                localStorage.setItem('authTokenType', data.token_type)
                localStorage.setItem('userId', data.user_id)
                localStorage.setItem('username', data.username)
                dispatch({ type: 'USER_LOGIN', payload: data })
                window.location.reload()
                return data
            }
            throw response
        } catch (error) {
            console.log(error);
            setAuthErrorMessage(error)
        }
    }

    const signUp = async (e) => {
        e?.preventDefault()

        const json_string = JSON.stringify({
            username: username,
            email: email,
            password: password,
            image_url: ''
        })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_string
        }

        try {
            const response = await fetch(props.BASE_URL + 'user/sign_up', requestOptions)
            const data = await response.json()
            if (response.ok) {
                setShowSignUpModal(false)
                setAuthToken(data.access_token)
                setAuthErrorMessage(null)
                localStorage.setItem('authToken', data.access_token)
                return data
            }
            throw response
        } catch (error) {
            console.log(error);
            setAuthErrorMessage(error)
        }
    }

    const logOut = async () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authTokenType')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        setAuthToken(null)
        dispatch({ type: 'USER_LOGOUT' })
        window.location.reload()
    }

    return (
        <>
            <nav className="bg-white px-2 sm:px-4 py-2.5 sticky z-50 w-full top-0 border-b border-gray-200 drop-shadow-sm">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <div className='w-1/3 flex justify-start'>
                        <a href="/" className="flex items-center w-30">
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ShareInside</span>
                        </a>
                    </div>
                    <div className='invisible sm:visible w-1/3 flex justify-center'>
                        <form className="flex items-center">   
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                            </div>
                        </form>
                    </div>
                    <div className='w-1/3 flex justify-end'>
                        <div className="flex gap-3">
                            {
                                authToken ?
                                <>
                                    <motion.button
                                        onClick={logOut}
                                        type="button"
                                        className="invisible sm:visible text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.1 },
                                          }}
                                        whileTap={{ scale: 0.9 }}
                                    >Log Out</motion.button>
                                    <button onClick={() => setMenuVisibility(!menuVisibility)} data-collapse-toggle="navbar-sticky" type="button" className="sm:invisible inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                    </button>
                                </> :
                                <>
                                    <motion.button
                                        onClick={() => setShowLoginModal(!showLoginModal)}
                                        type="button"
                                        className="invisible sm:visible text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >Log In</motion.button>
                                    <motion.button
                                        onClick={() => setShowSignUpModal(!showSignUpModal)}
                                        type="button"
                                        className="invisible sm:visible text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-700 border border-blue-700 hover:bg-blue-100 hover:bg-clip-text focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.1 },
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >Sign Up</motion.button>
                                    <button onClick={() => setMenuVisibility(!menuVisibility)} data-collapse-toggle="navbar-sticky" type="button" className="sm:invisible inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
            {
                    menuVisibility && (
                        <motion.div
                            className='p-2 sm:invisible'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {
                                authToken ? 
                                <div onClick={logOut} className='sm:invisible py-1 w-full hover:bg-gray-100 text-lg font-semibold'>Log out</div> :
                                <>
                                    <div onClick={() => setShowLoginModal(true)} className='sm:invisible py-1 w-full hover:bg-gray-100 text-lg font-semibold'>Log in</div>
                                    <div onClick={() => setShowSignUpModal(true)} className='py-1 w-full hover:bg-gray-100 text-lg font-semibold'>Sign in</div>   
                                </>
                            } 
                        </motion.div>
                    )
            }
            {
                showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4  }}
                        id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex justify-center items-center backdrop-blur-md overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setShowLoginModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="py-6 px-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Log in to our platform</h3>
                                    {
                                        authErrorMessage && (
                                            <motion.p
                                                className='text-red-600 text-sm mb-2 font-normal'
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ ease: "easeOut", duration: 0.2 }}
                                            >Wrong username or password</motion.p>
                                        )
                                    }
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
                                            <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required></input>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required></input>
                                                </div>
                                                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                            </div>
                                            <a href="/" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                                        </div>
                                        <button type="submit" onClick={logIn} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                            Not registered? <span onClick={() => {
                                                setShowLoginModal(false)
                                                setShowSignUpModal(true)
                                            }} className="text-blue-700 hover:underline dark:text-blue-500 hover:cursor-pointer">Create an account</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div> 
                )
            }
            {
                showSignUpModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4  }}
                        id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex justify-center items-center backdrop-blur-md overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setShowSignUpModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="py-6 px-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your e-mail</label>
                                            <input
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder="e-mail"
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
                                            <input
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                                placeholder="username"
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                            <input
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password again</label>
                                            <input
                                                value={passwordRepeat}
                                                onChange={e => setPasswordRepeat(e.target.value)}
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className={
                                                    password !== passwordRepeat ?
                                                    "bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-2 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" :
                                                    "bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-2 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                }
                                                required
                                            ></input>
                                        </div>
                                        <button onClick={signUp} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create your account</button>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                            Already registered? <span onClick={() => {
                                                setShowSignUpModal(false)
                                                setShowLoginModal(true)
                                            }} className="text-blue-700 hover:underline dark:text-blue-500 hover:cursor-pointer">Log in</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div> 
                )
            }
            <div className='mt-5'>
                {props.children}
            </div>
        </>
  )
}
