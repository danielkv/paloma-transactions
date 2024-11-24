import { useRef, useState } from "react";
import { getTransactionsSocket } from "../useCases/getTransactionsSocket";
import { Transaction } from "@common/types/transaction";

interface UseTransactionsWebsocketParams {
    accountId: string;
    sinceTransactionId: string;
    onError?: (ev: Event) => void;
    cb: (data: Transaction) => void;
}

export function useTransactionsWebsocket({
    accountId,
    sinceTransactionId,
    onError,
    cb,
}: UseTransactionsWebsocketParams) {
    const [state, setState] = useState<"open" | "close">("close");

    const socketRef = useRef<WebSocket | null>(null);

    const handleSocketMessage = (ev: MessageEvent) => {
        const data: Transaction = {
            createdAt: new Date().toLocaleString(),
            ...JSON.parse(ev.data),
        };

        cb(data);
    };

    const open = (
        overrideAccountId?: string,
        overrideSinceTransactionId?: string,
    ) => {
        const socket = getTransactionsSocket(
            overrideAccountId ?? accountId,
            overrideSinceTransactionId ?? sinceTransactionId,
        );

        socketRef.current = socket;

        socket.onopen = () => {
            setState("open");
        };

        socket.onclose = (ev) => {
            console.log("socket closed", ev.code, ev.reason);
            setState("close");
        };

        if (onError) socket.onerror = onError;

        socket.addEventListener("message", handleSocketMessage);
    };

    const close = () => {
        socketRef.current?.removeEventListener("message", handleSocketMessage);
        if (socketRef.current?.readyState === WebSocket.OPEN)
            socketRef.current?.close();
    };

    return { state, open, close };
}
