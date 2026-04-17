import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Newspaper } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "News | Buying Agents Association",
  description: "Stay updated with the latest news, notices, and media coverage from the Buying Agents Association.",
}

export default function NewsPage() {
  const sections = [
    {
      title: "Notices & Announcements",
      description: "Official circulars, meeting notices, policy updates, and important announcements from BAA.",
      icon: FileText,
      href: "/news/notices",
      linkText: "View All Notices",
    },
    {
      title: "Media Coverage",
      description: "Press releases, news articles, and media mentions featuring the Buying Agents Association.",
      icon: Newspaper,
      href: "/news/media-coverage",
      linkText: "View Media Coverage",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
                News & Updates
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                Stay informed with the latest happenings, announcements, and 
                media coverage from the Buying Agents Association.
              </p>
            </div>
          </div>
        </section>

        {/* News Sections */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {sections.map((section) => (
                <Card key={section.href} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-14 w-14 mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <section.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="font-serif text-2xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{section.description}</p>
                    <Button asChild variant="link" className="p-0 text-primary hover:text-secondary">
                      <Link href={section.href} className="flex items-center gap-2">
                        {section.linkText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
