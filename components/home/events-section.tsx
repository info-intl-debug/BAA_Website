import { createClient } from "@/lib/supabase/server"
import { InfiniteScroller } from "@/components/home/events-scroller"

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
]

export async function EventsSection() {
  let displayEvents = defaultEvents

  try {
    const supabase = await createClient()

    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: false })

    if (error) {
      console.error("Error fetching events:", error)
    } else if (events && events.length > 0) {
      // Get only the 5 most recent events for the moving carousel
      const recentEvents = events.slice(0, 5)
      
      displayEvents = recentEvents.map((e: any, i: number) => ({
        id: e.id ?? i,
        title: e.event_title ?? "Event",
        description: e.event_description ?? "",
        event_date: e.event_date ?? "",
        location: e.event_location ?? "",
        event_type: e.event_type ?? "Event",
        image: e.event_image ?? defaultEvents[i % defaultEvents.length].image,
      }))
    }
  } catch (err) {
    console.error("Events fetch exception:", err)
  }

  return (
    <section className="py-20 bg-muted overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading center with lines */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-border" />
          <h2 className="font-semibold text-3xl md:text-4xl text-foreground whitespace-nowrap">
            BAA Events
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

      </div>

      <InfiniteScroller events={displayEvents} />
    </section>
  )
}