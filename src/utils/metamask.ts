import { WalletInfo } from "@/common/AppContext";
import { WalletConnectionStatus } from "@/common/consts";

export const hasInstalledMetamask = () => Boolean(window.ethereum);

const getAccountFromMetamask = async (
  rpcMethod: "eth_requestAccounts" | "eth_accounts"
): Promise<WalletInfo> => {
  if (!hasInstalledMetamask()) {
    return {
      address: "",
      message: "the metamask is not installed",
      status: WalletConnectionStatus.NoInstall,
    };
  }

  try {
    const [address] = await window.ethereum!.request({
      method: rpcMethod,
    });

    if (!address) {
      throw new Error("address is empty");
    }

    return {
      address,
      message: "",
      status: WalletConnectionStatus.Connected,
    };
  } catch (error: unknown) {
    // 1. cancel connection
    // 2. Waiting for connection
    console.log("error = ", error);

    return {
      address: "",
      message: (error as Error).message,
      status: WalletConnectionStatus.NoConnection,
    };
  }
};

export const getCurrentAccount = () => getAccountFromMetamask("eth_accounts");

export const connectWallet = () =>
  getAccountFromMetamask("eth_requestAccounts");
