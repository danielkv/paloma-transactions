import { pick } from "radash";
import { FilterState } from "./components/Filter/types";
import { Currency } from "@common/types";

export function parseFilterState(
    searchParams: URLSearchParams,
): Partial<FilterState> {
    const params: Record<keyof FilterState, string> = pick(
        Object.fromEntries(searchParams),
        ["amountFrom", "amountTo", "currency"],
    );

    const state = {
        ...params,
        currency: (params.currency
            ? params.currency.split(",")
            : []) as Currency[],
    };

    return state;
}

export function filterOutState(
    filter: Partial<FilterState>,
): Partial<FilterState> {
    return Object.entries(filter)
        .filter(([, value]) =>
            Array.isArray(value) ? value.length < 1 : !value,
        )
        .reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: value,
            }),
            {},
        );
}
