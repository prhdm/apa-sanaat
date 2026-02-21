import { notFound } from 'next/navigation'
import ProductGrid from '@/components/shop/product-grid'
import { getProductsByCategory } from '@/lib/queries/products'
import { prisma } from '@/lib/prisma'
import { Separator } from '@/components/ui/separator'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) return { title: 'دسته‌بندی یافت نشد' }
  return { title: `${category.name} | سیال صنعت اپا` }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) notFound()

  const products = await getProductsByCategory(slug)

  return (
    <div className="px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white">{category.name}</h1>
        {category.description && (
          <p className="text-sm text-zinc-500 mt-1 max-w-2xl">{category.description}</p>
        )}
        <p className="text-xs text-zinc-600 mt-2">{products.length} محصول</p>
      </div>

      <Separator className="mb-8 bg-white/8" />

      <ProductGrid
        products={products}
        emptyMessage={`محصولی در دسته‌بندی ${category.name} یافت نشد`}
      />
    </div>
  )
}
