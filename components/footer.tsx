'use client'

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Linkedin, Instagram, Twitter } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

const quickLinks = [
  { label: "About us", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Membership", href: "/membership" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact Us", href: "/contact" },
]

interface SocialLinks {
  facebook: string | null
  linkedin: string | null
  instagram: string | null
  twitter: string | null
}

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: null,
    linkedin: null,
    instagram: null,
    twitter: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const supabase = createClient()
        
        // Fetch all site_settings
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value')

        if (error) {
          console.error('Error fetching social links:', error)
          setIsLoading(false)
          return
        }

        // Map the results to our state object
        const links: SocialLinks = {
          facebook: null,
          linkedin: null,
          instagram: null,
          twitter: null,
        }

        if (data) {
          data.forEach((item) => {
            if (item.key === 'facebook_url') {
              links.facebook = item.value
            } else if (item.key === 'linkedin_url') {
              links.linkedin = item.value
            } else if (item.key === 'instagram_url') {
              links.instagram = item.value
            } else if (item.key === 'twitter_url') {
              links.twitter = item.value
            }
          })
        }

        setSocialLinks(links)
      } catch (error) {
        console.error('Error fetching social links:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSocialLinks()
  }, [])

  return (
    <footer style={{ backgroundColor: "#636161", color: "#e5e5e5" }}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left: Quick Links */}
          <div>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#E8520A] transition-colors"
                    style={{ color: "#cccccc" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@baa.org.in"
                className="flex items-center gap-3 text-sm hover:text-[#E8520A] transition-colors"
                style={{ color: "#cccccc" }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  <Mail className="h-4 w-4 text-white" />
                </span>
                info@baa.org.in
              </a>
              <a
                href="tel:+919711916996"
                className="flex items-center gap-3 text-sm hover:text-[#E8520A] transition-colors"
                style={{ color: "#cccccc" }}
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#E8520A" }}
                >
                  <Phone className="h-4 w-4 text-white" />
                </span>
                +91-9711916996
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#706d6d" }}
                >
                  <Facebook className="h-4 w-4 text-white" />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#777474" }}
                >
                  <Linkedin className="h-4 w-4 text-white" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#777777" }}
                >
                  <Instagram className="h-4 w-4 text-white" />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#707070" }}
                >
                  <Twitter className="h-4 w-4 text-white" />
                  <span className="sr-only">X / Twitter</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid #7b7979", color: "#888888" }}
        >
          &copy; {new Date().getFullYear()} B.A.A. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
