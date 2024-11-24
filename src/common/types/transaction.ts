import { Currency } from ".";

export type TransactionDirection = "inflow" | "outflow";

export interface Transaction {
    transactionId: string;
    direction: TransactionDirection;
    amount: number;
    currency: Currency;
    destinationId: string;
    destinationName: string;
    sourceId: string;
    sourceName: string;
    createdAt: string;
}
