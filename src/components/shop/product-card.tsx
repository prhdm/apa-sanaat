import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    images: string
    sku: string | null
    category: {
      name: string
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = JSON.parse(product.images) as string[]

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className={cn(
          'rounded-xl border border-white/8 bg-card overflow-hidden',
          'transition-all duration-200 ease-out',
          'hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/50',
        )}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-white/4">
          <Image
            src={images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-85 group-hover:opacity-100"
          />
          {/* Category gradient overlay */}
          <div className="absolute bottom-0 inset-x-0 px-2.5 pt-6 pb-2 bg-gradient-to-t from-black/70 to-transparent">
            <span className="text-[10px] text-zinc-300 font-medium leading-none">
              {product.category.name}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="px-3 pt-2.5 pb-3">
          <h3 className="text-[13px] font-medium text-zinc-100 line-clamp-2 leading-snug mb-0.5">
            {product.name}
          </h3>
          {product.sku && (
            <p className="text-[10px] text-zinc-600 font-mono">{product.sku}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
