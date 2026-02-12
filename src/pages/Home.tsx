import Bundles from "@/components/Bundles";
import DatesSelector from "@/components/DatesSelector";
import Products from "@/components/Products";

const Home = () => {
  return (
    <>
      <DatesSelector />
      <Bundles />
      <Products />
    </>
  );
};

export default Home;
