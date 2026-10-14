import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Skeleton } from './components/ui/common'
import Home from './pages/Home'
import { CategoryPage, FestivalPage, OffersPage, SearchPage, Shop } from './pages/Shop'
import { About, Categories, Contact, Festivals, NotFound, Policy } from './pages/Info'

const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Order = lazy(() => import('./pages/Order'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Auth = lazy(() => import('./pages/Auth'))
const Account = lazy(() => import('./pages/Account'))
const Orders = lazy(() => import('./pages/Account').then((m) => ({ default: m.Orders })))

export default function App() {
  return (
    <Suspense fallback={<div className="container-x py-10"><Skeleton className="h-64" /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="product/:slug" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order/:id" element={<Order />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="login" element={<Auth mode="login" />} />
          <Route path="register" element={<Auth mode="register" />} />
          <Route path="forgot-password" element={<Auth mode="forgot" />} />
          <Route path="account" element={<Account />} />
          <Route path="account/orders" element={<Orders />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="festivals" element={<Festivals />} />
          <Route path="festivals/:slug" element={<FestivalPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Policy />} />
          <Route path="terms" element={<Policy />} />
          <Route path="shipping" element={<Policy />} />
          <Route path="returns" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
