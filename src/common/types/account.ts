import { Currency } from ".";

export interface Account {
    accountId: string;
    accountName: string;
    currency: Currency;
    country: string;
    address: string;
    phoneNumber: string;
    email: string;
}

export type AccountResponse =
    | {
          data: Array<Account>;
          error: null;
      }
    | {
          data: null;
          error: string;
      };
