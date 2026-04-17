import { NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, uploadedFileName, uploadedFileBase64 } = body

    // Generate blank template PDF
    const blankDoc = new jsPDF()
    const pageWidth = blankDoc.internal.pageSize.getWidth()
    const pageHeight = blankDoc.internal.pageSize.getHeight()
    let yPosition = 10

    const addText = (text: string, size: number = 11, style: "normal" | "bold" = "normal", color = [0, 0, 0]) => {
      blankDoc.setFontSize(size)
      blankDoc.setTextColor(color[0], color[1], color[2])
      blankDoc.setFont("helvetica", style)
      blankDoc.text(text, 10, yPosition)
      yPosition += style === "bold" ? 7 : 5
    }

    // Header
    blankDoc.setFillColor(232, 82, 10)
    blankDoc.rect(0, 0, pageWidth, 20, "F")
    blankDoc.setTextColor(255, 255, 255)
    blankDoc.setFont("helvetica", "bold")
    blankDoc.setFontSize(16)
    blankDoc.text("BUYING AGENTS ASSOCIATION (BAA)", 10, 12)

    yPosition = 25
    addText("MEMBERSHIP APPLICATION FORM", 14, "bold", [232, 82, 10])
    yPosition += 3
    addText(`Date: ___________________`, 10)
    yPosition += 5
    addText("1. PERSONAL DETAILS:", 11, "bold")
    addText(`   Name: ___________________________________________`, 10)
    addText(`   Email: ___________________________________________`, 10)
    addText(`   Phone: ___________________________________________`, 10)
    yPosition += 3
    addText("2. COMPANY DETAILS:", 11, "bold")
    addText(`   Company Name: ___________________________________________`, 10)
    addText(`   Business Type: ___________________________________________`, 10)
    addText(`   Reg. Number: ___________________________________________`, 10)
    yPosition += 3
    addText("3. BUSINESS ADDRESS:", 11, "bold")
    addText(`   ________________________________________________________________`, 10)
    addText(`   ________________________________________________________________`, 10)
    yPosition += 3
    addText("4. MEMBERSHIP CATEGORY (Check One):", 11, "bold")
    addText(`   ☐ Member (Joining: ₹15,000 | Annual: ₹7,500)`, 10)
    addText(`   ☐ Associate Member (Joining: ₹8,000 | Annual: ₹4,000)`, 10)
    addText(`   ☐ Institutional Member (Joining: ₹15,000 | Annual: ₹7,500)`, 10)
    yPosition += 3
    addText("5. ADDITIONAL INFORMATION:", 11, "bold")
    addText(`   ________________________________________________________________`, 10)
    addText(`   ________________________________________________________________`, 10)
    yPosition += 3
    addText("DOCUMENTS REQUIRED:", 11, "bold")
    addText(`   ☐ Identity Proof (Aadhaar/PAN/Passport)`, 10)
    addText(`   ☐ Business Registration Certificate`, 10)
    addText(`   ☐ Bank Details for Payment`, 10)
    addText(`   ☐ Company Profile/Brochure (if applicable)`, 10)
    yPosition += 5
    addText("DECLARATION:", 11, "bold")
    addText(`I hereby declare that the above mentioned information is true and correct.`, 9)
    addText(`I agree to abide by the rules and regulations of the Buying Agents Association.`, 9)
    yPosition += 8
    addText(`Signature: ________________________      Date: ________________________`, 10)
    yPosition += 10
    blankDoc.setDrawColor(200, 200, 200)
    blankDoc.line(10, pageHeight - 20, pageWidth - 10, pageHeight - 20)
    addText(`Please send this form along with required documents to: info@baa.org.in (CC: gs@baa.org.in)`, 8)

    const blankPdfBuffer = Buffer.from(blankDoc.output("arraybuffer"))

    // Send using Nodemailer
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const nodemailer = await import("nodemailer")
        const transporter = nodemailer.default.createTransport({
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || "587"),
          secure: process.env.EMAIL_SECURE === "true",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        // Prepare attachments
        const attachments: any[] = [
          {
            filename: "BAA-Membership-Form-Blank.pdf",
            content: blankPdfBuffer,
            contentType: "application/pdf",
          },
        ]

        // Add uploaded file if provided
        if (uploadedFileBase64 && uploadedFileName) {
          attachments.push({
            filename: uploadedFileName,
            content: Buffer.from(uploadedFileBase64, "base64"),
            contentType: "application/pdf",
          })
        }

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: "info@baa.org.in",
          cc: "gs@baa.org.in",
          subject: `Membership Application - ${fullName}`,
          html: `
            <h2>Membership Application Received</h2>
            <p>Dear BAA Team,</p>
            <p>A new membership application has been submitted:</p>
            <ul>
              <li><strong>Applicant Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Submission Date:</strong> ${new Date().toLocaleDateString("en-IN")}</li>
            </ul>
            <p>Please find the following attachments:</p>
            <ul>
              <li>Blank Membership Form Template (for reference)</li>
              <li>Completed Application Form (uploaded by applicant)</li>
            </ul>
            <p>Thank you!</p>
          `,
          attachments,
        })

        return NextResponse.json(
          { success: true, message: "Application sent successfully" },
          { status: 200 }
        )
      } catch (emailError) {
        const errorMsg = emailError instanceof Error ? emailError.message : String(emailError)
        console.error("Nodemailer error:", errorMsg)
        console.error("Full error:", emailError)
        return NextResponse.json(
          { error: `Failed to send email via SMTP: ${errorMsg}` },
          { status: 500 }
        )
      }
    }

    // Fallback: Try Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        const attachments: any[] = [
          {
            filename: "BAA-Membership-Form-Blank.pdf",
            content: blankPdfBuffer,
          },
        ]

        if (uploadedFileBase64 && uploadedFileName) {
          attachments.push({
            filename: uploadedFileName,
            content: Buffer.from(uploadedFileBase64, "base64"),
          })
        }

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "noreply@baa.org.in",
          to: "info@baa.org.in",
          cc: "gs@baa.org.in",
          subject: `Membership Application - ${fullName}`,
          html: `
            <h2>Membership Application Received</h2>
            <p>Dear BAA Team,</p>
            <p>A new membership application has been submitted:</p>
            <ul>
              <li><strong>Applicant Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Submission Date:</strong> ${new Date().toLocaleDateString("en-IN")}</li>
            </ul>
            <p>Please find the following attachments:</p>
            <ul>
              <li>Blank Membership Form Template (for reference)</li>
              <li>Completed Application Form (uploaded by applicant)</li>
            </ul>
          `,
          attachments,
        })

        return NextResponse.json(
          { success: true, message: "Application sent successfully" },
          { status: 200 }
        )
      } catch (resendError) {
        console.error("Resend error details:", JSON.stringify(resendError, null, 2))
        console.error("Raw Resend error:", resendError)
        return NextResponse.json(
          { error: "Failed to send email via Resend", details: String(resendError) },
          { status: 500 }
        )
      }
    }

    // No email service configured
    return NextResponse.json(
      { error: "Email service not configured. Please set EMAIL_HOST or RESEND_API_KEY" },
      { status: 500 }
    )
  } catch (error) {
    console.error("Membership email error:", error)
    return NextResponse.json(
      { error: "Failed to process membership application" },
      { status: 500 }
    )
  }
}
