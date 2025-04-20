"use client"

import { motion } from "framer-motion"

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 glass-effect flex items-center justify-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-[100px] h-[100px] border-t-4 border-b-4 border-[#00f0ff] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-[20px] font-bold text-[20px] text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Transaction is in progress
        <br />
        Please wait...
      </motion.p>
    </motion.div>
  )
}

export default Loader
