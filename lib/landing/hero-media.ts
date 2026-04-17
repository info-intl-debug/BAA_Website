export type HeroSlide = {
  imageUrl: string
  title: string
  subtitle: string
}

export type HeroMedia = {
  slides: HeroSlide[]
  /**
   * Transparent PNG/SVG recommended.
   * Shown on the right side, on top of the background image.
   */
  rightOverlayImageUrl?: string
  rightOverlayAlt?: string
}

function readPublicEnv(name: string): string | undefined {
  const raw = process.env[name]
  if (!raw) return undefined
  const value = raw.trim()
  return value.length ? value : undefined
}

function readPublicEnvList(name: string): string[] | undefined {
  const value = readPublicEnv(name)
  if (!value) return undefined
  const items = value
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
  return items.length ? items : undefined
}

function buildSlidesFromEnv(): HeroSlide[] | undefined {
  const images = readPublicEnvList('NEXT_PUBLIC_HERO_SLIDE_IMAGE_URLS')
  if (!images) return undefined

  const titles = readPublicEnvList('NEXT_PUBLIC_HERO_SLIDE_TITLES') ?? []
  const subtitles = readPublicEnvList('NEXT_PUBLIC_HERO_SLIDE_SUBTITLES') ?? []

  return images.map((imageUrl, i) => ({
    imageUrl,
    title: titles[i] ?? 'Voice of the Industry',
    subtitle:
      subtitles[i] ??
      'The Buying Agents Association represents and supports buying agents across India, fostering international trade relationships and driving industry excellence for over seven decades.',
  }))
}

export const heroMedia: HeroMedia = {
  slides:
    buildSlidesFromEnv() ?? [
      {
        imageUrl:
          'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
        title: 'Voice of the Industry',
        subtitle:
          'The Buying Agents Association represents and supports buying agents across India, fostering international trade relationships and driving industry excellence for over seven decades.',
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920',
        title: 'Connecting Buyers & Sellers Globally',
        subtitle:
          'Bridging the gap between international buyers and Indian exporters with trust, expertise, and decades of industry knowledge.',
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920',
        title: 'Building Stronger Trade Relations',
        subtitle:
          "Fostering partnerships that drive growth, innovation, and excellence in India's thriving export ecosystem.",
      },
      {
        imageUrl:
          'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1920',
        title: 'Supporting Members Since 1946',
        subtitle:
          'Over seven decades of championing the rights and interests of buying agents across every major industry sector.',
      },
    ],

  rightOverlayImageUrl: readPublicEnv('NEXT_PUBLIC_HERO_RIGHT_OVERLAY_IMAGE_URL'),
  rightOverlayAlt: readPublicEnv('NEXT_PUBLIC_HERO_RIGHT_OVERLAY_ALT') ?? 'Hero illustration',
}

