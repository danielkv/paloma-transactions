const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL;

export function getTransactionsSocket(
    accountId: string,
    sinceTransactionId: string,
) {
    let URL = `${WS_BASE_URL}/accounts/${accountId}/transactions`;

    if (sinceTransactionId) URL += `?since=${sinceTransactionId}`;

    const socket = new WebSocket(URL);

    return socket;
}
