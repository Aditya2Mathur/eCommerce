import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { lazy, Suspense } from "react"
import Loading from "./components/loading"
import Header from "./components/header"
import ProductDetails from "./pages/productDetails"
const Shipping = lazy(() => import("./pages/Shipping"))
const Home = lazy(() => import("./pages/home"))
const Cart = lazy(() => import("./pages/Cart"))
const Search = lazy(() => import("./pages/search"))
const Login = lazy(() => import("./pages/login"))
const Orders = lazy(() => import("./pages/order"))
const OrderDetail = lazy(() => import("./pages/OrderDetail"))

// Admin Panel
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:productId" element={<ProductDetails />} />
          <Route path="/login" element={<Login/>} />
          {/* User Logedin */}
          <Route>
          <Route path="/shipping" element={<Shipping/>} />
          <Route  path="/orders" element={<Orders />} />
          <Route  path="/orders/:id" element={<OrderDetail />} />

          </Route>

          {/* Admin Routes */}
          <Route
            // element={
            //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
            // }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
        </Route>

        </Routes>
      </Suspense>
     
    </BrowserRouter>
  )
}

export default App