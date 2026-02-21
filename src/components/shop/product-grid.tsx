import ProductCard from './product-card'

interface ProductGridProps {
  products: any[]
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  emptyMessage = 'محصولی یافت نشد',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-600 text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
