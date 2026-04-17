'use client'

import { Shirt, Leaf, Wrench, Cpu, Palette, Pill, Utensils, Package } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  'shirt': <Shirt className="h-8 w-8" />,
  'leaf': <Leaf className="h-8 w-8" />,
  'wrench': <Wrench className="h-8 w-8" />,
  'cpu': <Cpu className="h-8 w-8" />,
  'palette': <Palette className="h-8 w-8" />,
  'pill': <Pill className="h-8 w-8" />,
  'spoon': <Utensils className="h-8 w-8" />,
  'shoe': <Package className="h-8 w-8" />,
}

interface SectorCardProps {
  id: string
  name: string
  description?: string
  icon_name?: string
}

export function SectorCard({ id, name, description, icon_name = 'leaf' }: SectorCardProps) {
  const icon = iconMap[icon_name] || iconMap['leaf']

  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow h-full flex-shrink-0 w-full min-w-max md:min-w-[240px]">
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">
        {name}
      </h3>
      {description && (
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}