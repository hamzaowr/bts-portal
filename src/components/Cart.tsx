import React from "react";
import { Button } from "./ui/button";
import { FaCartShopping } from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useCart } from "@/context/use-cart";
import { TbShoppingCartOff } from "react-icons/tb";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();

  const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const isEmpty = items.length === 0;

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer rounded-full shadow-md hover:shadow-black/20 duration-200 ease-in transition-shadow relative"
          >
            <FaCartShopping />
            <span>Cart</span>

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4 px-1 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="p-4 h-full">
          <SheetHeader className="flex-row justify-between">
            <SheetTitle className="font-medium">Shopping Cart</SheetTitle>
            {!isEmpty && (
              <Badge className="px-4 bg-linear-to-r from-purple-500 to-pink-500">
                {totalItems} Item{totalItems > 1 ? "s" : ""}
              </Badge>
            )}
          </SheetHeader>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
              <TbShoppingCartOff size={48} />
              <p>Your cart is empty</p>
              <span>Add products or bundles to continue</span>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    <CartItem data={item} />
                    <Separator className="my-2" />
                  </React.Fragment>
                ))}
              </ScrollArea>
              <SheetFooter className="p-0 pb-4 space-y-4 shrink-0">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold">Subtotal</h5>
                  <h4 className="text-lg text-pink-400 font-bold">
                    ${subTotal.toFixed(2)}
                  </h4>
                </div>

                <Button
                  className="px-12 cursor-pointer bg-linear-to-r from-purple-500 to-pink-500"
                  asChild
                >
                  <a href="/checkout">Checkout</a>
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
