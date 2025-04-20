import "@/app/globals.css"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import ClientProviders from "../../components/ClientProviders"
import { SparklesCore } from "../../components/ui/sparkles"

export const metadata = {
  title: "ETH FUND",
  description: "Decentralized crowdfunding platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
        <ClientProviders>
          <div className="relative min-h-screen flex flex-row">
            {/* Background sparkles effect */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={70}
                className="w-full h-full"
                particleColor="#8c6dfd"
              />
            </div>

            <div className="sm:flex hidden relative z-10">
              <Sidebar />
            </div>
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:px-6 px-4 relative z-10">
              <Navbar />
              <main className="animate-fadeIn">{children}</main>
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
