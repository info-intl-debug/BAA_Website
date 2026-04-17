import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  const steps = [
    { number: 1, title: "Check Membership Criteria" },
    { number: 2, title: "Upload Form and Supporting Documents" },
    { number: 3, title: "Online Payment of Membership Fee" },
  ]

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
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
          Join Our Fraternity
        </h2>
        <p className="mt-4 text-white/70 max-w-xl mx-auto text-base">
          We bring Buying Agents together to improve standards and look for growth avenues.
        </p>

        {/* Steps */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-4 text-left hover:bg-white/20 transition-all"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                {step.number}
              </div>
              <p className="text-white text-sm font-medium leading-snug">
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 px-10 rounded-full"
          >
            <Link href="/membership">Join Us Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}