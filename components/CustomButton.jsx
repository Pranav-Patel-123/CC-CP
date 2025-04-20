"use client"
import { motion } from "framer-motion"

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <motion.button
      type={btnType}
      title={title}
      className={`font-medium text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {title}
    </motion.button>
  )
}

export default CustomButton
