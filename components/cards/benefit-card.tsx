'use client'

import {
  Briefcase,
  Users,
  FileText,
  Globe,
  Network,
  Zap,
  Megaphone,
  GraduationCap,
  TrendingUp,
  Scale,
  Handshake,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  'briefcase': <Briefcase className="h-8 w-8" />,
  'users': <Users className="h-8 w-8" />,
  'document': <FileText className="h-8 w-8" />,
  'globe': <Globe className="h-8 w-8" />,
  'network': <Network className="h-8 w-8" />,
  'lightning': <Zap className="h-8 w-8" />,
  'megaphone': <Megaphone className="h-8 w-8" />,
  'graduation-cap': <GraduationCap className="h-8 w-8" />,
  'chart-line': <TrendingUp className="h-8 w-8" />,
  'scale': <Scale className="h-8 w-8" />,
  'handshake': <Handshake className="h-8 w-8" />,
}

interface BenefitCardProps {
  id: string
  title: string
  description: string
  icon_name?: string
}

export function BenefitCard({ id, title, description, icon_name = 'briefcase' }: BenefitCardProps) {
  const icon = iconMap[icon_name] || iconMap['briefcase']

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card hover:shadow-md transition-shadow h-full">
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
