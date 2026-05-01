import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      fullName, 
      email, 
      formDataComplete, 
      category, 
      formType, 
      phone,
      ceoPhotoBase64,
      companyStampBase64,
      finalCompanyStampBase64,
      selfDeclSignatureBase64,
    } = body

    // Function to format form data into HTML
    const formatFormDataHTML = () => {
      if (!formDataComplete) return ""
      
      const data = formDataComplete
      let html = ""
      
      // Basic Information
      if (data.organizationName) {
        html += `
          <h3>📋 Organization Details</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Organization Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.organizationName || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Year Established:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.yearEstablished || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Website:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.website || "N/A"}</td></tr>
          </table>
        `
      }
      
      // Contact Person
      if (data.ceoName) {
        html += `
          <h3>👤 Primary Contact Person (CEO/Director)</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.ceoName || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.ceoEmail || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.ceoMobile || "N/A"}</td></tr>
          </table>
        `
      }
      
      // Alternate Contact
      if (data.altContactName) {
        html += `
          <h3>👥 Alternate Contact Person</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.altContactName || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.altContactEmail || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.altContactMobile || "N/A"}</td></tr>
          </table>
        `
      }
      
      // Registered Address
      if (data.regAddress1) {
        html += `
          <h3>📍 Registered Address</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Address Line 1:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.regAddress1 || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Address Line 2:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.regAddress2 || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>City:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.regCity || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Pin Code:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.regPinCode || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Country:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.regCountry || "N/A"}</td></tr>
          </table>
        `
      }
      
      // Registration Details
      if (data.iecNo || data.gstin || data.panNo) {
        html += `
          <h3>🏢 Registration Details</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>IEC No:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.iecNo || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>GSTIN:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.gstin || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>PAN No:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.panNo || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>CIN No:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.cinNo || "N/A"}</td></tr>
          </table>
        `
      }
      
      // Business Details
      if (data.natureOfBusiness) {
        html += `
          <h3>💼 Business Details</h3>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nature of Business:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.natureOfBusiness || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Business Constitution:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.businessConstitution || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Export Value:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.exportValue || "N/A"}</td></tr>
          </table>
        `
      }
      
      return html
    }
    
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 3px solid #0066cc; padding-bottom: 10px;">🎉 Membership Application Received</h2>
        
        <p style="color: #555; font-size: 16px;">Dear BAA Team,</p>
        
        <p style="color: #555; font-size: 16px;">A new membership application has been submitted with the following details:</p>
        
        <h3 style="color: #0066cc; margin-top: 20px;">📌 Summary</h3>
        <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Applicant/Organization:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${fullName || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${email || "N/A"}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Mobile:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Membership Category:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${category ? category.charAt(0).toUpperCase() + category.slice(1) : "N/A"}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Submission Date:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${new Date().toLocaleDateString("en-IN")}</td>
          </tr>
        </table>
        
        ${formatFormDataHTML()}
        
        <h3 style="color: #0066cc; margin-top: 30px;">📸 Uploaded Documents & Images</h3>
        <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border: 1px solid #eee; border-radius: 8px;">
          ${ceoPhotoBase64 ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #333; margin-bottom: 10px;">CEO/Representative Photo:</h4>
              <img src="${ceoPhotoBase64}" style="max-width: 300px; max-height: 400px; border: 1px solid #ddd; border-radius: 4px;" alt="CEO Photo" />
            </div>
          ` : '<p style="color: #999;">No CEO photo uploaded</p>'}
          
          ${companyStampBase64 ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #333; margin-bottom: 10px;">Company Stamp:</h4>
              <img src="${companyStampBase64}" style="max-width: 300px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px;" alt="Company Stamp" />
            </div>
          ` : ''}
          
          ${finalCompanyStampBase64 ? `
            <div style="margin-bottom: 20px;">
              <h4 style="color: #333; margin-bottom: 10px;">Final Company Stamp:</h4>
              <img src="${finalCompanyStampBase64}" style="max-width: 300px; max-height: 200px; border: 1px solid #ddd; border-radius: 4px;" alt="Final Stamp" />
            </div>
          ` : ''}
          
          ${selfDeclSignatureBase64 ? `
            <div>
              <h4 style="color: #333; margin-bottom: 10px;">Signature:</h4>
              <img src="${selfDeclSignatureBase64}" style="max-width: 300px; max-height: 150px; border: 1px solid #ddd; border-radius: 4px;" alt="Signature" />
            </div>
          ` : ''}
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 2px solid #ddd;">
        
        <p style="color: #666; font-size: 14px; text-align: center;">
          <strong>Next Steps:</strong> Please review this application and contact the applicant within 3-5 business days.
        </p>
        
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
          This is an automated email from BAA Membership System. Please do not reply to this email.
        </p>
      </div>
    `
    
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

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: "info@baa.org.in",
          cc: "harshita.chauhan@axondevelopers.com",
          subject: `Membership Application - ${fullName}`,
          html: emailHTML,
        })

        // Save to Supabase
        try {
          const supabase = await createClient()
          await supabase.from("membership_applications").insert({
            organization_name: formDataComplete.organizationName,
            email: email,
            phone: phone,
            category: category,
            form_data: formDataComplete,
            ceo_photo: ceoPhotoBase64 || null,
            company_stamp: companyStampBase64 || null,
            final_company_stamp: finalCompanyStampBase64 || null,
            signature: selfDeclSignatureBase64 || null,
            submitted_at: new Date().toISOString(),
            status: "submitted",
          })
        } catch (supabaseError) {
          console.error("Supabase save error:", supabaseError)
          // Don't fail email if database save fails
        }

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

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "noreply@baa.org.in",
          to: "jayant.sharma.aiml22@gmail.com",
          cc: "harshita.chauhan@axondevelopers.com",
          subject: `Membership Application - ${fullName}`,
          html: emailHTML,
        })

        // Save to Supabase
        try {
          const supabase = await createClient()
          await supabase.from("membership_applications").insert({
            organization_name: formDataComplete.organizationName,
            email: email,
            phone: phone,
            category: category,
            form_data: formDataComplete,
            ceo_photo: ceoPhotoBase64 || null,
            company_stamp: companyStampBase64 || null,
            final_company_stamp: finalCompanyStampBase64 || null,
            signature: selfDeclSignatureBase64 || null,
            submitted_at: new Date().toISOString(),
            status: "submitted",
          })
        } catch (supabaseError) {
          console.error("Supabase save error:", supabaseError)
          // Don't fail email if database save fails
        }

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
