// Shared TypeScript types for Circle Dish

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Circle {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  member_count: number;
}

export interface CircleMember {
  id: string;
  circle_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  image_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  category?: string;
}

export interface RecipeCircle {
  id: string;
  recipe_id: string;
  circle_id: string;
  added_by: string;
  added_at: string;
  is_private: boolean;
}

export interface Comment {
  id: string;
  recipe_id: string;
  user_id: string;
  content: string;
  parent_id?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Invitation {
  id: string;
  circle_id: string;
  email: string;
  invited_by: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
  expires_at: string;
}

export interface ApiHealthResponse {
  status: 'healthy' | 'unhealthy';
  service: string;
  version: string;
}
