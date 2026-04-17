"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, UserCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  {
    label: "NEWS",
    href: "/news",
    children: [
      { label: "Notice Board", href: "/news/notices" },
      { label: "Events", href: "/news/events" },
      { label: "Media Coverage", href: "/news/media-coverage" },
    ],
  },
  { label: "MEMBERSHIP", href: "/membership" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => {
    if (!mounted) return false
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      {/* Top Row: Logo + CTA Buttons */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shared%20image-kVkcRB3FPwT1byPsGAbImip1q4rgwC.jpg"
            alt="Buying Agents Association"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right CTA Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
          >
            <Link href="/membership">
              <UserCircle className="h-4 w-4 mr-1" />
              Become a Member
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#E8520A", color: "#ffffff" }}
          >
            <Link href="/auth/login">
              <UserCircle className="h-4 w-4 mr-1" />
              Login
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-full text-xs font-semibold border-gray-300 text-[#2c2c2c] hover:bg-gray-50"
          >
            <Link href="/contact">
              <Mail className="h-4 w-4 mr-1" />
              Contact Us
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Nav Row — centered */}
      <div className="hidden lg:block border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-1 py-2">
            {navItems.map((item) =>
              item.children ? (
                mounted ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide transition-colors focus:outline-none rounded-full hover:bg-[#E8520A] hover:text-white ${
                          isActive(item.href)
                            ? "text-white bg-[#E8520A]"
                            : "text-[#2c2c2c]"
                        }`}
                      >
                        {item.label}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-52 rounded-none mt-0 shadow-lg">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            href={child.href}
                            className="w-full cursor-pointer text-sm py-2 px-4 hover:text-[#E8520A]"
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 text-sm font-semibold tracking-wide text-[#2c2c2c] rounded-full hover:bg-[#E8520A] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors rounded-full hover:bg-[#E8520A] hover:text-white ${
                    isActive(item.href)
                      ? "text-white bg-[#E8520A]"
                      : "text-[#2c2c2c]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="space-y-1">
                  <span className="block px-3 py-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {item.label}
                  </span>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-6 py-2 text-sm text-foreground hover:text-[#E8520A] rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-sm font-semibold text-foreground hover:text-[#E8520A] rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Button asChild className="w-full rounded-full text-xs" style={{ backgroundColor: "#E8520A", color: "#fff" }}>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="w-full rounded-full text-xs text-[#2c2c2c]">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}