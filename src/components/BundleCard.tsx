import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FaCartShopping, FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useCart } from "@/context/use-cart";
import type { BundleCardProps } from "@/lib/definitions";

const BundleCard = ({ data }: { data: BundleCardProps }) => {
  const [quantity, setQuantity] = React.useState(1);

  const { addItem } = useCart();

  return (
    <Card className="p-8 text-center max-w-2xl w-full mx-auto justify-between hover:border-bts-pink border-2 border-transparent">
      <div className="space-y-6">
        <Badge className="px-4 bg-linear-to-r from-bts-pink to-owr-blue block">
          Bundle
        </Badge>
        <img src={data.imageUrl} alt={data.title} className="w-md mx-auto" />
      </div>

      <div className="flex flex-col justify-between gap-6 h-full">
        <h4 className="text-xl font-medium">{data.title}</h4>

        <div>
          <h6 className="">From: ${data.price}</h6>
          <span className="text-gray-400">Available</span>
        </div>

        <div className="flex items-center gap-2 w-full justify-center">
          <h5 className="font-medium">Quantity:</h5>
          <FaMinus
            className={`cursor-pointer transition-opacity ${
              quantity === 1
                ? "opacity-30 pointer-events-none"
                : "hover:text-bts-pink"
            }`}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          />

          <span className="px-4">{quantity}</span>

          <FaPlus
            className="cursor-pointer hover:text-bts-pink"
            onClick={() => setQuantity((q) => q + 1)}
          />
        </div>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="cursor-pointer w-fit mx-auto"
        onClick={() =>
          addItem({
            title: data.title,
            type: "Bundle",
            imageUrl: data.imageUrl,
            price: data.price,
            quantity,
            boxesPerBundle: data.boxesPerBundle,
          })
        }
      >
        <FaCartShopping /> Add to cart
      </Button>
    </Card>
  );
};

export default BundleCard;
