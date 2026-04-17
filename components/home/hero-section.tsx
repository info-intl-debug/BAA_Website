'use client'

import { useEffect, useRef, useState } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────
type SlideType = "globe" | "map" | "diamond" | "plain"

interface Slide {
  id: number
  type: SlideType
  title: string
  subtitle: string
  bgImage: string
}

interface MapStateHotspot {
  name: string
  image: string
  x: number
  y: number
  description: string
  exports: string[]
}

// ─── Slides ──────────────────────────────────────────────────────────────────
const slides: Slide[] = [
  {
    id: 1,
    type: "globe",
    title: "Supporting Members\nSince 2016",
    subtitle: "Over 10+ years of championing the rights and interests of buying agents across every major industry sector.",
    bgImage: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: 2,
    type: "map",
    title: "Building Stronger\nTrade Relations",
    subtitle: "Fostering partnerships that drive growth, innovation, and excellence in India's thriving export ecosystem.",
    bgImage: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: 3,
    type: "diamond",
    title: "Connecting the Buying agents\n Community",
    subtitle: "Bridging the gap between international buyers and Indian exporters with trust, expertise, and decades of industry knowledge.",
    bgImage: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
]

// ─── Globe nodes ──────────────────────────────────────────────────────────────
const globeNodes = [
  { id: 1, label: "Advantage of product\ncustomization", icon: "⚙️", angle: -60, dist: 175 },
  { id: 2, label: "Flexibility\nof MOQ",                 icon: "📦", angle: 0,   dist: 195 },
  { id: 3, label: "Handcrafted products and\nincreasing demand", icon: "🤲", angle: -140, dist: 178 },
  { id: 4, label: "Hub of sustainable\nmaterials",       icon: "🌿", angle: 52,  dist: 190 },
  { id: 5, label: "Varied material and\nmixed material products", icon: "🎨", angle: 108, dist: 168 },
  { id: 6, label: "Spreading of sourcing in\nSouth East Asia",   icon: "🌏", angle: 152, dist: 178 },
]

// ─── Diamond images ───────────────────────────────────────────────────────────
const connectImages = [
  "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=400",
]

// ─── 17 State Hotspots ────────────────────────────────────────────────────────
// Coordinates are % of the map IMAGE itself (not the container).
// India map PNG used here has portrait orientation ~480×580 rendered size.
// Reference: standard India political map with states visible.
const mapStateHotspots: MapStateHotspot[] = [
  {
    name: "Jammu & Kashmir",
    image: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 38, y: 7,
    description: "Paradise on Earth — shawls, carpets & saffron",
    exports: ["Pashmina Shawls", "Kashmiri Carpets", "Saffron"],
  },
  {
    name: "Punjab",
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 36, y: 18,
    description: "Granary of India, rich in agriculture & sports goods",
    exports: ["Wheat", "Sports Goods", "Woollen Knitwear"],
  },
  {
    name: "Uttarakhand",
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 48, y: 20,
    description: "Himalayan herbs, organic produce & tourism",
    exports: ["Herbal Products", "Basmati Rice", "Honey"],
  },
  {
    name: "Rajasthan",
    image: "https://images.pexels.com/photos/784879/pexels-photo-784879.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 33, y: 33,
    description: "Largest state — textiles, gems & handicrafts",
    exports: ["Blue Pottery", "Bandhani Fabric", "Marble Crafts"],
  },
  {
    name: "Uttar Pradesh",
    image: "https://images.pexels.com/photos/4442188/pexels-photo-4442188.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 52, y: 30,
    description: "Hub of carpets, brassware & leather goods",
    exports: ["Leather Goods", "Carpets", "Brassware"],
  },
  {
    name: "Bihar",
    image: "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 61, y: 32,
    description: "Ancient land known for silk & Madhubani art",
    exports: ["Madhubani Art", "Silk", "Rice"],
  },
  {
    name: "Assam",
    image: "https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 73, y: 27,
    description: "Land of tea gardens & Muga silk production",
    exports: ["Assam Tea", "Muga Silk", "Bamboo Products"],
  },
  {
    name: "Gujarat",
    image: "https://images.pexels.com/photos/157879/gir-lion-gir-forest-lioness-157879.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 26, y: 44,
    description: "Industrial powerhouse & diamond hub of India",
    exports: ["Diamonds", "Textiles", "Petrochemicals"],
  },
  {
    name: "Madhya Pradesh",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 46, y: 42,
    description: "Heart of India — forest produce & handicrafts",
    exports: ["Chanderi Silk", "Soybean", "Handicrafts"],
  },
  {
    name: "West Bengal",
    image: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 66, y: 40,
    description: "Gateway to the East — jute & tea exports",
    exports: ["Jute Products", "Tea", "Leather"],
  },
  {
    name: "Odisha",
    image: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 62, y: 51,
    description: "Rich in minerals, tribal handicrafts & handlooms",
    exports: ["Iron Ore", "Sambalpuri Silk", "Handicrafts"],
  },
  {
    name: "Maharashtra",
    image: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 38, y: 55,
    description: "Financial capital — engineering & textiles powerhouse",
    exports: ["Engineering Goods", "Pharmaceuticals", "Cotton"],
  },
  {
    name: "Telangana",
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 50, y: 58,
    description: "Pharma & IT hub with rich textile heritage",
    exports: ["Pharmaceuticals", "Pochampally Silk", "Rice"],
  },
  {
    name: "Andhra Pradesh",
    image: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 54, y: 67,
    description: "Spices, aquaculture & granite exports",
    exports: ["Spices", "Aquaculture", "Granite"],
  },
  {
    name: "Karnataka",
    image: "https://images.pexels.com/photos/14081116/pexels-photo-14081116.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 40, y: 68,
    description: "Silicon Valley of India — silk & coffee hub",
    exports: ["Silk", "Coffee", "IT Services"],
  },
  {
    name: "Kerala",
    image: "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 38, y: 79,
    description: "Spice coast — coir, cashew & seafood",
    exports: ["Coir Products", "Cashews", "Seafood"],
  },
  {
    name: "Tamil Nadu",
    image: "https://images.pexels.com/photos/356831/pexels-photo-356831.jpeg?auto=compress&cs=tinysrgb&w=600",
    x: 47, y: 78,
    description: "Auto parts, textiles & leather exports",
    exports: ["Auto Components", "Leather", "Cotton Yarn"],
  },
]

// ─── Globe Visual ─────────────────────────────────────────────────────────────
function GlobeVisual() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const cx = 200
  const cy = 210
  const globeR = 88

  if (!mounted) return <div style={{ width: "100%", height: "100%" }} />

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <svg viewBox="0 0 420 430" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <clipPath id="globeClip">
            <circle cx={cx} cy={cy} r={globeR} />
          </clipPath>
        </defs>

        {globeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const ex = cx + Math.cos(rad) * globeR
          const ey = cy + Math.sin(rad) * globeR
          const nx = cx + Math.cos(rad) * node.dist
          const ny = cy + Math.sin(rad) * node.dist
          return <line key={node.id} x1={ex} y1={ey} x2={nx} y2={ny} stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        })}

        {[115, 142, 170].map((r, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))}

        <image
          href="/images/globe.png"
          x={cx - globeR}
          y={cy - globeR}
          width={globeR * 2}
          height={globeR * 2}
          clipPath="url(#globeClip)"
          preserveAspectRatio="xMidYMid slice"
        />
        <circle cx={cx - 24} cy={cy - 28} r={32} fill="rgba(255,255,255,0.08)" clipPath="url(#globeClip)" />
        <circle cx={cx} cy={cy} r={globeR} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

        <ellipse cx={cx} cy={cy} rx={globeR + 10} ry={18} fill="none" stroke="#E8620A" strokeWidth="3"
          style={{ animation: "orbitSpin 9s linear infinite", transformOrigin: `${cx}px ${cy}px` }} />

        {globeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const dx = cx + Math.cos(rad) * (node.dist - 30)
          const dy = cy + Math.sin(rad) * (node.dist - 30)
          return <circle key={node.id} cx={dx} cy={dy} r={4.5} fill="#E8620A" />
        })}

        {globeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const nx = cx + Math.cos(rad) * node.dist
          const ny = cy + Math.sin(rad) * node.dist
          const isRight = nx > cx
          const lines = node.label.split("\n")
          return (
            <g key={node.id} style={{ animation: `floatNode 4s ease-in-out ${node.id * 0.4}s infinite`, transformOrigin: `${nx}px ${ny}px` }}>
              <circle cx={nx} cy={ny} r={26} fill="rgba(220,232,242,0.93)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <text x={nx} y={ny + 6} textAnchor="middle" fontSize="17">{node.icon}</text>
              {lines.map((line, li) => (
                <text key={li}
                  x={isRight ? nx + 32 : nx - 32}
                  y={ny - 4 + li * 13}
                  textAnchor={isRight ? "start" : "end"}
                  fontSize="9.5" fill="rgba(255,255,255,0.92)"
                  style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── India Map Visual ─────────────────────────────────────────────────────────
function IndiaMapVisual() {
  const [mounted, setMounted] = useState(false)
  const [hoveredState, setHoveredState] = useState<MapStateHotspot | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [tooltipSide, setTooltipSide] = useState<"right" | "left">("right")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTooltipSide(x > rect.width * 0.58 ? "left" : "right")
    setTooltipPos({ x, y })
  }

  if (!mounted) return <div style={{ width: 480, height: 370 }} />

  return (
    <div className="relative flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredState(null)}
        style={{
          width: "min(100%, 500px)",
          height: "auto",
          minHeight: "480px",
          animation: "fadeUp 0.10s ease forwards",
        }}
      >
        <img
  src="/images/india-map.png"
  alt="India Map"
  style={{
    width: "100%",
    height: "auto",
    objectFit: "contain",
    filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
    display: "block",
  }}
        />

        {mapStateHotspots.map((state) => (
          <button
            key={state.name}
            type="button"
            aria-label={state.name}
            onMouseEnter={() => setHoveredState(state)}
            className="map-hotspot"
            style={{ left: `${state.x}%`, top: `${state.y}%` }}
          >
            <span />
          </button>
        ))}

        {hoveredState && (
          <div
            key={hoveredState.name}
            className="state-tooltip"
            style={{
              left: tooltipSide === "right" ? `${tooltipPos.x + 16}px` : `${tooltipPos.x - 16}px`,
              top: `${tooltipPos.y}px`,
              transform: tooltipSide === "right" ? "translateY(-50%)" : "translate(-100%, -50%)",
            }}
          >
            <img src={hoveredState.image} alt={hoveredState.name} />
            <div className="tooltip-body">
              <p className="tooltip-title">{hoveredState.name}</p>
              <p className="tooltip-desc">{hoveredState.description}</p>
              <div className="tooltip-tags">
                {hoveredState.exports.map((tag) => (
                  <span key={tag} className="tooltip-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Diamond Collage ──────────────────────────────────────────────────────────
function DiamondCollage({ visible, images }: { visible: boolean; images: string[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div style={{ width: 666, height: 378 }} />

  return (
    <div
      className="gallery-wrapper-outer"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      {images.map((src, i) => (
        <div key={i} className={`gallery-cell${visible ? " is-visible" : ""}`}>
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const [rightVisible, setRightVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRightVisible(true), 150)
    return () => clearTimeout(t)
  }, [current])

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setRightVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 450)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    if (index === current) return
    setFade(false)
    setRightVisible(false)
    setTimeout(() => { setCurrent(index); setFade(true) }, 350)
  }

  const slide = slides[current]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');

        @keyframes floatNode {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes orbitSpin {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cellIn {
          from { opacity: 0; transform: scale(0.72); }
          to   { opacity: 1; transform: scale(1); }
        }

        .hero-title {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }
        .slide-dot {
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        /* ── Hotspot dots ── */
        .map-hotspot {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 0;
          border-radius: 999px;
          padding: 0;
          cursor: pointer;
          background: rgba(232, 98, 10, 0.15);
          transform: translate(-50%, -50%);
          transition: transform 0.2s ease, background 0.2s ease;
          z-index: 12;
        }
        .map-hotspot span {
          position: absolute;
          inset: 4px;
          border-radius: 999px;
          background: #E8620A;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.28), 0 2px 8px rgba(0,0,0,0.3);
        }
        .map-hotspot::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 999px;
          border: 1px solid rgba(255,140,60,0.5);
          animation: hotspotPulse 1.8s ease-out infinite;
        }
        .map-hotspot:hover {
          outline: none;
          background: rgba(255,255,255,0.2);
          transform: translate(-50%, -50%) scale(1.4);
        }
        @keyframes hotspotPulse {
          from { opacity: 0.9; transform: scale(0.65); }
          to   { opacity: 0;   transform: scale(1.55); }
        }

        /* ── Cursor-following tooltip ── */
        .state-tooltip {
          position: absolute;
          width: 220px;
          background: rgba(12, 12, 18, 0.94);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          overflow: hidden;
          pointer-events: none;
          z-index: 30;
          box-shadow: 0 22px 50px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.05);
          animation: tooltipIn 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes tooltipIn {
          from { opacity: 0; scale: 0.86; }
          to   { opacity: 1; scale: 1; }
        }
        .state-tooltip img {
          display: block;
          width: 100%;
          height: 108px;
          object-fit: cover;
          filter: brightness(0.88) saturate(1.1);
        }
        .tooltip-body {
          padding: 10px 12px 12px;
        }
        .tooltip-title {
          margin: 0 0 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
        }
        .tooltip-desc {
          margin: 0 0 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          line-height: 1.45;
        }
        .tooltip-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .tooltip-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 500;
          color: rgba(255,175,90,0.95);
          background: rgba(232, 98, 10, 0.16);
          border: 1px solid rgba(232, 98, 10, 0.32);
          border-radius: 4px;
          padding: 2px 6px;
          line-height: 1.4;
        }

        /* ── Diamond gallery ── */
        .gallery-wrapper-outer {
          display: grid;
          grid-template-columns: repeat(9, 72px);
          grid-template-rows: repeat(5, 72px);
          gap: 6px;
          transform: rotate(45deg);
          width: 666px;
          height: 378px;
          flex-shrink: 0;
        }
        .gallery-cell {
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
          opacity: 0;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease;
          position: relative;
        }
        .gallery-cell.is-visible { animation: cellIn 0.42s ease forwards; }
        .gallery-cell.is-visible:nth-child(1)  { animation-delay: 0.00s; }
        .gallery-cell.is-visible:nth-child(2)  { animation-delay: 0.05s; }
        .gallery-cell.is-visible:nth-child(3)  { animation-delay: 0.10s; }
        .gallery-cell.is-visible:nth-child(4)  { animation-delay: 0.15s; }
        .gallery-cell.is-visible:nth-child(5)  { animation-delay: 0.20s; }
        .gallery-cell.is-visible:nth-child(6)  { animation-delay: 0.25s; }
        .gallery-cell.is-visible:nth-child(7)  { animation-delay: 0.30s; }
        .gallery-cell.is-visible:nth-child(8)  { animation-delay: 0.35s; }
        .gallery-cell.is-visible:nth-child(9)  { animation-delay: 0.40s; }
        .gallery-cell.is-visible:nth-child(10) { animation-delay: 0.45s; }
        .gallery-cell.is-visible:nth-child(11) { animation-delay: 0.50s; }
        .gallery-cell.is-visible:nth-child(12) { animation-delay: 0.55s; }
        .gallery-cell.is-visible:nth-child(13) { animation-delay: 0.60s; }
        .gallery-cell.is-visible:nth-child(14) { animation-delay: 0.65s; }
        .gallery-cell.is-visible:nth-child(15) { animation-delay: 0.70s; }
        .gallery-cell.is-visible:nth-child(16) { animation-delay: 0.75s; }
        .gallery-cell.is-visible:nth-child(17) { animation-delay: 0.80s; }
        .gallery-cell:hover {
          transform: scale(1.18) translateY(-10px) !important;
          box-shadow: 0 24px 48px rgba(0,0,0,0.65);
          z-index: 50;
        }
        .gallery-cell img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: rotate(-45deg) scale(1.5);
          transform-origin: center;
          transition: transform 0.35s ease, filter 0.35s ease;
          filter: brightness(0.84) saturate(0.92);
          display: block;
        }
        .gallery-cell:hover img {
          transform: rotate(-45deg) scale(1.55);
          filter: brightness(1) saturate(1.1);
        }
        .gallery-cell:nth-child(1)  { grid-area: 1 / 3 / 2 / 4; }
        .gallery-cell:nth-child(2)  { grid-area: 2 / 2 / 3 / 3; }
        .gallery-cell:nth-child(3)  { grid-area: 2 / 3 / 3 / 4; }
        .gallery-cell:nth-child(4)  { grid-area: 3 / 1 / 4 / 2; }
        .gallery-cell:nth-child(5)  { grid-area: 3 / 2 / 4 / 3; }
        .gallery-cell:nth-child(6)  { grid-area: 3 / 3 / 4 / 4; }
        .gallery-cell:nth-child(7)  { grid-area: 4 / 1 / 5 / 2; }
        .gallery-cell:nth-child(8)  { grid-area: 4 / 2 / 5 / 3; }
        .gallery-cell:nth-child(9)  { grid-area: 4 / 3 / 5 / 4; }
        .gallery-cell:nth-child(10) { grid-area: 5 / 2 / 6 / 3; }
        .gallery-cell:nth-child(11) { grid-area: 5 / 3 / 6 / 4; }
        .gallery-cell:nth-child(12) { grid-area: 2 / 4 / 3 / 5; }
        .gallery-cell:nth-child(13) { grid-area: 3 / 4 / 4 / 5; }
        .gallery-cell:nth-child(14) { grid-area: 4 / 4 / 5 / 5; }
        .gallery-cell:nth-child(15) { grid-area: 1 / 4 / 2 / 5; }
        .gallery-cell:nth-child(16) { grid-area: 2 / 5 / 3 / 6; }
        .gallery-cell:nth-child(17) { grid-area: 3 / 5 / 4 / 6; }
      `}</style>

      <section className="relative" style={{ height: "clamp(400px, 62vh, 560px)", overflow: "hidden" }}>

        {/* BG */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url("${slide.bgImage}")`,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.45s ease",
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%)",
        }} />

        {/* Content */}
        <div className="relative h-full flex items-center mx-auto w-full px-8 lg:px-14" style={{ maxWidth: 1280 }}>
          <div className="grid items-center w-full" style={{ gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* LEFT */}
            <div key={`t-${current}`} style={{ animation: "fadeUp 0.5s ease forwards" }}>
              <h1 className="hero-title text-white" style={{
                fontSize: "clamp(1.75rem, 2.8vw, 2.6rem)",
                lineHeight: 1.15,
                marginBottom: 16,
                whiteSpace: "pre-line",
              }}>
                {slide.title}
              </h1>
              <p className="hero-sub" style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.65,
                maxWidth: 480,
              }}>
                {slide.subtitle}
              </p>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>

        {/* Diamond collage */}
        {slide.type === "diamond" && (
          <div
            key={`v-${current}`}
            className="hidden lg:block"
            style={{
              position: "absolute",
              right: -50,
              top: "30%",
              transform: "translateY(-50%)",
              animation: "fadeUp 0.5s ease 0.1s forwards",
              opacity: 0,
              zIndex: 10,
            }}
          >
            <DiamondCollage visible={rightVisible} images={connectImages} />
          </div>
        )}

        {/* Globe / Map */}
        {(slide.type === "globe" || slide.type === "map") && (
          <div
            key={`v-${current}`}
            className="hidden lg:flex items-center justify-center"
            style={{
              position: "absolute",
              right: 56,
              top: 0,
              bottom: 0,
              width: "50%",
              animation: "fadeUp 0.5s ease 0.1s forwards",
              opacity: 0,
            }}
          >
            {slide.type === "globe" && <GlobeVisual />}
            {slide.type === "map"   && <IndiaMapVisual />}
          </div>
        )}

        {/* Dots */}
        <div className="absolute flex gap-2" style={{ bottom: 18, left: "50%", transform: "translateX(-50%)" }}>
          {slides.map((_, i) => (
            <button key={i} className="slide-dot rounded-full" onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }} />
          ))}
        </div>
      </section>
    </>
  )
}