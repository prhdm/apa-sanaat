import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Package, Tag, Hash, Phone, Mail, MapPin } from 'lucide-react'
import { getProductBySlug } from '@/lib/queries/products'
import { SetBreadcrumb } from '@/components/layout/set-breadcrumb'
import ProductGallery from '@/components/shop/product-gallery'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return { title: 'محصول یافت نشد' }

  return {
    title: `${product.name} | سیال صنعت اپا`,
    description: product.description || product.name,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const images = JSON.parse(product.images) as string[]

  return (
    <div className="px-6 py-8 max-w-5xl">
      <SetBreadcrumb
        items={[
          { label: product.category.name, href: `/categories/${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <ProductGallery images={images} name={product.name} />

        {/* Info */}
        <div className="space-y-6">
          {/* Category badge */}
          <Link
            href={`/categories/${product.category.slug}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand/10 text-brand text-xs hover:bg-brand/20 transition-colors"
          >
            <Tag size={11} />
            {product.category.name}
          </Link>

          {/* Name */}
          <h1 className="text-2xl font-semibold text-white leading-snug">
            {product.name}
          </h1>

          {/* Meta */}
          <div className="space-y-2 text-sm">
            {product.sku && (
              <div className="flex items-center gap-2 text-zinc-500">
                <Hash size={13} />
                <span className="font-mono text-zinc-400">{product.sku}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-zinc-500">
              <Package size={13} />
              <span className={product.stock > 0 ? 'text-emerald-400' : 'text-zinc-600'}>
                {product.stock > 0 ? 'موجود' : 'ناموجود'}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Description */}
          {product.description && (
            <div>
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                توضیحات
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              برای استعلام قیمت تماس بگیرید
            </h2>
            <div className="space-y-3">
              <a
                href="tel:02133938600"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/4 border border-white/8 hover:bg-white/8 transition-colors group"
              >
                <Phone size={15} className="text-zinc-500 group-hover:text-zinc-300" />
                <div>
                  <p className="text-[11px] text-zinc-600">تلفن</p>
                  <p className="text-sm text-zinc-300 font-mono" dir="ltr">021-33938600</p>
                </div>
              </a>
              <a
                href="tel:02136619746"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/4 border border-white/8 hover:bg-white/8 transition-colors group"
              >
                <Phone size={15} className="text-zinc-500 group-hover:text-zinc-300" />
                <div>
                  <p className="text-[11px] text-zinc-600">تلفن</p>
                  <p className="text-sm text-zinc-300 font-mono" dir="ltr">021-36619746</p>
                </div>
              </a>
              <a
                href="mailto:info@ranehsanat.ir"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/4 border border-white/8 hover:bg-white/8 transition-colors group"
              >
                <Mail size={15} className="text-zinc-500 group-hover:text-zinc-300" />
                <div>
                  <p className="text-[11px] text-zinc-600">ایمیل</p>
                  <p className="text-sm text-zinc-300" dir="ltr">info@ranehsanat.ir</p>
                </div>
              </a>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/4 border border-white/8">
                <MapPin size={15} className="text-zinc-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] text-zinc-600 mb-0.5">آدرس</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    تهران، لاله‌زار جنوبی، پاساژ اتحادیه، طبقه همکف، پلاک ۳۵
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
