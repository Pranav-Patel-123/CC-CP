"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { useStateContext } from "../context"
import { CustomButton } from "./"
import { navlinks } from "../constants"

const Navbar = () => {
  const router = useRouter()
  const [isActive, setIsActive] = useState("dashboard")
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualAddress, setManualAddress] = useState("")
  const [scrolled, setScrolled] = useState(false)

  const { address, connect, disconnect } = useStateContext()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMainButton = async () => {
    if (address) {
      router.push("/create-campaign")
    } else {
      try {
        if (disconnect) await disconnect()
        localStorage.removeItem("thirdweb_auth_token")
        await connect()
      } catch (error) {
        console.error("Error during wallet connection:", error)
      }
    }
  }

  const handleDisconnect = async () => {
    try {
      if (disconnect) await disconnect()
    } catch (error) {
      console.error("Error during disconnect:", error)
    } finally {
      setDropdownOpen(false)
    }
  }

  const handleChangeWalletClick = () => {
    setDropdownOpen(false)
    setShowManualInput(true)
  }

  const handleManualConnect = async () => {
    try {
      if (disconnect) await disconnect()
      localStorage.removeItem("thirdweb_auth_token")
      console.log("Manual connect to:", manualAddress)
      setShowManualInput(false)
    } catch (error) {
      console.error("Manual connection error:", error)
    }
  }

  const renderDropdown = () => (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-[52px] h-[52px] rounded-full bg-gradient-card flex justify-center items-center cursor-pointer border border-[#3a3a43] hover:border-[#8c6dfd] transition-all duration-300"
      >
        <Image src="/assets/thirdweb.png" alt="user" width={30} height={30} className="rounded-full" />
      </motion.div>

      {dropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-14 right-0 w-48 glass-effect border border-[#3a3a43] rounded-xl shadow-lg z-50 overflow-hidden"
        >
          <button
            onClick={handleDisconnect}
            className="w-full px-4 py-3 text-left text-white hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            Disconnect
          </button>
          <button
            onClick={handleChangeWalletClick}
            className="w-full px-4 py-3 text-left text-white hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            Change Wallet
          </button>
        </motion.div>
      )}
    </div>
  )

  const renderManualInput = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-effect p-6 rounded-xl shadow-2xl w-80 border border-[#3a3a43]"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">Enter New Wallet Address</h2>
        <input
          type="text"
          placeholder="Wallet Address"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          className="input-primary w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowManualInput(false)}
            className="px-4 py-2 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors duration-200"
          >
            Cancel
          </button>
          <button onClick={handleManualConnect} className="btn-primary">
            Connect
          </button>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex md:flex-row flex-col-reverse justify-between items-center mb-[35px] gap-6 py-4 sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "glass-effect px-4 rounded-xl" : ""
      }`}
    >
      <div className="flex items-center">
        <motion.div
          className="text-[#00f0ff] text-[32px] font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Eth-FUND
        </motion.div>
      </div>

      <div className="sm:flex hidden flex-row items-center gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect wallet"}
          styles={address ? "btn-accent" : "btn-primary"}
          handleClick={handleMainButton}
        />
        {address && renderDropdown()}
      </div>

      <div className="sm:hidden flex justify-between items-center relative w-full">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-[40px] h-[40px] rounded-[10px] bg-gradient-card flex justify-center items-center"
        >
          <Image src="/assets/logo.png" alt="logo" width={24} height={24} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setToggleDrawer(!toggleDrawer)}
        >
          <Image src="/assets/menu.png" alt="menu" width={34} height={34} className="cursor-pointer" />
        </motion.div>

        <motion.div
          className={`absolute top-[60px] right-0 left-0 glass-effect z-10 shadow-2xl py-4 rounded-xl border border-[#3a3a43] ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-500`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <motion.li
                key={link.name}
                className={`flex p-4 ${isActive === link.name ? "bg-[#2a2a2a]" : ""} hover:bg-[#2a2a2a] transition-colors duration-200`}
                onClick={() => {
                  setIsActive(link.name)
                  setToggleDrawer(false)
                  router.push(link.link)
                }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={link.imgUrl || "/placeholder.svg"}
                  alt={link.name}
                  width={24}
                  height={24}
                  className={`${isActive === link.name ? "grayscale-0" : "grayscale"}`}
                />
                <p
                  className={`ml-[20px] font-medium text-[14px] ${
                    isActive === link.name ? "text-[#00f0ff]" : "text-[#b0b0b0]"
                  }`}
                >
                  {link.name}
                </p>
              </motion.li>
            ))}
          </ul>
          <div className="flex mx-4 items-center gap-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect wallet"}
              styles={address ? "btn-accent" : "btn-primary"}
              handleClick={handleMainButton}
            />
            {address && renderDropdown()}
          </div>
        </motion.div>
      </div>

      {showManualInput && renderManualInput()}
    </motion.div>
  )
}

export default Navbar
