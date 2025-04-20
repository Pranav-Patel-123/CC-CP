"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useStateContext } from "../../../context"
import DisplayCampaigns from "../../../components/DisplayCampaigns"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState([])
  const { address, contract, getCampaigns, getCategories, getCampaignsByCategory, getTotalVotes } = useStateContext()

  const [uniqueDonations, setUniqueDonations] = useState(0)
  const [projectsRaisedFunds, setProjectsRaisedFunds] = useState(0)
  const statsRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  // Fetch total votes on mount
  useEffect(() => {
    const fetchVotesCount = async () => {
      try {
        const totalVotes = await getTotalVotes()
        setUniqueDonations(totalVotes)
      } catch (error) {
        console.error("Error fetching total votes:", error)
      }
    }
    fetchVotesCount()
  }, [getTotalVotes])

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const fetched = selectedCategory ? await getCampaignsByCategory(selectedCategory) : await getCampaigns()
    setCampaigns(fetched)
    setIsLoading(false)
  }

  const fetchCategories = async () => {
    const list = await getCategories()
    setCategories(list)
  }

  useEffect(() => {
    if (contract) {
      fetchCampaigns()
      fetchCategories()
    }
  }, [address, contract, selectedCategory])

  useEffect(() => {
    setProjectsRaisedFunds(campaigns.filter((c) => Number.parseFloat(c.amountCollected) > 0).length)
  }, [campaigns])

  const animateCount = (target, setter) => {
    let start = 0
    const inc = Math.ceil(target / 50)
    const timer = setInterval(() => {
      start += inc
      if (start >= target) {
        setter(target)
        clearInterval(timer)
      } else {
        setter(start)
      }
    }, 20)
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-0">
      <motion.div
        className="max-w-[1440px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Stats Section */}
        <motion.div
          className="glass-effect p-8 rounded-xl mb-12 border border-[#3a3a43] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover & Support Amazing Projects
          </motion.h1>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43]">
              <h3 className="text-2xl font-bold text-[#00f0ff]">{campaigns.length}</h3>
              <p className="text-[#b0b0b0]">Total Campaigns</p>
            </div>
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43]">
              <h3 className="text-2xl font-bold text-[#8c6dfd]">{uniqueDonations}</h3>
              <p className="text-[#b0b0b0]">Total Votes</p>
            </div>
            <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43]">
              <h3 className="text-2xl font-bold text-[#00ff94]">{projectsRaisedFunds}</h3>
              <p className="text-[#b0b0b0]">Projects Funded</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-col mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-white">Filter by Category:</h2>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-3 px-4 appearance-none bg-[#1c1c24] text-white border border-[#3a3a43] rounded-lg focus:border-[#00f0ff] transition-colors duration-300"
            >
              <option value="">All Categories</option>
              {categories.length === 0 ? (
                <option value="">No categories found</option>
              ) : (
                categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-[#8c6dfd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Campaigns */}
        <DisplayCampaigns
          isLoading={isLoading}
          campaigns={campaigns}
          title={selectedCategory ? `${selectedCategory} Campaigns` : "All Campaigns"}
        />
      </motion.div>
    </div>
  )
}

export default Home
