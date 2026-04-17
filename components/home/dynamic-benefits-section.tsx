import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  GraduationCap, Share2, Mic, Building2, ShoppingBag, Network,
  Briefcase, Star, Globe, Users, TrendingUp, Award
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  graduationcap: GraduationCap, share2: Share2, mic: Mic,
  building2: Building2, shoppingbag: ShoppingBag, network: Network,
  briefcase: Briefcase, star: Star, globe: Globe,
  users: Users, trendup: TrendingUp, award: Award,
}

const cardStyles = [
  {
    bg: "bg-white",
    iconBg: "bg-[#7a5a46]/15", iconColor: "text-[#7a5a46]",
    title: "text-[#1a1a1a]", desc: "text-[#666666]",
  },
  {
    bg: "bg-white",
    iconBg: "bg-[#E8520A]/12", iconColor: "text-[#E8520A]",
    title: "text-[#1a1a1a]", desc: "text-[#666666]",
  },
  {
    bg: "bg-white",
    iconBg: "bg-[#644e3c]/15", iconColor: "text-[#644e3c]",
    title: "text-[#1a1a1a]", desc: "text-[#666666]",
  },
  {
    bg: "bg-white",
    iconBg: "bg-[#E8520A]/10", iconColor: "text-[#E8520A]",
    title: "text-[#1a1a1a]", desc: "text-[#666666]",
  },
  {
    bg: "bg-white",
    iconBg: "bg-[#5a4132]/15", iconColor: "text-[#5a4132]",
    title: "text-[#1a1a1a]", desc: "text-[#666666]",
  },
  {
    bg: "bg-white",
    iconBg: "bg-[#E8520A]/13", iconColor: "text-[#E8520A]",
    title: "text-[#1a1a1a]", desc: "text-[#666666]",
  },
]

export async function DynamicBenefitsSection() {
  const supabase = await createClient()

  const { data: benefits, error } = await supabase
    .from('benefits')
    .select('id, title, description, icon, sort_order')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[v0] Error fetching benefits:', error)
    return null
  }

  const displayBenefits = (benefits || []).slice(0, 6)
  if (!displayBenefits.length) return null

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">

      {/* Subtle BBA-toned background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E8520A]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#7a5a46]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e8ddd4]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="mb-10 animate-rise-in-slow">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center whitespace-nowrap">
              Member Benefits
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground mt-3 text-center">
            Exclusive advantages for all BAA members
          </p>
          {benefits && benefits.length > 6 && (
            <div className="mt-4 text-center">
              <Button
                asChild variant="outline" size="sm"
                className="text-[#E8520A] border-[#E8520A] hover:bg-[#E8520A]/5 rounded-full"
              >
                <Link href="/benefits">View All</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {displayBenefits.map((benefit, index) => {
            const style = cardStyles[index % cardStyles.length]
            const iconKey = (benefit.icon ?? 'briefcase').toLowerCase().replace(/[^a-z0-9]/g, '')
            const Icon = iconMap[iconKey] ?? Briefcase

            return (
              <div
                key={benefit.id}
                className="animate-rise-in"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className={`flex flex-col items-start gap-3 rounded-2xl p-6 h-full border-2 border-[#DDDDDD] ${style.bg}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${style.iconBg}`}>
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}