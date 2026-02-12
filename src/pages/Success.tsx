import React, { useEffect, useState } from "react";
import { loadFromStorage } from "@/lib/storage";
import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/use-cart";
import type { CartItems } from "@/lib/definitions";
import OrderItem from "@/components/OrderItem";

const CART_KEY = "rental-cart";
const USER_KEY = "rental-user";

interface RentalUser {
  name?: string;
  email?: string;
  phone?: string;
  rental_start_date?: string;
  rental_end_date?: string;
}

const Success: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart, items: existingItems } = useCart();
  const totalItems = existingItems.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    if (totalItems === 0) {
      navigate({ to: "/" });
    }
  }, [totalItems, navigate]);

  const [items, setItems] = useState<CartItems[]>([]);

  const [user, setUser] = useState<RentalUser>({});

  useEffect(() => {
    const savedItems = loadFromStorage<CartItems[]>(CART_KEY, []);
    const savedUser = loadFromStorage<RentalUser>(USER_KEY, {});

    setItems(savedItems);
    setUser(savedUser);
  }, []);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto py-12 space-y-8 px-8">
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl text-bts-pink font-bold text-center">
            Order Submitted Successfully!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* User Info */}
          {user && (
            <div className="space-y-1">
              <p>
                <strong>Name:</strong> {user.name || "-"}
              </p>
              <p>
                <strong>Email:</strong> {user.email || "-"}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone || "-"}
              </p>
            </div>
          )}

          {/* Rental Dates (from form state, optional redundancy) */}
          <div className="space-y-1">
            <h2 className="font-semibold text-lg text-bts-pink underline">
              Rental Dates
            </h2>
            <p>
              <strong>Start:</strong>{" "}
              {user.rental_start_date
                ? new Date(user.rental_start_date).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {user.rental_end_date
                ? new Date(user.rental_end_date).toLocaleDateString()
                : "-"}
            </p>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg text-bts-pink underline">
              Items Ordered
            </h2>
            {items.length ? (
              items.map((item) => <OrderItem key={item.id} data={item} />)
            ) : (
              <p>No items found</p>
            )}
            <p className="font-bold text-right mt-2">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              clearCart();
              navigate({ to: "/" });
            }}
            className="bg-pink-500 text-white hover:bg-pink-600"
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Success;
