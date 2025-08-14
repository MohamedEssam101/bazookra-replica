export interface Cart {
  id: number;
  name: string;
  user_id: number;
  branch_id: number;
  product_id: number | null;
  size: string | null;
  spice: string | null;
  offer_id: number | null;
  quantity: number;
  price: number;
}

export interface GuestCartItem {
  branch_id?: number;
  product_id: number | null;
  size: string | null;
  spice: string | null;
  offer_id?: number | null;
  quantity: number;
  price: number;
}
