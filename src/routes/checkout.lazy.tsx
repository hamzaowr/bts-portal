import Checkout from "@/pages/Checkout";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/checkout")({
  component: Checkout,
});
