import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useCart } from "@/context/use-cart";
import OrderItem from "./OrderItem";

const OrderSummary = () => {
  const { items } = useCart();

  return (
    <Card className="bg-white py-8 px-4 w-full h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-500 font-bold">
          <BsBoxSeam /> Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {" "}
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <OrderItem data={item} />
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
