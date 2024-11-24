import { Currency } from "@common/types";
import {
    Button,
    FormHelperText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    useTheme,
} from "@mui/material";
import { FilterProps, FilterState } from "./types";
import { useState } from "react";
import { Cancel, Search } from "@mui/icons-material";
import { getInitialState } from "./helpers";

const zeroFilterState: FilterState = {
    amountFrom: "",
    amountTo: "",
    currency: [],
};

const stringifiedInitialFilterState = JSON.stringify(zeroFilterState);

const Filter: React.FC<FilterProps> = ({ onChange, initialState }) => {
    const theme = useTheme();
    const [filterState, setFilterState] = useState<FilterState>(() =>
        getInitialState(initialState),
    );

    const [publishedState, setPublishedState] = useState<FilterState>(() =>
        getInitialState(initialState),
    );

    const handlePublish = (newFilterState: FilterState) => {
        setPublishedState({ ...newFilterState });

        onChange(newFilterState);
    };
    const handleCleanFilter = () => {
        setFilterState({ ...zeroFilterState });

        handlePublish(zeroFilterState);
    };

    const isZeroFilterState =
        JSON.stringify(filterState) === stringifiedInitialFilterState &&
        JSON.stringify(publishedState) === stringifiedInitialFilterState;

    const hasUnpublishedChanges =
        JSON.stringify(filterState) !== JSON.stringify(publishedState);

    return (
        <Stack direction="row" gap={3}>
            <Stack direction="row" alignItems="center" gap={1}>
                <FormHelperText>Filter by Price: </FormHelperText>
                <TextField
                    type="number"
                    size="small"
                    label="From"
                    value={filterState.amountFrom}
                    onChange={(e) =>
                        setFilterState((current) => ({
                            ...current,
                            amountFrom: e.target.value,
                        }))
                    }
                    sx={{
                        maxWidth: 100,
                        ".MuiOutlinedInput-notchedOutline": {
                            border:
                                filterState.amountFrom !==
                                publishedState.amountFrom
                                    ? `2px solid ${theme.palette.info.main}`
                                    : undefined,
                        },
                    }}
                />
                <TextField
                    type="number"
                    size="small"
                    label="To"
                    value={filterState.amountTo}
                    onChange={(e) =>
                        setFilterState((current) => ({
                            ...current,
                            amountTo: e.target.value,
                        }))
                    }
                    sx={{
                        maxWidth: 100,
                        ".MuiOutlinedInput-notchedOutline": {
                            border:
                                filterState.amountTo !== publishedState.amountTo
                                    ? `2px solid ${theme.palette.info.main}`
                                    : undefined,
                        },
                    }}
                />
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
                <FormHelperText>Filter by Currency:</FormHelperText>
                <Select<Currency[]>
                    multiple
                    size="small"
                    sx={{
                        minWidth: 150,
                        ".MuiOutlinedInput-notchedOutline": {
                            border:
                                filterState.currency !== publishedState.currency
                                    ? `2px solid ${theme.palette.info.main}`
                                    : undefined,
                        },
                    }}
                    value={filterState.currency}
                    onChange={(e) => {
                        const value = e.target.value as Currency[] | Currency;
                        setFilterState((current) => ({
                            ...current,
                            currency:
                                typeof value === "string" ? [value] : value,
                        }));
                    }}
                    displayEmpty
                    input={<OutlinedInput />}
                    renderValue={(selected) =>
                        selected.length ? selected.join(", ") : "None"
                    }
                >
                    {Object.values(Currency).map((currency) => (
                        <MenuItem key={currency} value={currency}>
                            {currency}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
            <Button
                onClick={() => handlePublish(filterState)}
                variant="contained"
                disabled={!hasUnpublishedChanges}
                startIcon={<Search />}
            >
                Filter
            </Button>
            <Button
                onClick={handleCleanFilter}
                variant="text"
                startIcon={<Cancel />}
                disabled={isZeroFilterState}
            >
                Reset Filter
            </Button>
        </Stack>
    );
};

export default Filter;
