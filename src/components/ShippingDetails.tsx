import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useCart } from "@/context/use-cart";
import { Separator } from "./ui/separator";
import { calculateShipping } from "@/lib/shipping";

const ShippingDetails = () => {
  const { items, selectedState } = useCart();
  const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const shipping = calculateShipping(items, selectedState);

  const total = subTotal + shipping?.delivery + shipping?.collection;

  return (
    <Card className="bg-white py-8 px-4 w-full h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-500 font-bold">
          <LiaShippingFastSolid /> Delivery & Collection Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="">Boxes: </h5>
          <h5 className="font-bold">{shipping.totalBoxes}</h5>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="">Subtotal: </h5>
          <h5 className="font-bold">${subTotal.toFixed(2)}</h5>
        </div>

        <em className="text-gray-400 block">
          * Chargers and cables will be included with the order
        </em>

        <Separator />

        <div className="flex justify-between items-center">
          <h5 className="">Delivery: </h5>
          <h5 className="font-bold">${shipping?.delivery.toFixed(2)}</h5>
        </div>
        <div className="flex justify-between items-center">
          <h5 className="">Collection: </h5>
          <h5 className="font-bold">${shipping?.collection.toFixed(2)}</h5>
        </div>
        <Separator />

        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl">Total Amount: </h4>
          <h4 className="font-bold text-xl text-pink-500">
            ${total.toFixed(2)}
          </h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingDetails;
