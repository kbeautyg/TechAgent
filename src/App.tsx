import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MobileBottomNav from './components/layout/MobileBottomNav'
import SeoManager from './seo/SeoManager'

/* Публичные страницы — в основном бандле: они пререндерятся и должны открываться мгновенно */
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import HowItWorksPage from './pages/HowItWorksPage'
import CatalogPage from './pages/CatalogPage'
import CatalogChildPage from './pages/CatalogChildPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import CalculatorPage from './pages/CalculatorPage'
import NotFoundPage from './pages/NotFoundPage'
import LegalPage from './pages/LegalPage'

/* Приватная зона — отдельные чанки: не грузятся на публичных страницах */
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'))
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'))
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'))
const OrdersPage = lazy(() => import('./pages/dashboard/OrdersPage'))
const NewOrderPage = lazy(() => import('./pages/dashboard/NewOrderPage'))
const OrderDetailPage = lazy(() => import('./pages/dashboard/OrderDetailPage'))
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'))
const DocumentsPage = lazy(() => import('./pages/dashboard/DocumentsPage'))
const ChatPage = lazy(() => import('./pages/dashboard/ChatPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RouteFallback() {
  return <div className="min-h-[50vh]" aria-busy="true" />
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <SeoManager />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:id" element={<CatalogChildPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/legal/:docType" element={<LegalPage />} />

                <Route path="/pay/:paymentId" element={<PaymentPage />} />

                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="orders/new" element={<NewOrderPage />} />
                  <Route path="orders/:id" element={<OrderDetailPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="documents" element={<DocumentsPage />} />
                  <Route path="chat" element={<ChatPage />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </AuthProvider>
  )
}

export default App
