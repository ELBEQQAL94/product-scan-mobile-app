export interface UserSchema {
  uid: string;
  username?: string | null;
  is_profile_health_created?: boolean;
  selected_diseases?: string[];
  selected_allergies?: string[];
  country?: string;
  last_login: number;
  email: string;
  created_at: number;
  updated_at?: number;
  is_email_verified: boolean;
  auth_provider: string;
  date_format: string;

  // Enhanced subscription fields
  is_subscribed: boolean;
  subscription_product_id?: string;
  subscription_platform?: "android" | "ios";
  subscription_start_date?: number;
  subscription_expiry_date?: number;
  purchase_token?: string;
}

export interface GoogleAuthUserResponse {
  _redirectEventId: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  photoURL: string;
  providerData: Object[];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  tenantId: string;
  uid: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}
