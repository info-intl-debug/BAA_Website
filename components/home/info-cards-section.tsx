import { createClient } from "@/lib/supabase/server"
import { ArrowRight, Briefcase, FileText, Users } from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="h-6 w-6" />,
  filetext: <FileText className="h-6 w-6" />,
  briefcase: <Briefcase className="h-6 w-6" />,
}

export async function InfoCardsSection() {
  const supabase = await createClient()

  const { data: cards } = await supabase
    .from("info_cards")
    .select("*")
    .order("sort_order", { ascending: true })

  const defaultCards = [
    {
      id: 1,
      title: "A vast, versed fraternity to make their voices heard in unison",
      description: "Join a strong network of sourcing professionals across India.",
      icon: "users",
      link_url: "/about",
      link_text: "Discover Our Story",
    },
    {
      id: 2,
      title: "Regular updating of the agents about ongoing and forecasting industry trends and tactics",
      description: "Stay informed with updates, notices, and industry changes.",
      icon: "filetext",
      link_url: "/news/notices",
      link_text: "View Notices",
    },
    {
      id: 3,
      title: "Successful lobbying with GOI in sourcing agent community's interest resulting in revision of trade policies and laws",
      description: "Advocacy that strengthens member interests and policy outcomes.",
      icon: "briefcase",
      link_url: "/about",
      link_text: "Learn More",
    },
    {
      id: 4,
      title: "Provisioning apt resources for facilitating regular interface",
      description: "Resources and support to help members collaborate effectively.",
      icon: "users",
      link_url: "/membership",
      link_text: "Join Us",
    },
  ]

  const displayCards =
    cards && cards.length > 0
      ? cards.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.description ?? "",
          icon: c.icon ?? "users",
          link_url: undefined,
          link_text: undefined,
        }))
      : defaultCards

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Connect. Create. Collaborate.
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto text-base">
            We play an extremely indispensable role in keeping the tyres of sourcing trade running smoothly.
            BAA recognizes the importance of the sourcing agents and endeavors to achieve
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayCards.map((card) => (
            <div
              key={card.id}
              className="group border-l-4 border-primary bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-r-xl p-6"
            >
              <p className="text-white text-sm leading-relaxed font-medium">
                {card.description || card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}