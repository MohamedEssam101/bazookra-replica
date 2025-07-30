export interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: Date; // Or Date if you convert it
  updated_at: Date; // Or Date if you convert it
}
