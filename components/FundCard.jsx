"use client"
import { motion } from "framer-motion"
import { daysLeft } from "../utils"

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  category,
  votes,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline)

  // Support IPFS URLs if needed
  const imageUrl = image?.startsWith("ipfs://") ? image.replace("ipfs://", "https://ipfs.io/ipfs/") : image

  return (
    <motion.div
      className="w-full rounded-[15px] overflow-hidden card-shadow hover-scale card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Campaign image */}
      <div className="relative overflow-hidden h-[180px]">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt="fund"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-[#00f0ff] text-black text-xs font-bold px-3 py-1 rounded-full">{category}</span>
        </div>
      </div>

      <div className="flex flex-col p-5">
        {/* Title & description */}
        <div className="block mb-4">
          <h3 className="font-semibold text-[18px] text-white leading-[26px] mb-1">{title}</h3>
          <p className="font-normal text-[#b0b0b0] leading-[18px] line-clamp-2">{description}</p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#3a3a43] h-2 rounded-full mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#8c6dfd] rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min(100, (Number.parseFloat(amountCollected) / Number.parseFloat(target)) * 100)}%`,
            }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Raised / target & days left */}
        <div className="flex justify-between flex-wrap mt-2 gap-2">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[16px] text-[#00f0ff] leading-[22px]">{amountCollected} ETH</h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#b0b0b0] sm:max-w-[120px] truncate">
              Raised of {target} ETH
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold text-[16px] text-[#8c6dfd] leading-[22px]">{remainingDays}</h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#b0b0b0] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        {/* Owner avatar & address */}
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src="/assets/thirdweb.png" alt="user" className="w-[24px] h-[24px] object-contain rounded-full" />
          </div>
          <p className="flex-1 font-normal text-[12px] text-[#b0b0b0] truncate">
            by{" "}
            <span className="text-[#00f0ff]">
              {owner.slice(0, 6)}...{owner.slice(-4)}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default FundCard
