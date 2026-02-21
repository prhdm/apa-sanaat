import { prisma } from '@/lib/prisma'

export async function getProducts(filters?: {
  categoryId?: string
  featured?: boolean
  published?: boolean
  search?: string
}) {
  return await prisma.product.findMany({
    where: {
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.featured !== undefined && { featured: filters.featured }),
      ...(filters?.published !== undefined && { published: filters.published }),
      ...(filters?.search && {
        OR: [
          { name: { contains: filters.search } },
          { description: { contains: filters.search } },
        ],
      }),
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  })
}

export async function getFeaturedProducts(limit = 8) {
  return await prisma.product.findMany({
    where: {
      featured: true,
      published: true,
    },
    include: {
      category: true,
    },
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  })
}

export async function getProductsByCategory(categorySlug: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
      published: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
