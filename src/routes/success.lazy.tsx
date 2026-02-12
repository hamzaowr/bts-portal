import Success from "@/pages/Success";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/success")({
  component: Success,
});
