import { Upload } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  return (
    /* Hero image section with medical training banner */
    <div className="w-full h-80 relative overflow-hidden flex items-center justify-center border-b-4 border-primary/20">
      <Image
        src="/hero-banner.jpg"
        alt="ACLS and BLS Medical Training Program"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  )
}
