import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FaCartShopping, FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "./ui/button";
import type { ProductCardProps } from "@/lib/definitions";
import { useCart } from "@/context/use-cart";

const ProductCard = ({ data }: { data: ProductCardProps }) => {
  const MIN_QTY = 1;
  const [quantity, setQuantity] = React.useState(MIN_QTY);
  const { addItem } = useCart();

  return (
    <Card className="p-8 text-center max-w-2xl w-full mx-auto hover:border-bts-pink border-2 border-transparent">
      <img src={data.imageUrl} alt={data.title} className="mx-auto" />

      <Badge className="px-4 bg-linear-to-r from-bts-pink to-owr-blue mx-auto">
        {data.type}
      </Badge>

      <h4 className="text-xl font-medium">{data.title}</h4>

      <div>
        <h6 className="">From: ${data.price}</h6>
        <span className="text-gray-400">Available</span>
      </div>

      <div className="flex items-center gap-2 mx-auto">
        <div className="flex items-center gap-2 mx-auto">
          <FaMinus
            onClick={() => setQuantity((q) => Math.max(MIN_QTY, q - 1))}
            className={`cursor-pointer transition-opacity ${
              quantity === MIN_QTY
                ? "opacity-30 pointer-events-none"
                : "hover:text-pink-500"
            }`}
          />

          <span className="px-4">{quantity}</span>

          <FaPlus
            onClick={() => setQuantity((q) => q + 1)}
            className="cursor-pointer hover:text-pink-500"
          />
        </div>
      </div>

      <em className="text-gray-400 text-sm">
        * Necessary accesories will be included
      </em>

      <Button
        variant="outline"
        size="lg"
        className="cursor-pointer w-fit mx-auto"
        onClick={() =>
          addItem({
            title: data.title,
            type: data.type,
            imageUrl: data.imageUrl,
            price: data.price,
            quantity,
            boxCapacity: data.boxCapacity,
          })
        }
      >
        <FaCartShopping /> Add to cart
      </Button>
    </Card>
  );
};

export default ProductCard;
