"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"
import { motion } from "framer-motion"

import { useStateContext } from "../../../context"
import { CustomButton, FormField, Loader } from "../../../components"
import { checkIfImage } from "../../../utils"

const CreateCampaign = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    category: "",
    website: "",
    twitter: "",
    linkedin: "",
    documentLink: "",
  })

  const { createCampaign, getCategories } = useStateContext()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(setCategories)
  }, [getCategories])

  const handleFormFieldChange = (field, e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1) Validate image URL
    const isValidImage = await new Promise((resolve) => checkIfImage(form.image, resolve))
    if (!isValidImage) {
      alert("Campaign image URL is invalid")
      setForm((f) => ({ ...f, image: "" }))
      return
    }

    // 2) Ensure required fields
    const required = ["title", "description", "target", "deadline", "image", "category"]
    for (const key of required) {
      if (!form[key]) {
        alert(`Please fill in the ${key} field.`)
        return
      }
    }

    setIsLoading(true)
    try {
      // 3) Create on‑chain, passing optional links (empty string if omitted)
      const campaignId = await createCampaign({
        ...form,
        target: ethers.utils.parseUnits(form.target, 18),
      })

      console.log("New campaign ID:", campaignId)
      router.push("/")
    } catch (err) {
      console.error(err)
      alert(err?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="glass-effect flex flex-col items-center rounded-xl shadow-2xl p-8 border border-[#3a3a43]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && <Loader />}

      <motion.h1
        className="text-3xl font-bold gradient-text mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Launch Your Campaign
      </motion.h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* — REQUIRED FIELDS — */}
          <FormField
            labelName="Campaign Name *"
            placeholder="Campaign for a cause"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
            required
          />

          <FormField
            labelName="Funding Goal (ETH) *"
            placeholder="e.g., 0.75"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
            required
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <FormField
            labelName="Description *"
            placeholder="Tell us your story"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange("description", e)}
            required
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FormField
            labelName="End Date *"
            placeholder="Select a date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
            required
          />

          <FormField
            labelName="Image URL *"
            placeholder="https://your-image-url.com"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
            required
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <label className="font-medium text-[14px] leading-[22px] text-white mb-[10px] block">Category *</label>
          <select
            value={form.category}
            onChange={(e) => handleFormFieldChange("category", e)}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-[#1c1c24] font-normal text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] w-full focus:border-[#00f0ff] transition-colors duration-300"
            required
          >
            <option value="">Choose a category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* — OPTIONAL SOCIAL & DOC LINKS — */}
          <FormField
            labelName="Website URL"
            placeholder="https://your-site.com"
            inputType="url"
            value={form.website}
            handleChange={(e) => handleFormFieldChange("website", e)}
          />
          <FormField
            labelName="Twitter URL"
            placeholder="https://twitter.com/..."
            inputType="url"
            value={form.twitter}
            handleChange={(e) => handleFormFieldChange("twitter", e)}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <FormField
            labelName="LinkedIn URL"
            placeholder="https://linkedin.com/in/..."
            inputType="url"
            value={form.linkedin}
            handleChange={(e) => handleFormFieldChange("linkedin", e)}
          />
          <FormField
            labelName="Document Link (PDF)"
            placeholder="https://example.com/doc.pdf"
            inputType="url"
            value={form.documentLink}
            handleChange={(e) => handleFormFieldChange("documentLink", e)}
          />
        </motion.div>

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomButton btnType="submit" title="Create Campaign" styles="btn-accent px-8 py-4 text-lg" />
        </motion.div>
      </form>
    </motion.div>
  )
}

export default CreateCampaign
