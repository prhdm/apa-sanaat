import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-bold text-white/8 mb-4 select-none">404</p>
        <h2 className="text-lg font-semibold text-white mb-2">صفحه یافت نشد</h2>
        <p className="text-sm text-zinc-500 mb-8">
          صفحه مورد نظر وجود ندارد یا حذف شده است.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/8 text-zinc-300 text-sm hover:bg-white/12 hover:text-white transition-colors"
        >
          <Home size={14} />
          بازگشت به خانه
        </Link>
      </div>
    </div>
  )
}
