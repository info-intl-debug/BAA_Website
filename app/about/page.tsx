import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export const metadata = {
  title: "About Us | Buying Agents Association",
  description: "Learn about the history, mission, and vision of the Buying Agents Association.",
}

const storyParagraphs = [
  `The Buying Agents Association (BAA) was formally registered on 14th July, 2016, with the active support and collaboration of leading buying agencies across India, along with the Export Promotion Council for Handicrafts (EPCH). The formation of the Association was driven by a clear and growing need within the industry — to create a unified platform where Buying Agents could collectively address common challenges, share knowledge, and work towards elevating industry standards.`,
  `Prior to the establishment of BAA, Buying Agents often faced difficulties in having their individual concerns, grievances, and policy-related requests effectively heard or resolved. There was a noticeable gap in representation, which limited their ability to influence decisions at institutional and governmental levels. Recognizing this need, industry stakeholders came together to establish a formal body that could act as a strong, credible voice for the community.`,
  `Since its inception, BAA has been committed to fostering collaboration, transparency, and professionalism within the sector. By bringing Buying Agents under a single umbrella, the Association aims to strengthen their collective bargaining power, facilitate structured dialogue with government authorities, and create sustainable growth opportunities for its members. Today, BAA continues to play a vital role in shaping policies, improving operational frameworks, and supporting the long-term development of India’s export ecosystem.`,
]

const commitments = [
  {
    title: "Training & Capacity Building",
    text: "Organizing regular workshops, seminars, and training sessions to enhance awareness and understanding of compliance requirements, global trade practices, regulatory frameworks, and emerging industry trends.",
  },
  {
    title: "Participation in Trade Platforms",
    text: "Actively engaging in national and international trade fairs, buyer-seller meets, roadshows, symposiums, and conferences to expand market access, strengthen global networks, and promote Indian exports.",
  },
  {
    title: "Research & Publications",
    text: "Editing, publishing, and disseminating technical reports, white papers, and research documents related to trade, compliance, and industry best practices to support knowledge sharing and informed decision-making.",
  },
  {
    title: "Common Compliance Framework",
    text: "Developing and promoting a standardized “Common Compliance Code” to be adopted across the industry, ensuring consistency, transparency, and adherence to global standards on a pan-India basis.",
  },
  {
    title: "Advisory & Expert Network",
    text: "Establishing a panel of experienced advisers, consultants, and industry specialists who can provide guidance and strategic support to the Association and its members as needed.",
  },
  {
    title: "Product Liability Insurance (PLI) Initiative",
    text: "Facilitating the creation of a collective or “umbrella” Product Liability Insurance (PLI) cover in collaboration with insurance providers, enabling members and their vendors to mitigate risks and ensure business security.",
  },
  {
    title: "Code of Conduct & Best Practices",
    text: "Formulating and implementing a comprehensive Code of Conduct to regulate industry practices, uphold ethical standards, and promote professionalism and accountability among members.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
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

        <section className="py-10 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="hidden lg:flex flex-col gap-1 w-44 shrink-0 pt-1">
                <Link
                  href="/about"
                  className="px-3 py-2 text-sm font-semibold rounded text-white"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  Our Story
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

              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Story</h2>
                <div className="space-y-4 text-sm leading-relaxed text-foreground">
                  {storyParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-center text-2xl font-bold text-foreground mb-6">BAA COMMITMENTS</h3>
                  <ul className="list-disc list-inside space-y-4 text-sm leading-relaxed text-foreground">
                    {commitments.map((item, index) => (
                      <li key={index}>
                        <strong>{item.title}:</strong> {item.text}
                      </li>
                    ))}
                  </ul>
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
