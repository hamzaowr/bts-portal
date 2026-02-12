import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { Badge } from "./ui/badge";
import { useCart } from "@/context/use-cart";
import React from "react";
import type { CartItems } from "@/lib/definitions";

const CartItem = ({ data }: { data: CartItems }) => {
  const { updateQuantity, removeItem } = useCart();
  const [isRemoving, setIsRemoving] = React.useState(false);
  const minQty = 1;

  const decrement = () => {
    if (data.quantity === minQty) return;
    updateQuantity(data.id, data.quantity - 1);
  };

  const increment = () => {
    updateQuantity(data.id, data.quantity + 1);
  };

  return (
    <article
      className={`flex items-start gap-4 transition-all duration-300 ease-in-out py-2 ${
        isRemoving
          ? "opacity-0 max-h-0 overflow-hidden"
          : "opacity-100 max-h-50"
      }`}
    >
      <img
        src={data.imageUrl}
        alt={data.title}
        className="w-28 h-28 object-cover"
      />

      <div className="space-y-2 w-full">
        <div className="flex justify-between w-full">
          <Badge className="px-4 bg-linear-to-r from-purple-500 to-pink-500">
            {data.type}
          </Badge>

          <FaTrash
            onClick={() => {
              setIsRemoving(true);
              setTimeout(() => removeItem(data.id), 300);
            }}
            className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
            title="Remove item"
          />
        </div>

        <h5 className="text-base font-medium">{data.title} </h5>

        <div className="flex justify-between w-full gap-4 items-center">
          <div className="flex items-center gap-2">
            <FaMinus
              className={`cursor-pointer transition-opacity ${
                data.quantity === minQty
                  ? "opacity-30 pointer-events-none"
                  : "hover:text-pink-500"
              }`}
              onClick={decrement}
            />
            <span className="px-4">{data.quantity}</span>
            <FaPlus
              className="cursor-pointer hover:text-pink-500"
              onClick={increment}
            />
          </div>

          <div className="flex flex-col items-end">
            <strong className="text-base font-bold text-pink-500">
              ${(data.price * data.quantity).toFixed(2)}
            </strong>
            <em className="text-gray-400 text-xs">${data.price} each</em>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
