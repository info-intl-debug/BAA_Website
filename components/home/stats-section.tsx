import { createClient } from "@/lib/supabase/server"
import { Briefcase, Calendar, DollarSign, Globe, ShoppingBag, Users } from "lucide-react"

const iconList = [Users, Calendar, Briefcase, Globe, DollarSign, ShoppingBag]

export async function StatsSection() {
  const supabase = await createClient()

  const { data: stats } = await supabase
    .from("statistics")
    .select("*")
    .order("display_order", { ascending: true })

  const defaultStats = [
    { id: 1, value: "280+", label: "Members" },
    { id: 2, value: "222+", label: "Events" },
    { id: 3, value: "40 Million+", label: "Employment Generation" },
    { id: 4, value: "5000+", label: "Exporters" },
    { id: 5, value: "2 Billion+", label: "Exports Facilitated USD" },
    { id: 6, value: "1000+", label: "Buyers" },
  ]

  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <section className="py-10 bg-white border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {displayStats.map((stat, i) => {
            const Icon = iconList[i % iconList.length]
            return (
              <div key={stat.id} className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="font-bold text-xl md:text-2xl text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}