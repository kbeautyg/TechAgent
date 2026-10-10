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
import NotFoundPage from './pages/NotFoundPage'
import LegalPage from './pages/LegalPage'

/* Приватная зона — отдельные чанки: не грузятся на публичных страницах */
const LoginPage = lazy(() => import('./pages/LoginPage'))
import DemoNotice from './components/layout/DemoNotice'
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const DemoPage = lazy(() => import('./pages/DemoPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const LoginChooserPage = lazy(() => import('./pages/LoginChooserPage'))
const BuyerLoginPage = lazy(() => import('./pages/account/BuyerLoginPage'))
const AccountPage = lazy(() => import('./pages/account/AccountPage'))
const AccountOrderPage = lazy(() => import('./pages/account/AccountOrderPage'))
const AccountProfilePage = lazy(() => import('./pages/account/AccountProfilePage'))
const StaffLoginPage = lazy(() => import('./pages/staff/StaffPages').then((m) => ({ default: m.StaffLoginPage })))
const StaffOrdersPage = lazy(() => import('./pages/staff/StaffPages').then((m) => ({ default: m.StaffOrdersPage })))
const StaffOrderPage = lazy(() => import('./pages/staff/StaffPages').then((m) => ({ default: m.StaffOrderPage })))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'))
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'))
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'))
const OrdersPage = lazy(() => import('./pages/dashboard/OrdersPage'))
const NewOrderPage = lazy(() => import('./pages/dashboard/NewOrderPage'))
const OrderDetailPage = lazy(() => import('./pages/dashboard/OrderDetailPage'))
const ActPrintPage = lazy(() => import('./pages/dashboard/ActPrintPage'))
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'))
const DocumentsPage = lazy(() => import('./pages/dashboard/DocumentsPage'))
const ChatPage = lazy(() => import('./pages/dashboard/ChatPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'))
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'))
const AdminReportsPage = lazy(() => import('./pages/admin/AdminReportsPage'))

/** Печатные формы открываются без шапки, подвала и нижнего меню */
const BARE_ROUTE = /^\/dashboard\/orders\/[^/]+\/act\/?$/

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function RouteFallback() {
  return <div className="min-h-[50vh]" aria-busy="true" />
}

function App() {
  const { pathname } = useLocation()
  const bare = BARE_ROUTE.test(pathname)
  return (
    <AuthProvider>
      <ScrollToTop />
      <SeoManager />
      <div className="flex flex-col min-h-screen">
        <DemoNotice />
        {!bare && <Header />}
        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/catalog/:id" element={<CatalogChildPage />} />
                <Route path="/login" element={<LoginChooserPage />} />
                <Route path="/login/partner" element={<LoginPage />} />
                <Route path="/login/buyer" element={<BuyerLoginPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/account/orders/:number" element={<AccountOrderPage />} />
                <Route path="/account/profile" element={<AccountProfilePage />} />
                <Route path="/staff/login" element={<StaffLoginPage />} />
                <Route path="/staff" element={<StaffOrdersPage />} />
                <Route path="/staff/orders/:number" element={<StaffOrderPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/legal/:docType" element={<LegalPage />} />

                <Route path="/pay/:paymentId" element={<PaymentPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                <Route path="/dashboard/orders/:id/act" element={<ActPrintPage />} />

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
                  <Route path="reports" element={<AdminReportsPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        {!bare && <Footer />}
        {!bare && <MobileBottomNav />}
      </div>
    </AuthProvider>
  )
}

export default App
