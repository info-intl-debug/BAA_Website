import { jsPDF } from "jspdf"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, company, formDataComplete, category } = body

    // Create PDF
    const doc = new jsPDF("p", "mm", "a4")
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPosition = 10
    const margins = { left: 10, right: 10, top: 10, bottom: 20 }

    // Helper function for text with wrapping
    const addText = (text: string, size: number = 10, style: "normal" | "bold" = "normal", color = [0, 0, 0]) => {
      if (yPosition > pageHeight - margins.bottom - 5) {
        doc.addPage()
        yPosition = margins.top
      }
      doc.setFontSize(size)
      doc.setTextColor(color[0], color[1], color[2])
      doc.setFont("helvetica", style)
      const lines = doc.splitTextToSize(text, pageWidth - margins.left - margins.right)
      doc.text(lines, margins.left, yPosition)
      yPosition += style === "bold" ? lines.length * 6 + 2 : lines.length * 4 + 2
    }

    const addLine = (color = [200, 200, 200]) => {
      doc.setDrawColor(color[0], color[1], color[2])
      doc.line(margins.left, yPosition, pageWidth - margins.right, yPosition)
      yPosition += 3
    }

    // Header
    doc.setFillColor(232, 82, 10)
    doc.rect(0, 0, pageWidth, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(16)
    doc.text("BUYING AGENTS ASSOCIATION", margins.left, 12)
    doc.setFontSize(10)
    doc.text("Membership Application Form", margins.left, 17)

    yPosition = 25

    // Title
    doc.setFontSize(14)
    doc.setTextColor(232, 82, 10)
    doc.setFont("helvetica", "bold")
    doc.text(`Membership Type: ${category ? category.charAt(0).toUpperCase() + category.slice(1) : "Not Selected"}`, margins.left, yPosition)
    yPosition += 8

    // Submission Date
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.setFont("helvetica", "normal")
    doc.text(`Submission Date: ${new Date().toLocaleDateString("en-IN")}`, margins.left, yPosition)
    yPosition += 6

    addLine()

    // Organization Details
    if (formDataComplete?.organizationName) {
      addText("ORGANIZATION DETAILS", 11, "bold", [232, 82, 10])
      addText(`Organization: ${formDataComplete.organizationName || "N/A"}`, 9)
      addText(`Year Established: ${formDataComplete.yearEstablished || "N/A"}`, 9)
      addText(`Website: ${formDataComplete.website || "N/A"}`, 9)
      yPosition += 2
    }

    // Contact Information
    if (formDataComplete?.ceoName) {
      addText("PRIMARY CONTACT PERSON", 11, "bold", [232, 82, 10])
      addText(`Name: ${formDataComplete.ceoName || "N/A"}`, 9)
      addText(`Email: ${formDataComplete.ceoEmail || "N/A"}`, 9)
      addText(`Mobile: ${formDataComplete.ceoMobile || "N/A"}`, 9)
      yPosition += 2
    }

    // Address Information
    if (formDataComplete?.regAddress1) {
      addText("REGISTERED ADDRESS", 11, "bold", [232, 82, 10])
      addText(`${formDataComplete.regAddress1 || ""}`, 9)
      if (formDataComplete.regAddress2) addText(`${formDataComplete.regAddress2}`, 9)
      addText(`${formDataComplete.regCity || ""}, ${formDataComplete.regPinCode || ""} - ${formDataComplete.regCountry || ""}`, 9)
      yPosition += 2
    }

    // Registration Details
    if (formDataComplete?.iecNo || formDataComplete?.gstin || formDataComplete?.panNo) {
      addText("REGISTRATION DETAILS", 11, "bold", [232, 82, 10])
      if (formDataComplete.iecNo) addText(`IEC Number: ${formDataComplete.iecNo}`, 9)
      if (formDataComplete.gstin) addText(`GSTIN: ${formDataComplete.gstin}`, 9)
      if (formDataComplete.panNo) addText(`PAN: ${formDataComplete.panNo}`, 9)
      if (formDataComplete.cinNo) addText(`CIN: ${formDataComplete.cinNo}`, 9)
      yPosition += 2
    }

    // Business Details
    if (formDataComplete?.natureOfBusiness) {
      addText("BUSINESS INFORMATION", 11, "bold", [232, 82, 10])
      addText(`Nature of Business: ${formDataComplete.natureOfBusiness || "N/A"}`, 9)
      addText(`Business Constitution: ${formDataComplete.businessConstitution || "N/A"}`, 9)
      addText(`Export Value: ${formDataComplete.exportValue || "N/A"}`, 9)
      yPosition += 2
    }

    // Page break if needed
    if (yPosition > pageHeight - 40) {
      doc.addPage()
      yPosition = margins.top
    }

    addLine()

    // Declaration Section
    addText("DECLARATION & CONFIRMATION", 11, "bold", [232, 82, 10])
    addText("I hereby declare that the information provided above is true and accurate to the best of my knowledge and belief.", 9)
    addText("I understand that providing false information may result in rejection of the application or cancellation of membership.", 9)

    // Signature Area
    yPosition += 8
    doc.setDrawColor(150, 150, 150)
    doc.line(margins.left, yPosition, margins.left + 40, yPosition)
    yPosition += 3
    addText("Signature / Digital Signature", 8)

    yPosition += 8
    doc.line(margins.left + 100, yPosition, pageWidth - margins.right, yPosition)
    yPosition += 3
    addText("Date", 8, "normal", [0, 0, 0])

    // Footer
    yPosition = pageHeight - 18
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text(
      "For submissions and inquiries: info@baa.org.in | CC: gs@baa.org.in",
      pageWidth / 2,
      yPosition,
      { align: "center" }
    )
    doc.text(
      `Generated on: ${new Date().toLocaleString("en-IN")}`,
      pageWidth / 2,
      yPosition + 4,
      { align: "center" }
    )

    // Return PDF as blob
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fullName ? fullName.replace(/\s+/g, "_") : "Application"}_Form.pdf"`,
      },
    })
  } catch (error) {
    console.error("PDF generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}
