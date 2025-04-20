"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-hero opacity-50"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.h1
        className="text-5xl sm:text-7xl font-bold text-center mb-8 gradient-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to ETH FUND
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl mb-12 text-center max-w-2xl text-[#b0b0b0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Create, manage, and track campaigns effortlessly. Empower your ideas and make an impact today.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href="/home" passHref>
          <motion.button
            className="btn-primary px-8 py-4 text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
        <Link href="/news" passHref>
          <motion.button
            className="btn-secondary px-8 py-4 text-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(140, 109, 253, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Latest News
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          className="glass-effect p-6 rounded-xl border border-[#3a3a43]"
          whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0, 240, 255, 0.2)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#00f0ff80] flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </motion.div>
          <h2 className="text-xl font-semibold mb-4 text-white">Create Campaigns</h2>
          <p className="text-[#b0b0b0]">Launch fundraising campaigns quickly and reach your audience.</p>
        </motion.div>

        <motion.div
          className="glass-effect p-6 rounded-xl border border-[#3a3a43]"
          whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(140, 109, 253, 0.2)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#8c6dfd] to-[#8c6dfd80] flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </motion.div>
          <h2 className="text-xl font-semibold mb-4 text-white">Track Performance</h2>
          <p className="text-[#b0b0b0]">Monitor your campaign's progress with detailed insights.</p>
        </motion.div>

        <motion.div
          className="glass-effect p-6 rounded-xl border border-[#3a3a43]"
          whileHover={{ y: -10, boxShadow: "0 10px 30px rgba(0, 255, 148, 0.2)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00ff94] to-[#00ff9480] flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <h2 className="text-xl font-semibold mb-4 text-white">Stay Updated</h2>
          <p className="text-[#b0b0b0]">Follow the latest news to stay informed and inspired.</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-[#b0b0b0]">Powered by Ethereum blockchain technology</p>
      </motion.div>
    </div>
  )
}
