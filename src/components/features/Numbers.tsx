"use client"
import { useEffect, useRef, useState } from "react"
import CountUp from "react-countup"

const stats = [
  { value: 15, label: "lat na rynku" },
  { value: 80, label: "klimatyzacji w roku" },
  { value: 50, label: "pomp ciepła w roku" },
  { value: "∞", label: "zadowolonych klientów", noPlus: true },
]

const AnimatedNumbers = () => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true)
    }, { threshold: 0.7 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex bg-bbrand-50 py-8 px-12 flex-col gap-8 items-center xl:flex-row rounded-3xl justify-center">
      {stats.map(({ value, label, noPlus }, index) => (
        <div key={index} ref={index === 0 ? ref : null} className="flex flex-col gap-2 xl:gap-4 items-center xl:pr-8 xl:border-r border-border last:border-r-0">
          <span className="font-extrabold text-accent text-3xl">
            {typeof value === "number" && isInView ? <CountUp duration={10} start={0} end={value} /> : value} {noPlus ? "" : "+"}
          </span>
          <span className="!text-white">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default AnimatedNumbers
