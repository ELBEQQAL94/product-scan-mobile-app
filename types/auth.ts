export interface UserSchema {
  uid: string;
  firstname?: string;
  lastname?: string;
  username?: string | null;
  // profile health
  country?: string;
  last_login: number;
  email: string;
  created_at: number;
  updated_at?: number;
  is_email_verified: boolean;
  is_subscribed: boolean;
  auth_provider: string;
  date_format: string;
  // paymentState
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
