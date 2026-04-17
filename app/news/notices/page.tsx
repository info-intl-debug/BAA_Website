import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Notice Board | Buying Agents Association",
  description: "Stay updated with the latest notices and announcements from the Buying Agents Association.",
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function NoticesPage() {
  const supabase = await createClient()

  // Fetch all notices from database
  const { data: allNotices } = await supabase
    .from("notices")
    .select("*")
    .order("date", { ascending: false })

  const notices = allNotices || []

  // Filter notices by type
  const knowledgeSessions = notices
    .filter((notice) => notice.type === "knowledge")
    .map((notice) => ({
      ...notice,
      formUrl: notice.form_url,
    }))

  const upcomingEvents = notices
    .filter((notice) => notice.type === "event")
    .map((notice) => ({
      ...notice,
      formUrl: notice.form_url,
    }))

  const otherNotices = notices
    .filter((notice) => notice.type === "other")
    .map((notice) => ({
      ...notice,
      formUrl: notice.form_url,
    }))


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
                className="px-3 py-2 text-sm font-semibold rounded text-white"
                style={{ backgroundColor: "#E8520A" }}
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
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
              >
                Media Coverage
              </Link>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Notice Board
              </h1>

              <div className="space-y-10 mt-6">
                {/* Section 1: Upcoming Knowledge Sessions */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">Upcoming Knowledge Sessions</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {knowledgeSessions.length > 0 ? (
                      knowledgeSessions.map((notice) => (
                        <article
                          key={notice.id}
                          className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={
                                notice.image ||
                                "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                              }
                              alt={notice.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <div
                              className="flex items-center gap-1 text-xs mb-2"
                              style={{ color: "#E8520A" }}
                            >
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(notice.date)}</span>
                            </div>
                            <h2 className="font-semibold text-foreground text-sm leading-snug mb-2">
                              {notice.title}
                            </h2>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {notice.description}
                            </p>
                            <a
                              href={notice.formUrl || "https://forms.gle"}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center mt-4 w-full rounded-md bg-[#E8520A] px-3 py-2 text-xs font-semibold text-white hover:bg-[#cc4600] transition-colors"
                            >
                              Register Now
                            </a>
                          </div>
                        </article>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No knowledge sessions available.</p>
                    )}
                  </div>
                </section>

                {/* Section 2: Upcoming Events */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.length > 0 ? (
                      upcomingEvents.map((notice) => (
                        <article
                          key={notice.id}
                          className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={
                                notice.image ||
                                "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                              }
                              alt={notice.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <div
                              className="flex items-center gap-1 text-xs mb-2"
                              style={{ color: "#E8520A" }}
                            >
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(notice.date)}</span>
                            </div>
                            <h2 className="font-semibold text-foreground text-sm leading-snug mb-1">
                              {notice.title}
                            </h2>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {notice.description}
                            </p>
                            <a
                              href={notice.formUrl || "https://forms.gle"}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center mt-4 w-full rounded-md bg-[#E8520A] px-3 py-2 text-xs font-semibold text-white hover:bg-[#cc4600] transition-colors"
                            >
                              Register Now
                            </a>
                          </div>
                        </article>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No upcoming events available.</p>
                    )}
                  </div>
                </section>

                {/* Section 3: Other Notices */}
                <section>
                  <h2 className="text-xl font-semibold mb-4">Other Notices</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {otherNotices.length > 0 ? (
                      otherNotices.map((notice) => (
                        <article
                          key={notice.id}
                          className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={
                                notice.image ||
                                "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                              }
                              alt={notice.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <div
                              className="flex items-center gap-1 text-xs mb-2"
                              style={{ color: "#E8520A" }}
                            >
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(notice.date)}</span>
                            </div>
                            <h2 className="font-semibold text-foreground text-sm leading-snug mb-1">
                              {notice.title}
                            </h2>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {notice.description}
                            </p>
                          </div>
                        </article>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No other notices available.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
