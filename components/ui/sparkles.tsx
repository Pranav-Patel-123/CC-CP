"use client"

import { useEffect, useRef, useState } from "react"
import { useMousePosition } from "../../hooks/use-mouse-position"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  speed?: number
  particleBlur?: number
}

export const SparklesCore = ({
  id = "tsparticles",
  className = "",
  background = "#000",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 1,
  particleColor = "#fff",
  particleDensity = 100,
  particleBlur = 0,
}: SparklesProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const mousePosition = useMousePosition()
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
    }>
  >([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleResize = () => {
      if (container) {
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Initialize particles
    const particleCount = Math.floor((canvasSize.width * canvasSize.height) / 10000) * (particleDensity / 100)
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvasSize.width,
      y: Math.random() * canvasSize.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
    }))

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [canvasSize.width, canvasSize.height, maxSize, minSize, particleDensity, speed])

  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    const ctx = canvas?.getContext("2d")

    if (!ctx || !canvas) return

    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Mouse interaction - particles near mouse move away slightly
        if (mousePosition.x && mousePosition.y) {
          const dx = particle.x - mousePosition.x
          const dy = particle.y - mousePosition.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 100
            particle.x += Math.cos(angle) * force
            particle.y += Math.sin(angle) * force
          }
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor

        if (particleBlur > 0) {
          ctx.filter = `blur(${particleBlur}px)`
        }

        ctx.fill()
        ctx.filter = "none"
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [background, canvasSize.height, canvasSize.width, id, particleBlur, particleColor, mousePosition])

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`}>
      <canvas id={id} className="block w-full h-full" />
    </div>
  )
}
