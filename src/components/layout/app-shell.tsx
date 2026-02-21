'use client'

import { useState, useMemo, Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Home,
  LayoutGrid,
  Wind,
  Cpu,
  Gauge,
  Zap,
  Activity,
  ToggleLeft,
  Settings2,
  Radio,
  Filter,
  ArrowUpDown,
  Menu,
  X,
  Search,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronLeft,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BreadcrumbProvider, useBreadcrumb } from './breadcrumb-context'

interface Category {
  id: string
  name: string
  slug: string
}

interface AppShellProps {
  categories: Category[]
  children: React.ReactNode
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'festo-pneumatic': Wind,
  'rexroth': Cpu,
  'saginomiya': Gauge,
  'asco': Zap,
  'airtac': Activity,
  'shako': ToggleLeft,
  'unid': Radio,
  'norgren': Settings2,
  'lmc-acl-ode': Zap,
  'filtration': Filter,
  'pneumatic-jacks': ArrowUpDown,
}

const VALVE_SLUGS = ['festo-pneumatic', 'rexroth', 'asco', 'airtac', 'shako', 'unid', 'norgren', 'lmc-acl-ode']
const EQUIPMENT_SLUGS = ['saginomiya', 'filtration', 'pneumatic-jacks']

// ── Inner shell (needs access to breadcrumb context) ───────────────────────
function Shell({ categories, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [groupOpen, setGroupOpen] = useState({ valves: true, equipment: true })
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const router = useRouter()
  const { items: ctxBreadcrumbs } = useBreadcrumb()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) router.push(`/products?q=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const catMap = Object.fromEntries(categories.map(c => [c.slug, c]))

  // Derive breadcrumbs from URL, fall back to context items for product detail
  const breadcrumbs = useMemo(() => {
    if (ctxBreadcrumbs.length > 0) return ctxBreadcrumbs

    if (pathname === '/products') {
      return [{ label: 'همه محصولات', href: '/products' }]
    }

    const catMatch = pathname.match(/^\/categories\/([^/]+)$/)
    if (catMatch && catMap[catMatch[1]]) {
      return [{ label: catMap[catMatch[1]].name, href: pathname }]
    }

    return []
  }, [pathname, ctxBreadcrumbs, catMap])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const linkCls = (href: string) =>
    cn(
      'flex items-center gap-2.5 px-2.5 py-[6px] rounded-md text-[13px] transition-colors select-none',
      isActive(href)
        ? 'bg-brand/15 text-brand'
        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5',
    )

  const toggleGroup = (key: 'valves' | 'equipment') =>
    setGroupOpen(prev => ({ ...prev, [key]: !prev[key] }))

  const renderGroup = (
    key: 'valves' | 'equipment',
    label: string,
    Icon: React.ComponentType<{ size?: number }>,
    slugs: string[],
  ) => {
    const open = groupOpen[key]
    const items = slugs.filter(s => catMap[s])

    return (
      <div>
        <button
          onClick={() => toggleGroup(key)}
          className={cn(
            'w-full flex items-center justify-between px-2.5 py-[6px] rounded-md text-[13px]',
            'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors select-none',
          )}
        >
          <span className="flex items-center gap-2.5">
            <Icon size={14} />
            <span className="font-medium">{label}</span>
          </span>
          <ChevronDown
            size={13}
            className={cn(
              'transition-transform duration-200 text-zinc-600',
              open ? 'rotate-0' : '-rotate-90',
            )}
          />
        </button>

        {open && (
          <div className="mt-0.5 space-y-0.5 mr-2.5 border-r border-white/10 pr-1.5">
            {items.map(slug => {
              const cat = catMap[slug]
              const CatIcon = CATEGORY_ICONS[slug] ?? Wrench
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${slug}`}
                  className={linkCls(`/categories/${slug}`)}
                  onClick={() => setMobileOpen(false)}
                >
                  <CatIcon size={13} />
                  <span className="line-clamp-1">{cat.name}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const sidebarNav = (
    <>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        <Link href="/" className={linkCls('/')} onClick={() => setMobileOpen(false)}>
          <Home size={14} />
          صفحه اصلی
        </Link>
        <Link href="/products" className={linkCls('/products')} onClick={() => setMobileOpen(false)}>
          <LayoutGrid size={14} />
          همه محصولات
        </Link>

        <div className="pt-3 space-y-0.5">
          {renderGroup('valves', 'شیرها', Wind, VALVE_SLUGS)}
        </div>

        <div className="pt-1 space-y-0.5">
          {renderGroup('equipment', 'تجهیزات', Wrench, EQUIPMENT_SLUGS)}
        </div>
      </nav>

      {/* Contact footer */}
      <div className="shrink-0 border-t border-white/8 px-4 py-4 space-y-2">
        <a
          href="tel:02133938600"
          className="flex items-center gap-2 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <Phone size={11} />
          <span dir="ltr">021-33938600</span>
        </a>
        <a
          href="mailto:info@ranehsanat.ir"
          className="flex items-center gap-2 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <Mail size={11} />
          <span dir="ltr">info@ranehsanat.ir</span>
        </a>
        <div className="flex items-start gap-2 text-[11px] text-zinc-600">
          <MapPin size={11} className="mt-0.5 shrink-0" />
          <span className="leading-relaxed">تهران، لاله‌زار جنوبی، پاساژ اتحادیه، پلاک ۳۵</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* ── Full-width top header ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-black border-b border-white/8 flex items-center">
        {/* Logo — aligns with sidebar on desktop */}
        <div className="hidden md:flex items-center gap-3 w-[260px] h-full px-4 border-l border-white/8 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="سیال صنعت اپا"
              width={36}
              height={36}
              className="object-contain shrink-0"
              priority
            />
            <span className="text-white font-semibold text-sm leading-tight group-hover:text-zinc-200 transition-colors">
              سیال صنعت اپا
            </span>
          </Link>
        </div>

        {/* Content bar */}
        <div className="flex flex-1 items-center gap-3 px-5 h-full min-w-0">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-zinc-400 hover:text-white transition-colors shrink-0"
            onClick={() => setMobileOpen(true)}
            aria-label="باز کردن منو"
          >
            <Menu size={20} />
          </button>

          {/* Mobile logo */}
          <Link href="/" className="md:hidden flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="سیال صنعت اپا"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
            <span className="text-white font-semibold text-sm">سیال صنعت اپا</span>
          </Link>

          {/* Breadcrumb or Search input */}
          <div className="flex-1 min-w-0 flex items-center">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="جستجوی محصولات..."
                  autoFocus
                  dir="rtl"
                  className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-md px-3 py-1 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-brand/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors shrink-0"
                  aria-label="بستن جستجو"
                >
                  <X size={15} />
                </button>
              </form>
            ) : (
              breadcrumbs.length > 0 && (
                <nav
                  aria-label="مسیر صفحه"
                  className="flex items-center gap-1 text-xs min-w-0"
                >
                  <Link
                    href="/"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                  >
                    خانه
                  </Link>

                  {breadcrumbs.map((item, i) => (
                    <Fragment key={i}>
                      <ChevronLeft
                        size={11}
                        className="rotate-180 text-zinc-700 shrink-0"
                      />
                      {item.href && i < breadcrumbs.length - 1 ? (
                        <Link
                          href={item.href}
                          className="text-zinc-500 hover:text-zinc-300 transition-colors truncate max-w-[180px]"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-zinc-300 truncate max-w-[220px]">
                          {item.label}
                        </span>
                      )}
                    </Fragment>
                  ))}
                </nav>
              )
            )}
          </div>

          {/* Search toggle */}
          {!searchOpen && (
            <button
              className="text-zinc-500 hover:text-zinc-200 transition-colors shrink-0"
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
            >
              <Search size={16} />
            </button>
          )}
        </div>
      </header>

      {/* ── Mobile overlay ───────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar (starts below header) ────────────────────────────── */}
      <aside
        className={cn(
          'fixed top-14 right-0 bottom-0 z-40 w-[260px]',
          'bg-black border-l border-white/8 flex flex-col',
          'transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
        )}
      >
        <button
          className="md:hidden absolute top-3 left-3 text-zinc-500 hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
          aria-label="بستن منو"
        >
          <X size={17} />
        </button>

        {sidebarNav}
      </aside>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="mt-14 md:mr-[260px] min-h-[calc(100vh-56px)]">
        {children}
      </div>
    </>
  )
}

// ── Public export wraps Shell in the BreadcrumbProvider ───────────────────
export default function AppShell({ categories, children }: AppShellProps) {
  return (
    <BreadcrumbProvider>
      <Shell categories={categories}>{children}</Shell>
    </BreadcrumbProvider>
  )
}
