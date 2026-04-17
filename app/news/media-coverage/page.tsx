import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Media Coverage | Buying Agents Association",
  description: "Read about the Buying Agents Association in the news and media.",
}

const defaultArticles = [
  {
    id: 1,
    title: "Report on Meet & Greet event on U.S. Tariffs and Supply Chain...",
    source: "BAA Report",
    excerpt: "The Sourcing Consultants Association (BAA), successfully hosted a high-impact event on U.S. tariffs and supply chain strategies.",
    date: "2025-01-10",
    image_url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    external_url: "#",
  },
  {
    id: 2,
    title: "upnext India, 10th – 11th February 2023",
    source: "BAA Media",
    excerpt: '"UPNEXT INDIA" an initiative in the form of a Series of Reverse Buyer Seller meet...',
    date: "2025-02-11",
    image_url: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    external_url: "#",
  },
  {
    id: 3,
    title: "68th India International Garment Fair (IIGF) 2023",
    source: "BAA Media",
    excerpt: "INDIA INTERNATIONAL GARMENT FAIR (IIGF) has been organised with the support of...",
    date: "2025-01-10",
    image_url: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
    external_url: "#",
  },
  {
    id: 4,
    title: "BAA Signs MoU with European Trade Federation",
    source: "Business Today",
    excerpt: "A landmark agreement was signed between BAA and the European Trade Federation to facilitate bilateral trade and member exchanges.",
    date: "2024-12-15",
    image_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    external_url: "#",
  },
  {
    id: 5,
    title: "Export Industry Outlook: Interview with BAA Secretary",
    source: "Mint",
    excerpt: "In an exclusive interview, the BAA Secretary General shared insights on export trends, challenges, and opportunities.",
    date: "2024-11-25",
    image_url: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
    external_url: "#",
  },
  {
    id: 6,
    title: "Buying Agents Play Key Role in Export Growth",
    source: "The Hindu Business Line",
    excerpt: "A detailed analysis of how buying agents have contributed to India's export growth, featuring data and expert opinions from BAA.",
    date: "2024-10-10",
    image_url: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    external_url: "#",
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
}

export default async function MediaCoveragePage() {
  const supabase = await createClient()

  const { data: articles } = await supabase
    .from("media_coverage")
    .select("*")
    .order("created_at", { ascending: false })

  const displayArticles =
    articles && articles.length > 0
      ? articles.map((a: any, i: number) => ({
          id: a.id ?? i,
          title: a.title ?? "",
          excerpt: a.summary ?? "",
          date: a.created_at ?? "",
          image_url: a.media_image ?? "",
          external_url: a.external_link ?? "#",
        }))
      : defaultArticles

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
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
              >
                Notice Board
              </Link>
              <Link
                href="/news/events"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
              >
                Events
              </Link>
              <Link
                href="/news/media-coverage"
                className="px-3 py-2 text-sm font-semibold rounded text-white"
                style={{ backgroundColor: "#E8520A" }}
              >
                Media Coverage
              </Link>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-3xl font-bold text-foreground mb-6">
                Media Coverage
              </h1>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayArticles.map((article) => (
                  <article
                    key={article.id}
                    className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={
                          article.image_url ||
                          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                        }
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs" style={{ color: "#E8520A" }}>
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <Link
                          href={article.external_url || "#"}
                          className="text-xs font-semibold hover:underline"
                          style={{ color: "#E8520A" }}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
