import { useParams } from 'react-router-dom'
import { getCategoryBySlug } from '../seo/categories'
import CategoryPage from './CategoryPage'
import ProductPage from './ProductPage'

/**
 * Диспетчер /catalog/:id — slug категории рендерит посадочную,
 * всё остальное трактуется как ID товара (slug-и и ID не пересекаются).
 */
export default function CatalogChildPage() {
  const { id } = useParams<{ id: string }>()
  const landing = id ? getCategoryBySlug(id) : undefined
  if (landing) return <CategoryPage landing={landing} />
  return <ProductPage />
}
