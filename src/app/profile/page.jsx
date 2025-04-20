"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useStateContext } from "../../../context"
import { DisplayCampaigns } from "../../../components"

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalRaised: 0,
    activeCampaigns: 0,
  })

  const { address, contract, getUserCampaigns } = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    try {
      const campaigns = await getUserCampaigns()
      setCampaigns(campaigns)

      // Calculate stats
      const totalRaised = campaigns.reduce((sum, campaign) => sum + Number.parseFloat(campaign.amountCollected), 0)
      const activeCampaigns = campaigns.filter((campaign) => {
        const deadline = new Date(campaign.deadline)
        return deadline > new Date()
      }).length

      setStats({
        totalCampaigns: campaigns.length,
        totalRaised,
        activeCampaigns,
      })
    } catch (error) {
      console.error("Error fetching campaigns:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  return (
    <motion.div
      className="min-h-screen py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <motion.div
        className="glass-effect p-8 rounded-xl mb-8 border border-[#3a3a43]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#8c6dfd] flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src="/assets/thirdweb.png" alt="Profile" className="w-16 h-16 rounded-full" />
          </motion.div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-[#b0b0b0] break-all">{address}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43] text-center"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-[#00f0ff]">{stats.totalCampaigns}</h3>
            <p className="text-[#b0b0b0]">Total Campaigns</p>
          </motion.div>

          <motion.div
            className="p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43] text-center"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-[#8c6dfd]">{stats.totalRaised.toFixed(4)} ETH</h3>
            <p className="text-[#b0b0b0]">Total Raised</p>
          </motion.div>

          <motion.div
            className="p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43] text-center"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-[#00ff94]">{stats.activeCampaigns}</h3>
            <p className="text-[#b0b0b0]">Active Campaigns</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* My Campaigns */}
      <DisplayCampaigns isLoading={isLoading} campaigns={campaigns} title="My Campaigns" />

      {campaigns.length === 0 && !isLoading && (
        <motion.div
          className="text-center mt-12 p-8 glass-effect rounded-xl border border-[#3a3a43]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl text-[#b0b0b0] mb-4">You haven't created any campaigns yet</h3>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/create-campaign">
              <button className="btn-accent px-6 py-3">Create Your First Campaign</button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Profile
