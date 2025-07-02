export enum ActionTypeEnum {
  REGISTER_ACCOUNT = "REGISTER_ACCOUNT",
  REGISTER_ACCOUNT_WITH_GOOGLE = "REGISTER_ACCOUNT_WITH_GOOGLE",
  LOGIN_ACCOUNT = "LOGIN_ACCOUNT",
  LOGIN_ACCOUNT_WITH_GOOGLE = "LOGIN_ACCOUNT_WITH_GOOGLE",
}

export interface UserAction {
  action_type: ActionTypeEnum;
  action_description: string;
  action_data: string | null;
  date_format: string;
}
