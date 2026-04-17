import { jsPDF } from "jspdf"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Create PDF
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 10

    // Helper function for text
    const addText = (text: string, size: number = 11, style: "normal" | "bold" = "normal", color = [0, 0, 0]) => {
      doc.setFontSize(size)
      doc.setTextColor(color[0], color[1], color[2])
      doc.setFont("helvetica", style)
      doc.text(text, 10, yPosition)
      yPosition += style === "bold" ? 7 : 5
    }

    // Header
    doc.setFillColor(232, 82, 10) // Orange color
    doc.rect(0, 0, pageWidth, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("BUYING AGENTS ASSOCIATION (BAA)", 10, 12)

    yPosition = 25

    // Title
    addText("MEMBERSHIP APPLICATION FORM", 14, "bold", [232, 82, 10])
    yPosition += 3

    // Date
    addText(`Date: ___________________`, 10)
    yPosition += 5

    // Section 1: Personal Details
    addText("1. PERSONAL DETAILS:", 11, "bold")
    addText(`   Name: ___________________________________________`, 10)
    addText(`   Email: ___________________________________________`, 10)
    addText(`   Phone: ___________________________________________`, 10)

    yPosition += 3

    // Section 2: Company Details
    addText("2. COMPANY DETAILS:", 11, "bold")
    addText(`   Company Name: ___________________________________________`, 10)
    addText(`   Business Type: ___________________________________________`, 10)
    addText(`   Reg. Number: ___________________________________________`, 10)

    yPosition += 3

    // Section 3: Business Address
    addText("3. BUSINESS ADDRESS:", 11, "bold")
    addText(`   ________________________________________________________________`, 10)
    addText(`   ________________________________________________________________`, 10)

    yPosition += 3

    // Section 4: Membership Category
    addText("4. MEMBERSHIP CATEGORY (Check One):", 11, "bold")
    addText(`   ☐ Member (Joining: ₹15,000 | Annual: ₹7,500)`, 10)
    addText(`   ☐ Associate Member (Joining: ₹8,000 | Annual: ₹4,000)`, 10)
    addText(`   ☐ Institutional Member (Joining: ₹15,000 | Annual: ₹7,500)`, 10)

    yPosition += 3

    // Section 5: Additional Information
    addText("5. ADDITIONAL INFORMATION:", 11, "bold")
    addText(`   ________________________________________________________________`, 10)
    addText(`   ________________________________________________________________`, 10)

    yPosition += 3

    // Documents Required
    addText("DOCUMENTS REQUIRED:", 11, "bold")
    addText(`   ☐ Identity Proof (Aadhaar/PAN/Passport)`, 10)
    addText(`   ☐ Business Registration Certificate`, 10)
    addText(`   ☐ Bank Details for Payment`, 10)
    addText(`   ☐ Company Profile/Brochure (if applicable)`, 10)

    yPosition += 5

    // Declaration
    addText("DECLARATION:", 11, "bold")
    addText(
      `I hereby declare that the above mentioned information is true and correct.`,
      9
    )
    addText(
      `I agree to abide by the rules and regulations of the Buying Agents Association.`,
      9
    )

    yPosition += 8

    // Signature and Date
    addText(`Signature: ________________________      Date: ________________________`, 10)

    yPosition += 10

    // Footer
    doc.setDrawColor(200, 200, 200)
    doc.line(10, pageHeight - 20, pageWidth - 10, pageHeight - 20)
    addText(
      `Please send this form along with required documents to: info@baa.org.in (CC: gs@baa.org.in)`,
      8
    )

    // Convert to base64
    const pdfBase64 = doc.output("datauristring")

    return NextResponse.json(
      { pdfUrl: pdfBase64, fileName: "BAA-Membership-Form-Blank.pdf" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Blank template generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate blank template" },
      { status: 500 }
    )
  }
}
