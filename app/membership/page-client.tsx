"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"
import { MembershipFormComprehensive } from "@/components/membership-form-comprehensive"

interface MembershipPageClientProps {
  tier: string
}

export default function MembershipPageClient({ tier }: MembershipPageClientProps) {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Button
        onClick={() => setShowForm(true)}
        className="w-full rounded-full font-semibold"
        style={
          tier === "Member"
            ? { backgroundColor: "#E8520A", color: "#fff" }
            : {}
        }
        variant={tier === "Member" ? "default" : "outline"}
      >
        Apply Now
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                Apply for Membership
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the comprehensive form below. We will review your application and contact you within 3-5 business days.
              </p>
              <MembershipFormComprehensive onClose={() => setShowForm(false)} selectedTier={tier} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
