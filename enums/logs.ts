export enum ActionTypeEnum {
  REGISTER_ACCOUNT = "REGISTER_ACCOUNT",
  REGISTER_ACCOUNT_WITH_GOOGLE = "REGISTER_ACCOUNT_WITH_GOOGLE",
  LOGIN_ACCOUNT = "LOGIN_ACCOUNT",
  LOGIN_ACCOUNT_WITH_GOOGLE = "LOGIN_ACCOUNT_WITH_GOOGLE",
  CHECK_USER_EXISTS = "CHECK_USER_EXISTS",
  LOG_OUT = "LOG_OUT",
  SAVE_PRODUCTS_IN_DB = "SAVE_PRODUCTS_IN_DB",
  GET_PRODUCTS = "GET_PRODUCTS",
  SAVE_PRODUCT_IN_DB = "SAVE_PRODUCT_IN_DB",
  UPDATE_USER_HEALTH_DATA = "UPDATE_USER_HEALTH_DATA",
}

export interface UserAction {
  action_type: ActionTypeEnum;
  action_description: string;
  action_data: string | null;
  date_format: string;
}
