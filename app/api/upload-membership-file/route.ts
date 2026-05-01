import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = formData.get("folder") as string
    const organizationName = formData.get("organizationName") as string

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    if (!folder) {
      return NextResponse.json(
        { error: "No folder specified" },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Create a unique filename
    const timestamp = Date.now()
    const sanitizedOrgName = organizationName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 20)
    
    const filename = `${sanitizedOrgName}-${timestamp}-${file.name}`
    const filePath = `membership-forms/${folder}/${filename}`

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from("membership-uploads")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("Supabase upload error:", uploadError)
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("membership-uploads")
      .getPublicUrl(filePath)

    return NextResponse.json(
      { 
        success: true, 
        url: urlData.publicUrl,
        path: filePath 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
