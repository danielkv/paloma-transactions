import api from "@common/provider/api";
import { Account, AccountResponse } from "@common/types/account";
import { QUERY_ACCOUNTS_ENDPOINT } from "../constants";

export async function queryAccountById(
    accountId: string,
): Promise<Account | undefined> {
    const { data } = await api.get<AccountResponse>(QUERY_ACCOUNTS_ENDPOINT);

    if (data.error) throw new Error(data.error);

    return data.data!.find((account) => account.accountId === accountId);
}
