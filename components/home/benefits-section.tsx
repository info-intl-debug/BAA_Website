"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import {
  Building2,
  GraduationCap,
  Mic,
  Network,
  Share2,
  ShoppingBag
} from "lucide-react"
import Link from "next/link"

const iconList = [GraduationCap, Share2, Mic, Building2, ShoppingBag, Network]

const cardStyles = [
  {
    bg: "bg-gradient-to-br from-[#f5f0ec] to-[#e8ddd4]",
    iconBg: "bg-[#7a5a46]/15",
    iconColor: "text-[#7a5a46]",
    title: "text-[#4a3428]",
    desc: "text-[#6b4e3d]",
  },
  {
    bg: "bg-gradient-to-br from-[#fff4ef] to-[#fde3d5]",
    iconBg: "bg-[#E8520A]/12",
    iconColor: "text-[#E8520A]",
    title: "text-[#7a2800]",
    desc: "text-[#9b4020]",
  },
  {
    bg: "bg-gradient-to-br from-[#f2ede8] to-[#ddd0c5]",
    iconBg: "bg-[#644e3c]/15",
    iconColor: "text-[#644e3c]",
    title: "text-[#3d2a1e]",
    desc: "text-[#60412f]",
  },
  {
    bg: "bg-gradient-to-br from-[#fff8f5] to-[#fce9df]",
    iconBg: "bg-[#E8520A]/10",
    iconColor: "text-[#c94700]",
    title: "text-[#6b2a00]",
    desc: "text-[#8c3c10]",
  },
  {
    bg: "bg-gradient-to-br from-[#ede7e1] to-[#d4c5ba]",
    iconBg: "bg-[#5a4132]/15",
    iconColor: "text-[#5a4132]",
    title: "text-[#3a2418]",
    desc: "text-[#5a3c2a]",
  },
  {
    bg: "bg-gradient-to-br from-[#fef1eb] to-[#f9d9c8]",
    iconBg: "bg-[#E8520A]/13",
    iconColor: "text-[#d04800]",
    title: "text-[#5c2200]",
    desc: "text-[#7d3515]",
  },
]

export async function BenefitsSection() {
  const supabase = await createClient()

  const { data: benefits } = await supabase
    .from("benefits")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  const defaultBenefits = [
    { id: 1, title: "Skill Development", description: "The Buying Agents Association organises training workshops, seminars, conference in compliance, merchandising, production, quality." },
    { id: 2, title: "Knowledge Sharing", description: "A platform to exchange insights, best practices, and industry intelligence across the buying agent community." },
    { id: 3, title: "Voice of Industry", description: "We represent the collective voice of buying agents, advocating for fair policies and a stronger industry presence." },
    { id: 4, title: "Govt Liaison – Your connect to the Govt", description: "Direct engagement with government bodies to represent your interests and navigate regulatory frameworks effectively." },
    { id: 5, title: "Access to Markets", description: "Open doors to new buyers, suppliers, and trade opportunities across domestic and international markets." },
    { id: 6, title: "Community Networking", description: "Connect with fellow buying agents, build lasting professional relationships, and grow your network within the industry." },
  ]

  const displayBenefits = benefits && benefits.length > 0 ? benefits : defaultBenefits

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-border" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center whitespace-nowrap">
            Members Benefits
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayBenefits.map((benefit, i) => {
            const Icon = iconList[i % iconList.length]
            const style = cardStyles[i % cardStyles.length]
            return (
              <div
                key={benefit.id}
                className={`flex flex-col items-start gap-3 rounded-2xl p-6 border border-black/[0.06] ${style.bg}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${style.iconBg}`}>
                  <Icon className={`h-6 w-6 ${style.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className={`font-bold text-base leading-snug ${style.title}`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm leading-relaxed ${style.desc}`}>
                  {benefit.description}
                </p>
                <Link
                  href="/membership"
                  className="text-[#E8520A] hover:underline text-xs font-semibold mt-auto"
                >
                  Read More →
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-14">
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary/90 px-10 rounded-full"
          >
            <Link href="/membership">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}