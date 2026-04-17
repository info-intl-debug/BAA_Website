import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import MembershipPageClient from "./page-client"

export const metadata = {
  title: "Membership | Buying Agents Association",
  description: "Join the Buying Agents Association and unlock exclusive benefits for your business.",
}

const membershipTiers = [
  {
    name: "Associate Member",
    description: "Perfect for new buying agents entering the industry",
    joiningFee: "INR 5,000",
    annualFee: "INR 2,500",
    features: [
      "Access to member directory",
      "Quarterly newsletter",
      "Networking event invitations",
      "Basic training programs",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: "Member",
    description: "Ideal for established buying agents seeking growth",
    joiningFee: "INR 10,000",
    annualFee: "INR 5,000",
    features: [
      "All Associate benefits",
      "Voting rights in AGM",
      "Priority event registration",
      "Advanced training programs",
      "Legal consultation access",
      "Market intelligence reports",
      "Business matchmaking services",
    ],
    highlighted: true,
  },
  {
    name: "Institutional Member",
    description: "For organizations and corporate entities",
    joiningFee: "INR 15,000",
    annualFee: "INR 7,500",
    features: [
      "All Member benefits",
      "Multiple authorized representatives",
      "Dedicated account manager",
      "Bulk training program access",
      "Corporate event sponsorship opportunities",
      "Priority support",
      "Custom research reports",
    ],
    highlighted: false,
  },
]

const benefits = [
  "Industry advocacy and representation",
  "Access to exclusive networking events",
  "Professional development programs",
  "Legal and compliance support",
  "Market research and intelligence",
  "Business matchmaking opportunities",
  "Discounts on trade shows and exhibitions",
  "Certificate of membership",
]

export default function MembershipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Membership hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
              Become a Member
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Join India&apos;s most prestigious buying agents organization and
              unlock a world of opportunities for your business.
            </p>
          </div>
        </section>

        {/* Membership Plans — 2 cards, no prices */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Membership Plans
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Choose the membership tier that best suits your needs
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 w-full max-w-7xl mx-auto">
              {membershipTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-xl border p-8 flex flex-col ${
                    tier.highlighted
                      ? "border-[#E8520A] border-2 shadow-lg"
                      : "border-border"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="mb-4">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: "#E8520A" }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground">Joining Fee</p>
                        <p className="text-lg font-bold text-foreground">{tier.joiningFee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Annual Fee</p>
                        <p className="text-lg font-bold text-foreground">{tier.annualFee}</p>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          className="h-5 w-5 shrink-0 mt-0.5"
                          style={{ color: "#E8520A" }}
                        />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <MembershipPageClient tier={tier.name} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Member Benefits
                </h2>
                <p className="mt-4 text-muted-foreground">
                  All our members enjoy a comprehensive range of benefits designed
                  to support and grow their businesses.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <CheckCircle
                        className="h-5 w-5 shrink-0"
                        style={{ color: "#E8520A" }}
                      />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
                  alt="Business professionals in meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ backgroundColor: "#1a1a1a" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-white/70">
              Contact us to learn more about membership or to begin your application.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full font-semibold"
                style={{ backgroundColor: "#E8520A", color: "#fff" }}
              >
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full font-semibold border-white/30 text-white bg-transparent hover:bg-white/10"
              >
                <Link href="/about">Learn More About BAA</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
