import './App.css';
import Layout from './Components/Layout';
import { motion } from "framer-motion"
import { useEffect, useState } from 'react';
import Post from './Components/Post';
import PostUpload from './Components/PostUpload';

const BASE_URL = 'http://localhost:8000/'

function App() {

  const [post, setPost] = useState([])

  const getPosts = async () => {
    try {
      const res = await fetch(BASE_URL + 'post/all')
      const data = await res.json()
      const sortedData = await data.sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      setPost(sortedData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  },[])

  return (
    <Layout BASE_URL={BASE_URL}>
      <PostUpload
        BASE_URL={BASE_URL}
      />
      <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
      >{post.map(item => (
        <Post
          key={item.id}
          img_url={item.image_url} 
          caption={item.caption}
          user={item.user.username}
          timestamp={item.timestamp}
          comments={item.comments}
        />
      ))}</motion.div>
    </Layout>
  );
}

export default App;
