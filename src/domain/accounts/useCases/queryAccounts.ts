import api from "@common/provider/api";
import { QUERY_ACCOUNTS_ENDPOINT } from "../constants";
import { Account, AccountResponse } from "@common/types/account";

export async function queryAccounts(): Promise<Account[]> {
    const { data } = await api.get<AccountResponse>(QUERY_ACCOUNTS_ENDPOINT);

    if (data.error) throw new Error(data.error);

    return data.data!;
}
