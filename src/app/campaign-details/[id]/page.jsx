"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ethers } from "ethers"
import { motion } from "framer-motion"

import { useStateContext } from "../../../../context"
import { CustomButton, CountBox, Loader } from "../../../../components"
import { calculateBarPercentage, daysLeft } from "../../../../utils"

const CampaignDetails = () => {
  const router = useRouter()
  const { id } = useParams()

  const { getCampaigns, getDonators, getUserCampaigns, contract, address, donateToCampaign: donate } = useStateContext()

  const [campaign, setCampaign] = useState(null)
  const [userCampaignCount, setCampaignCount] = useState(0)
  const [donators, setDonators] = useState([])
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load the campaign by pId
  useEffect(() => {
    if (!contract || id == null) return
    ;(async () => {
      const all = await getCampaigns()
      const found = all.find((c) => String(c.pId) === id)
      setCampaign(found || null)
    })()
  }, [contract, id, getCampaigns])

  // Load donators + how many campaigns this creator has
  useEffect(() => {
    if (!contract || !campaign) return
    ;(async () => {
      // count how many on‑chain campaigns this owner has created
      const ownerCampaigns = await getUserCampaigns()
      setCampaignCount(ownerCampaigns.filter((c) => c.owner === campaign.owner).length)

      // fetch donators
      const dons = await getDonators(campaign.pId)
      setDonators(dons)
    })()
  }, [contract, campaign, address, getUserCampaigns, getDonators])

  // Donate handler
  const handleDonate = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount")
      return
    }
    setIsLoading(true)
    try {
      await donate(campaign.pId, amount)
      router.push("/") // back to home after donate
    } catch (err) {
      console.error("Donation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!campaign) return <Loader />

  // Support IPFS image URIs
  const imageUrl = campaign.image?.startsWith("ipfs://")
    ? campaign.image.replace("ipfs://", "https://ipfs.io/ipfs/")
    : campaign.image

  const progress = calculateBarPercentage(
    ethers.utils.parseEther(campaign.amountCollected).toString(),
    ethers.utils.parseEther(campaign.target).toString(),
  )
  const remainingDays = daysLeft(campaign.deadline)

  return (
    <motion.div
      className="min-h-screen px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && <Loader />}

      {/* Banner + Progress */}
      <motion.div
        className="relative rounded-2xl overflow-hidden mb-8 card-shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {imageUrl && (
          <img src={imageUrl || "/placeholder.svg"} alt="campaign" className="w-full h-[410px] object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{campaign.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#00f0ff] text-black text-xs font-bold px-3 py-1 rounded-full">
              {campaign.category}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative w-full h-[8px] bg-[#3a3a43] rounded-full mb-8"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="absolute h-full bg-gradient-to-r from-[#00f0ff] to-[#8c6dfd] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="flex flex-wrap justify-between items-center w-full mt-4 mb-12 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <CountBox title="Category" value={campaign.category || "—"} />
        <CountBox title="Days Left" value={remainingDays >= 0 ? remainingDays : "Ended"} />
        <CountBox title="Raised" value={`${campaign.amountCollected} ETH`} />
        <CountBox title="Donators" value={donators.length} />
      </motion.div>

      {/* Details + Links + Donate Form */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <motion.div
          className="flex-[2] flex flex-col gap-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Creator */}
          <section className="glass-effect p-6 rounded-xl border border-[#3a3a43]">
            <h4 className="text-[#00f0ff] uppercase font-semibold mb-4">Creator</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8c6dfd] to-[#00f0ff] flex items-center justify-center">
                <img src="/assets/thirdweb.png" alt="user" className="w-2/3 h-2/3 rounded-full" />
              </div>
              <div>
                <p className="font-semibold break-all text-white">{campaign.owner}</p>
                <p className="text-xs text-[#b0b0b0]">
                  {userCampaignCount} campaign{userCampaignCount !== 1 && "s"}
                </p>
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="glass-effect p-6 rounded-xl border border-[#3a3a43]">
            <h4 className="text-[#00f0ff] uppercase font-semibold mb-4">Story</h4>
            <p className="text-justify leading-7 text-[#e0e0e0]">{campaign.description}</p>
          </section>

          {/* Optional Links */}
          {(campaign.website || campaign.twitter || campaign.linkedin || campaign.documentLink) && (
            <section className="glass-effect p-6 rounded-xl border border-[#3a3a43]">
              <h4 className="text-[#00f0ff] uppercase font-semibold mb-4">Links</h4>
              <ul className="space-y-3">
                {campaign.website && (
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <a
                      href={campaign.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#8c6dfd] hover:text-[#00f0ff] transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      Website
                    </a>
                  </motion.li>
                )}
                {campaign.twitter && (
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <a
                      href={campaign.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#8c6dfd] hover:text-[#00f0ff] transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                      Twitter
                    </a>
                  </motion.li>
                )}
                {campaign.linkedin && (
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <a
                      href={campaign.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#8c6dfd] hover:text-[#00f0ff] transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      LinkedIn
                    </a>
                  </motion.li>
                )}
                {campaign.documentLink && (
                  <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <a
                      href={campaign.documentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#8c6dfd] hover:text-[#00f0ff] transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Supporting Document
                    </a>
                  </motion.li>
                )}
              </ul>
            </section>
          )}

          {/* Donators */}
          <section className="glass-effect p-6 rounded-xl border border-[#3a3a43]">
            <h4 className="text-[#00f0ff] uppercase font-semibold mb-4">Donations</h4>
            <div className="space-y-3">
              {donators.length > 0 ? (
                donators.map((d, i) => (
                  <motion.div
                    key={`${d.donator}-${i}`}
                    className="flex justify-between p-3 rounded-lg hover:bg-[#1a1a1a] transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-[#b0b0b0]">
                      {i + 1}.{" "}
                      <span className="text-[#00f0ff]">
                        {d.donator.slice(0, 6)}...{d.donator.slice(-4)}
                      </span>
                    </span>
                    <span className="text-[#8c6dfd] font-semibold">{d.donation} ETH</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#b0b0b0]">No donators yet. Be the first one!</p>
              )}
            </div>
          </section>
        </motion.div>

        {/* Right column: Fund form */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="sticky top-24">
            <h4 className="text-[#00f0ff] uppercase font-semibold mb-4">Fund Campaign</h4>
            <div className="glass-effect p-6 rounded-xl border border-[#3a3a43]">
              <motion.div
                className="mb-6 p-4 rounded-lg bg-[#1a1a1a] border border-[#3a3a43]"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-[#b0b0b0] mb-2">Back this project because you believe in it.</p>
                <p className="text-[#e0e0e0]">Support the creator and help bring this campaign to life.</p>
              </motion.div>

              <input
                type="number"
                placeholder="ETH 0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full py-3 px-4 border border-[#3a3a43] bg-[#1c1c24] rounded-lg text-white outline-none focus:border-[#00f0ff] transition-colors duration-300"
              />

              <motion.div className="mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <CustomButton
                  btnType="button"
                  title="Donate Now"
                  styles="btn-primary w-full"
                  handleClick={handleDonate}
                />
              </motion.div>

              <p className="mt-4 text-center text-[#b0b0b0] text-sm">Donations are secured by Ethereum blockchain</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CampaignDetails
