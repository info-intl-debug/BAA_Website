import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export const metadata = {
  title: "BAA Committees | Buying Agents Association",
  description: "Explore the various committees of the Buying Agents Association.",
}

export default async function CommitteesPage() {
  const supabase = await createClient()

  const { data: committees } = await supabase
    .from("committees")
    .select("*")
    .order("sort_order", { ascending: true })

  const defaultCommittees = [
    {
      id: 1,
      name: "Knowledge Committee",
      head: "Ruma Malik",
      email: "knowledge@baa.org.in",
      image_url: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    },
    {
      id: 2,
      name: "Trade Fair & Event Committee",
      head: "Sumit Chhabra",
      email: "tradefair@baa.org.in",
      image_url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 3,
      name: "Grievances and Helpdesk Committee",
      head: "Anchal Kansal",
      email: "grievance@baa.org.in",
      image_url: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg",
    },
    {
      id: 4,
      name: "Policy Committee",
      head: "Manoj Rana",
      email: "policy@baa.org.in",
      image_url: "https://images.pexels.com/photos/936019/pexels-photo-936019.jpeg",
    },
    {
      id: 5,
      name: "Membership and Welfare Committee",
      head: "Christine Rai",
      email: "membership@baa.org.in",
      image_url: "https://images.pexels.com/photos/3767392/pexels-photo-3767392.jpeg",
    },
    {
      id: 6,
      name: "Finance and Fund Raiser Committee",
      head: "Pramod Rana",
      email: "finance@baa.org.in",
      image_url: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      id: 7,
      name: "Website and Social Media Committee",
      head: "Manoj Rana",
      email: "socialmedia@baa.org.in",
      image_url: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    },
  ]

  const displayCommittees =
    committees && committees.length > 0
      ? committees.map((c: any, i: number) => ({
          id: c.id ?? i,
          name: c.committee_name ?? "",
          head: c.head_name ?? "",
          email: c.email ?? "",
          image_url: c.head_photo ?? "",
        }))
      : defaultCommittees

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-44 md:h-56 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
            alt="About Us"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative flex h-full items-center justify-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              About Us
            </h1>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-10 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar */}
              <aside className="hidden md:flex flex-col gap-1 w-44 shrink-0 pt-1">
                <Link href="/about" className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors">
                  Our Journey
                </Link>
                <Link href="/about/governing-body" className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors">
                  Governing Body
                </Link>
                <Link href="/about/committees" className="px-3 py-2 text-sm font-semibold rounded text-white" style={{ backgroundColor: "#E8520A" }}>
                  BAA Committees
                </Link>
                <Link href="/about/founding-members" className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors">
                  Founding Members
                </Link>
              </aside>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  BAA Committees
                </h2>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {displayCommittees.map((committee) => (
                    <div
                      key={committee.id}
                      className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:shadow-md transition-shadow bg-white"
                    >
                      {/* Circular photo */}
                      <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-border mb-3 grayscale">
                        <img
                          src={committee.image_url}
                          alt={committee.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wide leading-tight text-foreground">
                        {committee.name}
                      </p>
                      <p className="text-xs font-semibold text-foreground mt-1">
                        {committee.head}
                      </p>
                      {committee.email && (
                        <a
                          href={`mailto:${committee.email}`}
                          className="text-xs mt-1 hover:text-[#E8520A] transition-colors"
                          style={{ color: "#E8520A" }}
                        >
                          {committee.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
