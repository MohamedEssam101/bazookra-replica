interface User {
  id: number;
  email: string;
  password: string; // This gets hashed automatically by json-server-auth
  // Add your custom fields below:
  name?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
  preferences?: {
    default_branch_id?: number;
    preferred_spice?: string;
    notifications?: boolean;
  };
  created_at?: string;
  updated_at?: string;
}
