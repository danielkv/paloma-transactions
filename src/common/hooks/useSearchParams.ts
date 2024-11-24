import { useEffect, useState } from "react";

export function useSearchParams(): [
    URLSearchParams,
    (
        searchParams:
            | string[][]
            | Record<string, string>
            | string
            | URLSearchParams,
    ) => void,
] {
    const [searchParams, setSearchParams] = useState<URLSearchParams>(
        new URLSearchParams(window.location.search),
    );

    useEffect(() => {
        const handlePopState = () => {
            setSearchParams(new URLSearchParams(window.location.search));
        };

        window.addEventListener("locationchange", handlePopState);

        return () => {
            window.removeEventListener("locationchange", handlePopState);
        };
    }, []);

    const handleSetSearchParams = (
        init: string[][] | Record<string, string> | string | URLSearchParams,
    ) => {
        const newSearchParams = new URLSearchParams(init);
        setSearchParams(newSearchParams);

        const newUrl = new URL(window.location.href);
        newUrl.search = newSearchParams.toString();

        history.pushState({}, "", newUrl.toString());
    };

    return [searchParams, handleSetSearchParams];
}

(() => {
    const oldPushState = history.pushState;
    history.pushState = function pushState() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line prefer-rest-params
        const ret = oldPushState.apply(this, arguments);
        window.dispatchEvent(new Event("pushstate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
    };

    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line prefer-rest-params
        const ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event("replacestate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
    };

    window.addEventListener("popstate", () => {
        window.dispatchEvent(new Event("locationchange"));
    });
})();
