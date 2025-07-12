export enum ActionTypeEnum {
  REGISTER_ACCOUNT = "REGISTER_ACCOUNT",
  REGISTER_ACCOUNT_WITH_GOOGLE = "REGISTER_ACCOUNT_WITH_GOOGLE",
  LOGIN_ACCOUNT = "LOGIN_ACCOUNT",
  LOGIN_ACCOUNT_WITH_GOOGLE = "LOGIN_ACCOUNT_WITH_GOOGLE",
  CHECK_USER_EXISTS = "CHECK_USER_EXISTS",
  LOG_OUT = "LOG_OUT",
}

export interface UserAction {
  action_type: ActionTypeEnum;
  action_description: string;
  action_data: string | null;
  date_format: string;
}
