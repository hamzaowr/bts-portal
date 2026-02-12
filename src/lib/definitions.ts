export interface ProductCardProps {
  title: string;
  price: number;
  type: "Tables" | "Laptops" | "Accessories" | "Monitors" | "Printers";
  imageUrl: string;
  boxCapacity?: number;
}

export interface CartItems {
  id: string;
  title: string;
  type:
    | "Tables"
    | "Laptops"
    | "Accessories"
    | "Monitors"
    | "Bundle"
    | "Printers";
  imageUrl: string;
  price: number;
  quantity: number;
  boxCapacity?: number;
  boxesPerBundle?: number;
}

export interface BundleCardProps {
  title: string;
  price: number;
  imageUrl: string;
  boxesPerBundle: number;
}

export interface FileFieldProps {
  form: any;
  name: string;
  label: string;
  required?: boolean;
}
