import { LiaBoxSolid } from "react-icons/lia";
import BundleCard from "./BundleCard";
import type { BundleCardProps } from "@/lib/definitions";

const Bundles = () => {
  const bundleCardsData: BundleCardProps[] = [
    {
      title: `Laptop and Screen Bundle - 6 Laptops, 6 22" Monitors`,
      imageUrl: "/laptop-and-screen-bundle.webp",
      price: 199.0,
      boxesPerBundle: 3,
    },
    {
      title: `Laptop, Monitor and B&W Printer Bundle - 6 Laptops, 6 22" Monitors & 1 Printer (BW)`,
      imageUrl: "/laptop-monitor-and-colour-laser-printer-bundle.webp",
      price: 199.0,
      boxesPerBundle: 4,
    },
    {
      title: `Laptop, Monitor, and Colour Laser Printer Bundle - 6 Laptops, 6 22" Monitors & 1 Printer (Color Laser)`,
      imageUrl: "/laptop-monitor-and-printer-bundle.webp",
      price: 199.0,
      boxesPerBundle: 5,
    },
  ];
  return (
    <section
      className="container mx-auto py-8 space-y-4 text-center"
      id="bundles"
    >
      <h6 className="font-medium text-bts-pink flex items-center justify-center gap-2">
        <LiaBoxSolid size={18} /> Featured Bundles
      </h6>

      <h2 className="font-bold text-3xl">Equipment Bundles</h2>
      <p className="text-gray-400">
        Upgrade your event with next-gen digital items bundle
      </p>

      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {bundleCardsData.map((data) => (
          <>
            <BundleCard key={data.title} data={data} />
          </>
        ))}
      </div>
    </section>
  );
};

export default Bundles;
