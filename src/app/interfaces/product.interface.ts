export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  pricing: {
    single?: number;
    double?: number;
    triple?: number;
    regular?: number; // Added this
  };
  default_size: string;
  has_size_variants: boolean;
  spice_options: string[]; // Added this
  default_spice: string; // Added this
  has_spice_variants: boolean; // Added this
  image_url: string;
  is_active: boolean;
}
