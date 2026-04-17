import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, company, businessType, address, message, category } = body

    // Email content
    const emailContent = `
      <h2>New Membership Application</h2>
      <p><strong>Membership Category:</strong> ${category}</p>
      <hr />
      
      <h3>Applicant Information</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Business Type:</strong> ${businessType}</p>
      
      <h3>Business Address</h3>
      <p>${address.replace(/\n/g, "<br />")}</p>
      
      ${message ? `<h3>Additional Information</h3><p>${message.replace(/\n/g, "<br />")}</p>` : ""}
    `

    // Option 1: Using Resend (recommended for Vercel)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: "noreply@baa.org.in",
        to: "info@baa.org.in",
        cc: "harshita.chauhan@axondevelopers.com",
        replyTo: email,
        subject: `New Membership Application - ${fullName}`,
        html: emailContent,
      })

      return NextResponse.json(
        { message: "Application submitted successfully!" },
        { status: 200 }
      )
    }

    // Option 2: Using SMTP (Gmail, custom email, etc.)
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || "noreply@baa.org.in",
        to: "info@baa.org.in",
        cc: "harshita.chauhan@axondevelopers.com",
        subject: `New Membership Application - ${fullName}`,
        html: emailContent,
        replyTo: email,
      })

      return NextResponse.json(
        { message: "Application submitted successfully!" },
        { status: 200 }
      )
    }

    // Fallback: Log to console (development)
    console.log("📧 Membership Application:", {
      fullName,
      email,
      phone,
      company,
      businessType,
      address,
      message,
      category,
    })

    return NextResponse.json(
      { 
        message: "Application submitted successfully! Email service not configured yet. We will contact you soon.",
        warning: "Email service needs to be configured. Please set up RESEND_API_KEY or EMAIL_* environment variables."
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Membership application error:", error)
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    )
  }
}

