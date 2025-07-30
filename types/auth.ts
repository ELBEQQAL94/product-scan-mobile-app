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
  is_subscribed: boolean;
  auth_provider: string;
  date_format: string;
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
