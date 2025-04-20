"use client"
import { motion } from "framer-motion"

const News = () => {
  const hardcodedNews = [
    {
      title: "Climate Change and Its Impact on Global Agriculture",
      description:
        "As temperatures rise and weather patterns shift, global agriculture is facing unprecedented challenges.",
      url: "https://en.wikipedia.org/wiki/Effects_of_climate_change_on_agriculture",
      urlToImage: "https://khetigaadi.com/blog/wp-content/uploads/2018/07/Effect-of-Climate-Change-on-Agriculture.jpg",
    },
    {
      title: "New Discovery in Renewable Energy",
      description:
        "Renewable energy (or green energy) is energy from renewable natural resources that are replenished on a human timescale.",
      url: "https://en.wikipedia.org/wiki/Renewable_energy",
      urlToImage:
        "https://cisp.cachefly.net/assets/articles/images/resized/0001085446_resized_windturbinewithsolarpanelsandsunset1022.jpg",
    },
    {
      title: "India's Push for Sustainable Development",
      description:
        "Sustainable development is an approach to growth and human development that aims to meet the needs of the present without compromising the ability of future generations to meet their own needs.",
      url: "https://en.wikipedia.org/wiki/Sustainable_development",
      urlToImage: "https://reportyak.com/wp-content/uploads/2024/05/Sustainable-Development-Index-Report-Yak-Blog.webp",
    },
    {
      title: "Oceans Are Heating Up at an Alarming Rate",
      description:
        "Recent studies show that the world's oceans are absorbing heat faster than expected, leading to ecological changes.",
      url: "https://www.unesco.org/en/articles/new-unesco-report-rate-ocean-warming-doubled-20-years-rate-sea-level-rise-doubled-30-years",
      urlToImage:
        "https://www.unesco.org/sites/default/files/styles/best_image/article/2024-07/shutterstock_2285640349%20%281%29.jpg?itok=PA7PoR7Z",
    },
    {
      title: "The Future of Blockchain Technology",
      description:
        "Blockchain is undoubtedly one of the biggest inventions of the 21st century. More than just a buzzword, this technology has proven to be of practical significance with custom blockchain development taking center stage across various industries. ",
      url: "https://crustlab.com/blog/what-is-the-future-of-blockchain/",
      urlToImage: "https://blogs.iadb.org/caribbean-dev-trends/wp-content/uploads/sites/34/2017/12/Blockchain1.jpg",
    },
    {
      title: "The Future of Electric Vehicles in India",
      description:
        "Electric vehicles are becoming more popular in India, and the government is making moves to support their adoption.",
      url: "https://www.investindia.gov.in/team-india-blogs/indias-ev-economy-future-automotive-transportation",
      urlToImage:
        "https://poonawallafincorp.com/pfca/assets/blog_banner/blog_banner-electric-vehicle-in-india-desktop.jpg",
    },
  ]

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
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 gradient-text inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest News
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {hardcodedNews.map((article, index) => (
          <motion.div
            key={index}
            className="glass-effect rounded-xl overflow-hidden shadow-xl border border-[#3a3a43] hover-scale"
            variants={item}
          >
            {article.urlToImage && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.urlToImage || "/placeholder.svg"}
                  alt="Article"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl text-[#00f0ff] font-semibold mb-3">{article.title}</h3>
              <p className="text-[#e0e0e0] mb-4 line-clamp-3">{article.description}</p>
              <motion.a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[#8c6dfd] hover:text-[#00f0ff] transition-colors duration-300 font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Read more →
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default News
