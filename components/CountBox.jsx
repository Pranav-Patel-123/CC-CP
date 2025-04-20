"use client"

import { motion } from "framer-motion"

const CountBox = ({ title, value }) => {
  return (
    <motion.div
      className="flex flex-col items-center w-[150px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.h4
        className="font-bold text-[30px] p-3 text-white glass-effect rounded-t-[10px] w-full text-center truncate border-t border-l border-r border-[#3a3a43]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {value}
      </motion.h4>
      <motion.p
        className="font-normal text-[16px] text-[#b0b0b0] bg-[#1a1a1a] px-3 py-2 w-full rounded-b-[10px] text-center border-b border-l border-r border-[#3a3a43]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.p>
    </motion.div>
  )
}

export default CountBox
