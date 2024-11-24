import { useSearchParams } from "@common/hooks/useSearchParams";
import { queryAccounts } from "@domain/accounts/useCases/queryAccounts";
import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import parsePhoneNumber from "libphonenumber-js";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const Account: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();

    const selectedAccountId = searchParams.get("accountId") || "";

    const { data, isLoading, error } = useQuery({
        queryKey: ["accounts"],
        queryFn: queryAccounts,
    });

    useEffect(() => {
        if (!error) return;

        enqueueSnackbar(`Error: ${error.message}`, {
            variant: "error",
        });
    }, [error, enqueueSnackbar]);

    const selectedAccount = data?.find(
        (account) => account.accountId === selectedAccountId,
    );

    const formattedPhoneNumber = selectedAccount
        ? parsePhoneNumber(selectedAccount.phoneNumber)
        : null;

    return (
        <Stack spacing={2} flex={1}>
            <Box>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <TextField
                        sx={{ minWidth: 200 }}
                        select
                        label="Account"
                        value={selectedAccountId}
                        onChange={(ev) =>
                            setSearchParams({
                                ...Object.fromEntries(searchParams),
                                accountId: ev.target.value,
                            })
                        }
                    >
                        {data?.map((account) => (
                            <MenuItem
                                key={account.accountId}
                                value={account.accountId}
                            >
                                {account.accountName}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            </Box>
            {selectedAccount && (
                <>
                    <Divider />
                    <Box>
                        <Card sx={{ minWidth: 500 }}>
                            <CardContent>
                                <Typography fontWeight="bold">
                                    {selectedAccount.accountName} (
                                    {selectedAccount.currency})
                                </Typography>
                                <Typography fontSize={12}>
                                    {selectedAccount.accountId}
                                </Typography>
                                <Typography fontSize={14}>
                                    {selectedAccount.email}
                                </Typography>
                                <Typography gutterBottom fontSize={14}>
                                    {formattedPhoneNumber?.formatInternational() ||
                                        selectedAccount.phoneNumber}
                                </Typography>
                                <Divider />
                                <Box mt={2}>
                                    <Typography fontSize={14}>
                                        {selectedAccount.address}
                                    </Typography>
                                    <Typography fontSize={14}>
                                        {selectedAccount.country}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </>
            )}
        </Stack>
    );
};

export default Account;
