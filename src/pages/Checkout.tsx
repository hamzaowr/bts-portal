import DeliveryForm from "@/components/DeliveryForm";
import OrderSummary from "@/components/OrderSummary";
import ShippingDetails from "@/components/ShippingDetails";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/use-cart";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const Checkout = () => {
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalItems === 0) {
      navigate({ to: "/" });
    }
  }, [totalItems, navigate]);

  return (
    <div className="container mx-auto space-y-8 pb-12 px-8">
      <Button variant="link" className="cursor-pointer">
        <FaArrowLeft />
        <a href="/">Back to Shopping</a>
      </Button>

      <h1 className="text-3xl text-bts-pink font-bold">Checkout</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-12">
        <div className="w-full space-y-12">
          <OrderSummary />
          <ShippingDetails />
        </div>
        <DeliveryForm />
      </div>
    </div>
  );
};

export default Checkout;
