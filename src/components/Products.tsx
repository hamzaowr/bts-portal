import { TbDeviceIpad } from "react-icons/tb";
import ProductCard from "./ProductCard";
import type { ProductCardProps } from "@/lib/definitions";

const Products = () => {
  const productsCardsData: ProductCardProps[] = [
    {
      title: `22" Monitors`,
      imageUrl: "/22_monitors.webp",
      price: 55.0,
      type: "Monitors",
      boxCapacity: 5,
    },
    {
      title: `27" Monitors`,
      imageUrl: "/27_monitors.webp",
      price: 70.0,
      type: "Monitors",
      boxCapacity: 1,
    },
    {
      title: "Apple iPads",
      imageUrl: "/apple-ipads.webp",
      price: 50.0,
      type: "Tables",
      boxCapacity: 30,
    },
    {
      title: "iPad Keyboard Case",
      imageUrl: "/ipad-keyboard-case.webp",
      price: 24.0,
      type: "Accessories",
      boxCapacity: 30,
    },
    {
      title: "Laptops",
      imageUrl: "/laptops.webp",
      price: 114.0,
      type: "Laptops",
      boxCapacity: 12,
    },
    {
      title: "Power Bank",
      imageUrl: "/power-bank.webp",
      price: 1.0,
      type: "Accessories",
      boxCapacity: 30,
    },
    {
      title: "Charging Station",
      imageUrl: "/charging-station.webp",
      price: 15.0,
      type: "Accessories",
      boxCapacity: 30,
    },
    {
      title: "Color Black & White Printer",
      imageUrl: "/color-black-and-white-printer.webp",
      price: 200.0,
      type: "Printers",
      boxCapacity: 1,
    },
    {
      title: "Laser Black & White Printer",
      imageUrl: "/laser-black-and-white-printer.webp",
      price: 200.0,
      type: "Printers",
      boxCapacity: 1,
    },
  ];
  return (
    <section className="container mx-auto py-8 space-y-4 text-center">
      <h6 className="font-medium text-pink-500 flex items-center justify-center gap-2">
        <TbDeviceIpad size={18} /> Individual Items
      </h6>

      <h2 className="font-bold text-3xl">Individual Products</h2>
      <p className="text-gray-400">Individual equipment rentals</p>

      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {productsCardsData.map((data) => (
          <ProductCard key={data.title} data={data} />
        ))}
      </div>
    </section>
  );
};

export default Products;
