import Header from "@/components/Header";
import { CartProvider } from "@/context/cart-context";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-gray-50 min-h-screen">
      <CartProvider>
        <Header />
        <Outlet />
        <Toaster />
      </CartProvider>
    </div>
  ),
});
