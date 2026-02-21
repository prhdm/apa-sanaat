import type { Metadata } from 'next'
import './globals.css'
import { getCategories } from '@/lib/queries/products'
import AppShell from '@/components/layout/app-shell'

export const metadata: Metadata = {
  title: 'سیال صنعت اپا',
  description: 'تامین‌کننده تجهیزات پنوماتیک، شیرهای برقی، پرشرسوئیچ و واحدهای فیلتراسیون صنعتی',
  icons: { icon: '/logo.png' },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categories = await getCategories()

  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans antialiased bg-background text-foreground">
        <AppShell categories={categories}>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
