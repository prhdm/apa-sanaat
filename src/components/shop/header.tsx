import Link from 'next/link'
import { ShoppingBag, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getCategories } from '@/lib/queries/products'

export default async function ShopHeader() {
  const categories = await getCategories()

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            فروشگاه آپا
          </Link>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="جستجوی محصولات..."
                className="pr-10"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex gap-6 border-t py-4 overflow-x-auto">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
          >
            صفحه اصلی
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
