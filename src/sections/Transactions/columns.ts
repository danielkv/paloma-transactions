import { Transaction } from "@common/types/transaction";
import { MRT_ColumnDef } from "material-react-table";

export const transcactionsColumns: MRT_ColumnDef<Transaction>[] = [
    {
        header: "Account",
        Cell: ({ row }) =>
            row.original.direction === "inflow"
                ? row.original.sourceName
                : row.original.destinationName,
    },
    {
        header: "Amount",
        accessorKey: "amount",
        Cell: ({ row }) =>
            `${row.original.direction === "inflow" ? "+" : "-"}${row.original.amount} `,
    },
    {
        header: "Currency",
        accessorKey: "currency",
    },
    {
        header: "Time",
        accessorKey: "createdAt",

        Cell: ({ row }) => row.original.createdAt,
    },
];
