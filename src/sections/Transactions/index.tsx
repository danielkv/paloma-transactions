import { useSearchParams } from "@common/hooks/useSearchParams";
import { Transaction } from "@common/types/transaction";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useEffect, useState } from "react";
import { transcactionsColumns } from "./columns";
import { PlayCircle } from "@mui/icons-material";
import { useTransactionsWebsocket } from "@domain/accounts/hooks/useTransactionsWebsocket";
import Filter from "./components/Filter";
import { FilterState } from "./components/Filter/types";
import { omit } from "radash";
import { useSnackbar } from "notistack";
import { parseFilterState } from "./helpers";

const Transactions: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { enqueueSnackbar } = useSnackbar();

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const firstTransactionId = transactions?.[0]?.transactionId || "";

    const selectedAccountId = searchParams.get("accountId") || "";

    const { state, open, close } = useTransactionsWebsocket({
        accountId: selectedAccountId,
        sinceTransactionId: firstTransactionId,
        onError: () => {
            enqueueSnackbar(`WebSocket error: Unkown error`, {
                variant: "error",
            });
        },
        cb: (data) => {
            setTransactions((prev) => [data, ...prev]);
        },
    });

    useEffect(() => {
        setTransactions([]);
        close();
        if (state === "open") open(selectedAccountId, "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAccountId]);

    const handleChangeFilter = (newFilterState: FilterState) => {
        const newState = {
            ...Object.fromEntries(searchParams),
            ...newFilterState,
        };
        setSearchParams(
            omit(
                newState,
                Object.entries(newFilterState)
                    .filter(([, value]) =>
                        Array.isArray(value) ? !value.length : !value,
                    )
                    .map(([key]) => key) as (keyof typeof newState)[],
            ),
        );
    };

    const filteredTransactions = transactions.filter((transaction) => {
        const params = parseFilterState(searchParams);

        if (params.amountFrom) {
            const amountFrom = parseFloat(params.amountFrom);
            if (transaction.amount < amountFrom) return false;
        }

        if (params.amountTo) {
            const amountTo = parseFloat(params.amountTo);
            if (transaction.amount > amountTo) return false;
        }

        if (params.currency?.length) {
            if (!params.currency.includes(transaction.currency)) return false;
        }

        return true;
    });

    if (!selectedAccountId) return null;

    return (
        <Stack gap={3}>
            <Typography variant="h4">Transactions</Typography>

            <Filter
                onChange={handleChangeFilter}
                initialState={parseFilterState(searchParams)}
            />

            <MaterialReactTable
                renderTopToolbarCustomActions={() => (
                    <Button
                        size="large"
                        onClick={() => {
                            if (state === "open") close();
                            else open();
                        }}
                        variant={state === "close" ? "contained" : "outlined"}
                        startIcon={
                            state === "open" ? (
                                <CircularProgress size={15} disableShrink />
                            ) : (
                                <PlayCircle fontSize="large" />
                            )
                        }
                    >
                        {state === "open"
                            ? "Pause streaming"
                            : "Resume streaming"}
                    </Button>
                )}
                enableFilters={false}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableHiding={false}
                enableSorting={false}
                enableColumnActions={false}
                enableBottomToolbar={false}
                columns={transcactionsColumns}
                data={filteredTransactions}
                enablePagination={false}
                enableRowVirtualization
                getRowId={(row) =>
                    `${row.transactionId}.${row.amount}.${row.destinationId}`
                }
                muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
            />
        </Stack>
    );
};

export default Transactions;
