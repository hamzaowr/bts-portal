import { getTotalBoxes } from "./cart-utils";
import type { CartItems } from "./definitions";

export type ShippingZone =
  | "ZONE_2"
  | "ZONE_3"
  | "ZONE_4"
  | "ZONE_5"
  | "ZONE_6"
  | "ZONE_7";

export const ZONE_PRICING: Record<ShippingZone, number> = {
  ZONE_2: 140,
  ZONE_3: 180,
  ZONE_4: 250,
  ZONE_5: 350,
  ZONE_6: 400,
  ZONE_7: 500,
};

export const STATE_TO_ZONE: Record<string, ShippingZone> = {
  CT: "ZONE_2",
  DE: "ZONE_2",
  MD: "ZONE_2",
  MA: "ZONE_2",
  NH: "ZONE_2",
  NJ: "ZONE_2",
  PA: "ZONE_2",
  RI: "ZONE_2",
  VT: "ZONE_2",
  VA: "ZONE_2",
  DC: "ZONE_2",
  FL: "ZONE_3",
  GA: "ZONE_3",
  IL: "ZONE_3",
  IN: "ZONE_3",
  IA: "ZONE_3",
  LA: "ZONE_3",
  MN: "ZONE_3",
  MS: "ZONE_3",
  NY: "ZONE_3",
  NC: "ZONE_3",
  OH: "ZONE_3",
  SC: "ZONE_3",
  TN: "ZONE_3",
  WV: "ZONE_3",
  AL: "ZONE_4",
  AR: "ZONE_4",
  KY: "ZONE_4",
  ME: "ZONE_4",
  MI: "ZONE_4",
  MO: "ZONE_4",
  OK: "ZONE_4",
  WI: "ZONE_4",
  KS: "ZONE_4",
  MT: "ZONE_4",
  NE: "ZONE_4",
  TX: "ZONE_4",
  AZ: "ZONE_5",
  CA: "ZONE_5",
  CO: "ZONE_5",
  NM: "ZONE_5",
  WA: "ZONE_5",
  WY: "ZONE_5",
  ID: "ZONE_6",
  OR: "ZONE_6",
  UT: "ZONE_6",
  NV: "ZONE_7",
  ND: "ZONE_7",
  SD: "ZONE_7",
};

export const calculateBoxes = (item: CartItems): number => {
  if (item.type === "Bundle") return item.quantity * (item.boxesPerBundle ?? 0);

  if (!item.boxCapacity || item.boxCapacity <= 0) return 0;

  return Math.ceil(item.quantity / item.boxCapacity);
};

export function calculateShipping(items: CartItems[], stateCode: string) {
  const zone = STATE_TO_ZONE[stateCode];

  if (!zone) return { zone: null, delivery: 0, collection: 0 };

  const costPerBox = ZONE_PRICING[zone];
  const totalBoxes = getTotalBoxes(items);

  const delivery = totalBoxes * costPerBox;
  const collection = totalBoxes * costPerBox;

  return {
    zone,
    totalBoxes,
    delivery,
    collection,
  };
}
