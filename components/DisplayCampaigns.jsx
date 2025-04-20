"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import FundCard from "./FundCard"

const DisplayCampaigns = ({ isLoading, campaigns, title }) => {
  const router = useRouter()

  const handleNavigate = (campaign) => {
    router.push(`/campaign-details/${encodeURIComponent(campaign.pId)}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="w-full p-6 glass-effect rounded-2xl shadow-xl border border-[#3a3a43] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="font-semibold text-2xl text-white mb-6 border-b border-[#3a3a43] pb-2 gradient-text inline-block"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title} ({campaigns.length})
      </motion.h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00f0ff]"></div>
        </div>
      ) : campaigns.length === 0 ? (
        <motion.p
          className="text-lg text-center text-gray-400 py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          No campaigns available at the moment.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {campaigns.map((campaign, index) => (
            <motion.div key={campaign.pId} variants={item}>
              <FundCard {...campaign} handleClick={() => handleNavigate(campaign)} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-[#8c6dfd] italic text-base">Support a campaign today and make a difference!</p>
      </motion.div>
    </motion.div>
  )
}

export default DisplayCampaigns
