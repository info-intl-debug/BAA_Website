import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const config = {
    EMAIL_HOST: process.env.EMAIL_HOST || "NOT SET",
    EMAIL_PORT: process.env.EMAIL_PORT || "NOT SET",
    EMAIL_SECURE: process.env.EMAIL_SECURE || "NOT SET",
    EMAIL_USER: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 5) + "****" : "NOT SET",
    EMAIL_PASS: process.env.EMAIL_PASS ? "SET (length: " + process.env.EMAIL_PASS.length + ")" : "NOT SET",
    EMAIL_FROM: process.env.EMAIL_FROM || "NOT SET",
  }

  try {
    // Try Nodemailer first (SMTP)
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

      // Verify SMTP connection
      await transporter.verify()

      // Try sending a test email
      const result = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself for test
        subject: "BAA Test Email",
        html: "<p>Yeh ek test email hai. Agar yeh aa gaya toh SMTP sahi kaam kar raha hai.</p>",
      })

      return NextResponse.json({
        status: "SUCCESS",
        config,
        service: "Nodemailer (SMTP)",
        smtpVerified: true,
        messageId: result.messageId,
      })
    }

    // Fallback: Try Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)

      const result = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@baa.org.in",
        to: process.env.EMAIL_USER || "test@example.com",
        subject: "BAA Test Email",
        html: "<p>Yeh ek test email hai. Agar yeh aa gaya toh Resend sahi kaam kar raha hai.</p>",
      })

      return NextResponse.json({
        status: "SUCCESS",
        config,
        service: "Resend",
        messageId: result.data?.id,
      })
    }

    // No email service configured
    return NextResponse.json(
      {
        status: "FAILED",
        config,
        error: "No email service configured. Set either Nodemailer (EMAIL_HOST, EMAIL_USER, EMAIL_PASS) or Resend (RESEND_API_KEY) environment variables.",
      },
      { status: 400 }
    )
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    const errorCode = (error as any)?.code || "NO_CODE"
    const errorResponse = (error as any)?.response || "NO_RESPONSE"

    return NextResponse.json({
      status: "FAILED",
      config,
      error: errorMsg,
      errorCode,
      errorResponse,
    })
  }
}