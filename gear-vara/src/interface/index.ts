import { WALLET } from "@/lib/utils/constants";
import { FunctionComponent, ReactNode, SVGProps } from "react";

type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

type SVGComponent = FunctionComponent<
    SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }
>;

export type { Entries, SVGComponent };



export type WalletId = keyof typeof WALLET;


export interface LayoutProps {
    children: ReactNode
    params?: { id: string }
}