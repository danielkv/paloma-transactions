import { FilterState } from "./types";

export function getInitialState(initial?: Partial<FilterState>): FilterState {
    return {
        amountFrom: initial?.amountFrom ?? "",
        amountTo: initial?.amountTo ?? "",
        currency: initial?.currency ?? [],
    };
}
