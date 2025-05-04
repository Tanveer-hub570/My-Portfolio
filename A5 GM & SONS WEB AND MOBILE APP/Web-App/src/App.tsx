import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner"; // Using only Sonner
import { AppLayout } from "@/components/layout/AppLayout";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { PartnerProvider } from "@/context/PartnerContext";

import Home from "@/pages/Home";
import FruitPage from "@/pages/FruitPage";
import VegetablePage from "@/pages/VegetablePage";
import ProductDetail from "@/pages/ProductDetail";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderSuccessPage from "@/pages/OrderSuccessPage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import PartnersPage from "@/pages/PartnersPage";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminAddProduct from "@/pages/admin/AdminAddProduct";
import AdminEditProduct from "@/pages/admin/AdminEditProduct";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <PartnerProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  {/* Public Routes */}
                  <Route index element={<Home />} />
                  <Route path="fruits" element={<FruitPage />} />
                  <Route path="vegetables" element={<VegetablePage />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success" element={<OrderSuccessPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="partners" element={<PartnersPage />} />

                  {/* Admin Routes (Protected) */}
                  <Route element={<AdminAuthGuard />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/products" element={<AdminProducts />} />
                    <Route path="admin/products/add" element={<AdminAddProduct />} />
                    <Route path="admin/products/edit/:id" element={<AdminEditProduct />} />
                    <Route path="admin/partners" element={<AdminPartners />} />
                  </Route>

                  {/* Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PartnerProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
