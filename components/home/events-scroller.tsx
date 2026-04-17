'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"

type Event = {
  id: number
  title: string
  description: string
  event_date: string
  location: string
  event_type: string
  image: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="flex-shrink-0 w-[320px] rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground text-xs">
            {event.event_type}
          </Badge>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <Link
          href={`/news/events`}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export function InfiniteScroller({ events }: { events: Event[] }) {
  const [paused, setPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const posRef = useRef(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || events.length === 0) return

    const speed = 0.3
    const animate = () => {
      if (!paused) {
        posRef.current += speed
        const singleWidth = el.scrollWidth / 3
        if (posRef.current >= singleWidth) posRef.current = 0
        el.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [paused, events])

  const items = [...events, ...events, ...events]

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {items.map((event, i) => (
          <EventCard key={`${event.id}-${i}`} event={event} />
        ))}
      </div>
    </div>
  )
}