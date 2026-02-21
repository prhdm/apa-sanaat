'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const src = images[active] || '/placeholder.svg'

  return (
    <div className="space-y-3">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white/4 border border-white/8">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 8).map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                'relative aspect-square rounded-lg overflow-hidden bg-white/4 border transition-all duration-150',
                active === idx
                  ? 'border-brand ring-1 ring-brand/30 opacity-100'
                  : 'border-white/8 hover:border-white/20 opacity-60 hover:opacity-90',
              )}
            >
              <Image
                src={img}
                alt={`${name} - تصویر ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
