interface Cart {
  id: number;
  user_id: number;
  branch_id: number;
  product_id: number | null;
  size: string | null;
  spice: string | null;
  offer_id: number | null;
  quantity: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// For the complete cart response
interface CartResponse {
  cart_items: Cart[];
}

// For creating new cart items (without auto-generated fields)
interface CreateCartItem {
  user_id?: number; // Optional for guest users
  branch_id: number;
  product_id?: number | null;
  size?: string | null;
  spice?: string | null;
  offer_id?: number | null;
  quantity: number;
}

// For updating existing cart items
interface UpdateCartItem {
  id: number;
  quantity?: number;
  size?: string | null;
  spice?: string | null;
  updated_at?: string;
}

// For cookie storage (without user_id and timestamps)
interface GuestCartItem {
  branch_id: number;
  product_id: number | null;
  size: string | null;
  spice: string | null;
  offer_id: number | null;
  quantity: number;
}
