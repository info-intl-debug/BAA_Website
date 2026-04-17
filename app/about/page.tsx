import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button" 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Target, Award, History } from "lucide-react"

export const metadata = {
  title: "About Us | Buying Agents Association",
  description: "Learn about the history, mission, and vision of the Buying Agents Association.",
}

export default async function AboutPage() {
  const supabase = await createClient()
  
  const { data: rows } = await supabase
    .from("about_content")
    .select("*")
  
  const defaultContent = {
    history: `The Buying Agents Association (BAA) was established in 1946, just before India's independence, by a group of visionary entrepreneurs who recognized the need for a unified voice representing buying agents in international trade.

Over the decades, BAA has grown from a small group of traders to a prominent organization with over 500 active members across India. We have played a pivotal role in shaping trade policies, fostering international relationships, and supporting our members through changing economic landscapes.

Our journey reflects the evolution of India's export industry itself - from the early days of traditional handicrafts to today's diverse portfolio spanning textiles, engineering goods, pharmaceuticals, and more.`,
    mission: `Our mission is to serve as the premier advocate for buying agents in India, promoting ethical business practices, facilitating international trade relationships, and providing our members with the resources and support they need to succeed in the global marketplace.

We are committed to upholding the highest standards of professionalism, transparency, and integrity in all our endeavors, ensuring that our members are well-equipped to navigate the complexities of international trade.`,
    vision: `We envision a future where Indian buying agents are recognized globally as trusted partners in international trade, known for their expertise, reliability, and commitment to excellence.

BAA aims to be at the forefront of industry innovation, embracing new technologies and practices while preserving the core values that have made us successful for over seven decades.`,
    values: `Integrity - We uphold the highest ethical standards in all our dealings.
Excellence - We strive for excellence in everything we do.
Collaboration - We believe in the power of collective action.
Innovation - We embrace change and continuously improve.
Service - We are dedicated to serving our members and the industry.`,
  }

  const bySection = new Map<string, any>()
  ;(rows || []).forEach((r: any) => {
    if (r?.section) bySection.set(String(r.section), r)
  })

  const displayContent = {
    history: bySection.get("history")?.content ?? defaultContent.history,
    mission: bySection.get("mission")?.content ?? defaultContent.mission,
    vision: bySection.get("vision")?.content ?? defaultContent.vision,
    values: bySection.get("values")?.content ?? defaultContent.values,
  }

  const sections = [
    { icon: History, title: "Our History", content: displayContent.history },
    { icon: Target, title: "Our Mission", content: displayContent.mission },
    { icon: Award, title: "Our Vision", content: displayContent.vision },
  ]

  const quickLinks = [
    { title: "Governing Body", href: "/about/governing-body", description: "Meet our leadership team" },
    { title: "Committees", href: "/about/committees", description: "Explore our working committees" },
    { title: "Founding Members", href: "/about/founding-members", description: "Our founding pioneers" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner with image + overlay */}
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
                <Link
                  href="/about"
                  className="px-3 py-2 text-sm font-semibold rounded text-white"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  Our Journey
                </Link>
                <Link
                  href="/about/governing-body"
                  className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
                >
                  Governing Body
                </Link>
                <Link
                  href="/about/committees"
                  className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
                >
                  BAA Committees
                </Link>
                <Link
                  href="/about/founding-members"
                  className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
                >
                  Founding Members
                </Link>
              </aside>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Journey</h2>
                <div className="space-y-3 text-sm leading-relaxed text-foreground">
                  {displayContent.history.split('\n\n').map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
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
