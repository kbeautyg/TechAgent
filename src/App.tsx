import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './screens/Header'
import Footer from './screens/Footer'
import DashboardLayout from './components/layout/DashboardLayout'
import AdminLayout from './components/layout/AdminLayout'

import Landing from './screens/Landing'
import AboutPage from './pages/AboutPage'
import How from './screens/How'
import Catalog from './screens/Catalog'
import Product from './screens/Product'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LegalPage from './pages/LegalPage'
import NotFoundPage from './pages/NotFoundPage'
import PaymentPage from './pages/PaymentPage'

import DashboardPage from './pages/dashboard/DashboardPage'
import OrdersPage from './pages/dashboard/OrdersPage'
import NewOrderPage from './pages/dashboard/NewOrderPage'
import OrderDetailPage from './pages/dashboard/OrderDetailPage'
import ProfilePage from './pages/dashboard/ProfilePage'
import DocumentsPage from './pages/dashboard/DocumentsPage'
import ChatPage from './pages/dashboard/ChatPage'

import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* Chrome (dashboard/admin/login/pay) renders its own focused frame — the
   marketing footer would be visual noise directly under those flows. */
function useShowFooter() {
  const { pathname } = useLocation()
  return !['/dashboard', '/admin', '/login', '/register', '/pay'].some((p) => pathname.startsWith(p))
}

function Shell() {
  const showFooter = useShowFooter()
  return (
    <>
      <Header />
      <main style={{ minHeight: '60vh' }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<How />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<Product />} />
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
        </ErrorBoundary>
      </main>
      {showFooter && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Shell />
    </AuthProvider>
  )
}
