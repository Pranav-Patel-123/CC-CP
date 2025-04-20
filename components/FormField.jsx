"use client"
import { motion } from "framer-motion"

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange, required = false }) => {
  return (
    <motion.label
      className="flex-1 w-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {labelName && (
        <motion.span
          className="font-medium text-[14px] leading-[22px] text-white mb-[10px]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {labelName}
        </motion.span>
      )}
      {isTextArea ? (
        <motion.textarea
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          rows={10}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-[#1c1c24] font-normal text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] focus:border-[#00f0ff] transition-colors duration-300"
          whileFocus={{ borderColor: "#00f0ff", boxShadow: "0 0 0 2px rgba(0, 240, 255, 0.2)" }}
        />
      ) : (
        <motion.input
          required={required}
          type={inputType}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          step="0.1"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-[#1c1c24] font-normal text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] focus:border-[#00f0ff] transition-colors duration-300"
          whileFocus={{ borderColor: "#00f0ff", boxShadow: "0 0 0 2px rgba(0, 240, 255, 0.2)" }}
        />
      )}
    </motion.label>
  )
}

export default FormField
