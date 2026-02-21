import Image from 'next/image'
import ProductGrid from '@/components/shop/product-grid'
import { getFeaturedProducts, getProducts } from '@/lib/queries/products'
import { Separator } from '@/components/ui/separator'

export default async function HomePage() {
  const [featured, products] = await Promise.all([
    getFeaturedProducts(8),
    getProducts({ published: true }),
  ])

  return (
    <div className="px-6 py-8 max-w-7xl">
      {/* Hero */}
      <div className="mb-10 rounded-2xl border border-brand/20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-l from-brand/10 via-brand/5 to-transparent pointer-events-none" />
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="سیال صنعت اپا"
              width={48}
              height={48}
              className="object-contain shrink-0"
              priority
            />
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">سیال صنعت اپا</h1>
              <p className="text-xs text-brand mt-0.5 font-medium">تامین‌کننده تجهیزات پنوماتیک</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
            عرضه‌کننده شیرهای برقی، تجهیزات پنوماتیک، پرشرسوئیچ و سیستم‌های فیلتراسیون صنعتی از معتبرترین برندهای جهانی
          </p>
          <div className="mt-5 flex items-center gap-6">
            <div>
              <span className="text-2xl font-bold text-white">{products.length}</span>
              <span className="text-xs text-zinc-500 mr-1.5">محصول</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <span className="text-2xl font-bold text-white">۱۱</span>
              <span className="text-xs text-zinc-500 mr-1.5">دسته‌بندی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-sm font-semibold text-zinc-300 whitespace-nowrap">
              محصولات منتخب
            </h2>
            <Separator className="flex-1 bg-white/8" />
          </div>
          <ProductGrid products={featured} />
        </section>
      )}

      {/* All products */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-sm font-semibold text-zinc-300 whitespace-nowrap">
            همه محصولات
          </h2>
          <Separator className="flex-1 bg-white/8" />
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  )
}
