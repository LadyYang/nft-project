import { createContext } from "react";
import { WalletConnectionStatus } from "./consts";

export interface WalletInfo {
  address: string;
  message: string;
  status: WalletConnectionStatus;

  // loading state
  connecting?: boolean;
  checking?: boolean;
}

export const getDefaultWalletInfo = () => ({
  status: WalletConnectionStatus.Unknown,
  message: "",
  address: "",

  connecting: false,
  checking: false,
});

export const WalletInfoContext = createContext<WalletInfo>(
  getDefaultWalletInfo()
);
