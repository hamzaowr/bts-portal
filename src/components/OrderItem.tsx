import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export interface OrderItemProps {
  id: string;
  type:
    | "Tables"
    | "Laptops"
    | "Accessories"
    | "Monitors"
    | "Bundle"
    | "Printers";
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const OrderItem = ({ data }: { data: OrderItemProps }) => {
  return (
    <Card className="p-4 flex flex-row items-center mb-4 shadow">
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
        </div>

        <h5 className="text-lg font-medium">{data.title} </h5>

        <div className="flex justify-between w-full gap-4 items-center">
          <em className="text-gray-400 text-sm">Quantity: {data.quantity}</em>
          <strong className="text-base font-bold text-pink-500">
            ${(data.price * data.quantity).toFixed(2)}
          </strong>
        </div>
      </div>
    </Card>
  );
};

export default OrderItem;
