import React from 'react'
import { motion } from "framer-motion"

export default function Comment() {
  return (
    <motion.div
        className="font-bold"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
    >hello!</motion.div>
  )
}
