import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export const metadata = {
  title: "Governing Body | Buying Agents Association",
  description: "Meet the leadership team of the Buying Agents Association.",
}

export default async function GoverningBodyPage() {
  const supabase = await createClient()

  const { data: members } = await supabase
    .from("governing_body")
    .select("*")
    .order("sort_order", { ascending: true })

  const displayMembers =
    members && members.length > 0
      ? members.map((m: any, i: number) => ({
          id: m.id ?? i,
          name: m.name ?? "",
          designation: m.designation ?? "",
          image_url: m.photo ?? "",
        }))
      : []                  
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
                <Link href="/about/governing-body" className="px-3 py-2 text-sm font-semibold rounded text-white" style={{ backgroundColor: "#E8520A" }}>
                  Governing Body
                </Link>
                <Link href="/about/committees" className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors">
                  BAA Committees
                </Link>
                <Link href="/about/founding-members" className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors">
                  Founding Members
                </Link>
              </aside>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-1">
                  Governing Body
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Members of our esteemed governing body who look the overall administration and management of the affairs of the society.
                </p>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {displayMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:shadow-md transition-shadow bg-white"
                    >
                      {/* Circular photo */}
                      <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-border mb-3 grayscale">
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                        {member.name}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide mt-0.5" style={{ color: "#E8520A" }}>
                        {member.designation}
                      </p>
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
