import { Currency } from "@common/types";

export interface FilterState {
    amountFrom: string;
    amountTo: string;
    currency: Currency[];
}

export interface FilterProps {
    onChange: (newFilterState: FilterState) => void;
    initialState?: Partial<FilterState>;
}
