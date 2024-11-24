import { CssBaseline, Divider, Stack } from "@mui/material";
import Account from "@sections/Account";
import Transactions from "@sections/Transactions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {
    return (
        <SnackbarProvider>
            <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <Stack spacing={2}>
                    <Account />
                    <Divider />
                    <Transactions />
                </Stack>
            </QueryClientProvider>
        </SnackbarProvider>
    );
}

export default App;
