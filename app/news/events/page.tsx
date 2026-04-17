import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/server"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export const revalidate = 0

export const metadata = {
  title: "Events | Buying Agents Association",
  description: "Stay updated with the latest events and gatherings from the Buying Agents Association.",
}

const defaultEvents = [
  {
    id: 1,
    title: "Annual General Meeting 2024",
    description: "Join us for our annual gathering to discuss industry trends and association updates.",
    event_date: "2024-03-15",
    location: "Mumbai Trade Center",
    event_type: "Meeting",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Export Summit 2024",
    description: "A comprehensive summit focusing on export opportunities and global market trends.",
    event_date: "2024-04-20",
    location: "Delhi Convention Center",
    event_type: "Conference",
    image: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Networking Dinner",
    description: "An evening of networking with industry leaders and fellow buying agents.",
    event_date: "2024-05-10",
    location: "Taj Hotel, Mumbai",
    event_type: "Networking",
    image: "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Trade Fair 2024",
    description: "Explore the latest products and connect with exporters from across the country.",
    event_date: "2024-06-18",
    location: "Bangalore Exhibition Center",
    event_type: "Trade Fair",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Buyer-Seller Meet",
    description: "A focused meet to facilitate direct connections between buyers and sellers.",
    event_date: "2024-07-05",
    location: "Chennai Trade Hub",
    event_type: "Meeting",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "IHGF Delhi Fair 2024",
    description: "India's largest handicrafts and gifts fair bringing together buyers and exporters.",
    event_date: "2024-10-14",
    location: "Greater Noida",
    event_type: "Trade Fair",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

const defaultKnowledgeSessions = [
  {
    id: "k1",
    title: "Digital Export Documentation Workshop",
    description: "Learn the latest techniques for digital export documentation and compliance.",
    session_date: "2024-01-20",
    location: "New Delhi",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "k2",
    title: "Import/Export Regulations Session",
    description: "A comprehensive session on current import-export regulations and compliance requirements.",
    session_date: "2024-02-15",
    location: "Mumbai",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "k3",
    title: "Global Market Trends & Opportunities",
    description: "Exploring emerging markets and opportunities for buying agents in global trade.",
    session_date: "2024-02-28",
    location: "Bangalore",
    image: "https://images.pexels.com/photos/3184370/pexels-photo-3184370.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

interface EventsPageProps {
  searchParams?: {
    show?: string
  }
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true })

  const { data: knowledgeSessions } = await supabase
    .from("knowledge_sessions")
    .select("*")
    .order("session_date", { ascending: true })

  const displayEvents =
    events && events.length > 0
      ? events.map((e: any, i: number) => ({
          id: e.id ?? i,
          title: e.event_title ?? "Event",
          description: e.event_description ?? "",
          event_date: e.event_date ?? "",
          location: e.event_location ?? "",
          event_type: e.event_type ?? "Event",
          image: e.event_image ?? defaultEvents[i % defaultEvents.length].image,
        }))
      : defaultEvents

  const displayKnowledgeSessions =
    knowledgeSessions && knowledgeSessions.length > 0
      ? knowledgeSessions.map((k: any) => ({
          id: k.id,
          title: k.title ?? "Session",
          description: k.description ?? "",
          session_date: k.session_date ?? "",
          location: k.location ?? "",
          image: k.image ?? "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        }))
      : defaultKnowledgeSessions

  const selectedEvent = searchParams?.show
    ? displayEvents.find((event) => event.id.toString() === searchParams.show)
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-8">

            {/* Sidebar */}
            <aside className="hidden md:flex flex-col gap-2 w-44 shrink-0 pt-1">
              <Link
                href="/news/notices"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-primary transition-colors"
              >
                Notice Board
              </Link>
              <Link
                href="/news/events"
                className="px-3 py-2 text-sm font-semibold rounded text-white"
                style={{ backgroundColor: "#E8520A" }}
              >
                Events
              </Link>
              <Link
                href="/news/media-coverage"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-primary transition-colors"
              >
                Media Coverage
              </Link>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Past Events
              </h1>

              {selectedEvent && (
                <section className="rounded-xl border border-border p-5 bg-white mb-8 shadow-sm">
                  <h2 className="text-xl font-semibold mb-3">
                    Viewing details for "{selectedEvent.title}"
                  </h2>
                  <p className="text-sm text-muted-foreground mb-2">{selectedEvent.description}</p>
                  <div className="text-xs text-muted-foreground mb-2">
                    <span className="font-semibold">Date:</span> {formatDate(selectedEvent.event_date)}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    <span className="font-semibold">Location:</span> {selectedEvent.location}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold">Type:</span> {selectedEvent.event_type}
                  </div>
                </section>
              )}

              {/* Regular Events Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 mb-12">
                {displayEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={event.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "#E8520A" }}>
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <h2 className="font-semibold text-foreground text-sm leading-snug mb-1">
                        {event.title}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              {/* Past Knowledge Sessions */}
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-semibold mb-6">Past Knowledge Sessions</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayKnowledgeSessions.map((session) => (
                    <article
                      key={session.id}
                      className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                    >
                      {/* IMAGE FIX — object-contain so full image shows */}
                      <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                        <img
                          src={session.image}
                          alt={session.title}
                          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 text-xs mb-1" style={{ color: "#E8520A" }}>
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(session.session_date)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{session.location}</span>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1">
                          {session.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {session.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}