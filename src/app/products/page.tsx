import ProductGrid from '@/components/shop/product-grid'
import { getProducts } from '@/lib/queries/products'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'همه محصولات | سیال صنعت اپا',
}

interface AllProductsPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function AllProductsPage({ searchParams }: AllProductsPageProps) {
  const { q } = await searchParams
  const products = await getProducts({ published: true, search: q })

  return (
    <div className="px-6 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-white">
          {q ? `نتایج جستجو: ${q}` : 'همه محصولات'}
        </h1>
        <p className="text-sm text-zinc-500 mt-1">{products.length} محصول</p>
      </div>

      <Separator className="mb-8 bg-white/8" />

      <ProductGrid
        products={products}
        emptyMessage={q ? `نتیجه‌ای برای «${q}» یافت نشد` : 'محصولی یافت نشد'}
      />
    </div>
  )
}
