"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import "./style.css"
import { navlinks } from "../constants"

const Sidebar = () => {
  const router = useRouter()
  const [isActive, setIsActive] = useState("dashboard")
  const [hoveredIcon, setHoveredIcon] = useState(null)

  const Icon = ({ styles, name, imgUrl, isActive, handleClick }) => {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
      <motion.div
        className={`relative w-[48px] h-[48px] rounded-[10px] ${
          isActive ? "bg-gradient-to-r from-[#8c6dfd] to-[#00f0ff]" : "bg-[#1a1a1a]"
        } flex justify-center items-center cursor-pointer ${styles}`}
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="tooltip absolute left-full ml-2 px-3 py-1 text-sm bg-[#1a1a1a] text-white rounded-md shadow-lg z-50 whitespace-nowrap border border-[#3a3a43]"
          >
            {name}
          </motion.span>
        )}
        <Image
          src={imgUrl || "/placeholder.svg"}
          alt={name}
          width={24}
          height={24}
          className={`object-contain ${isActive ? "" : "grayscale"} transition-all duration-300`}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center flex-col sticky top-5 h-[93vh]"
    >
      {/* Logo */}
      <Link href="/">
        <motion.div onClick={() => setIsActive("logo")} whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
          <Icon
            styles="w-[52px] h-[52px] bg-gradient-to-r from-[#00f0ff] to-[#8c6dfd]"
            imgUrl="/assets/logo.svg"
            name="logo"
            isActive={true}
          />
        </motion.div>
      </Link>

      {/* Navigation Icons */}
      <motion.div
        className="flex-1 flex flex-col justify-between items-center glass-effect rounded-[20px] w-[76px] py-6 mt-12 border border-[#3a3a43]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex flex-col justify-center items-center gap-6">
          {navlinks.map((link, index) => (
            <motion.div
              key={link.name}
              className="tooltip-container relative"
              onMouseEnter={() => setHoveredIcon(link.name)}
              onMouseLeave={() => setHoveredIcon(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Icon
                styles=""
                name={link.name}
                imgUrl={link.imgUrl}
                isActive={isActive === link.name}
                handleClick={() => {
                  setIsActive(link.name)
                  const route = link.name === "dashboard" ? "/" : link.link
                  router.push(route)
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Sidebar
