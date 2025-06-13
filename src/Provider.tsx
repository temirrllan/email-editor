import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
const queryCLient = new QueryClient()

export function Provider({children}: PropsWithChildren){
    return(
        <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
    )
}