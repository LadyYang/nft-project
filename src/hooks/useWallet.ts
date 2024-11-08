import { getDefaultWalletInfo, WalletInfo } from "@/common/AppContext";
import { WalletConnectionStatus } from "@/common/consts";
import {
  connectWallet,
  getCurrentAccount,
  hasInstalledMetamask,
} from "@/utils/metamask";
import { Toast } from "@douyinfe/semi-ui";
import { useCallback, useEffect, useState } from "react";

const useWallet = () => {
  const [walletInfo, setWalletInfo] =
    useState<WalletInfo>(getDefaultWalletInfo);

  const onAccountChanged = useCallback((accounts: string[]) => {
    if (accounts.length > 0) {
      setWalletInfo({
        address: accounts[0],
        message: "account change",
        status: WalletConnectionStatus.Connected,
      });
    } else {
      setWalletInfo({
        address: "",
        message: "account change",
        status: WalletConnectionStatus.Unknown,
      });
    }
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      setWalletInfo((prev) => ({ ...prev, checking: true }));
      const data = await getCurrentAccount();
      setWalletInfo((prev) => ({
        ...prev,
        ...data,
      }));
      setWalletInfo((prev) => ({ ...prev, checking: false }));
    };

    if (
      walletInfo.status === WalletConnectionStatus.Unknown &&
      hasInstalledMetamask()
    ) {
      checkStatus();
    }

    window.ethereum?.on("accountsChanged", onAccountChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", onAccountChanged);
    };
  }, [walletInfo.status]);

  const connect = useCallback(async () => {
    setWalletInfo((prev) => ({ ...prev, connecting: true }));
    const data = await connectWallet();

    if (data.message) {
      Toast.error(data.message);
    }

    setWalletInfo((prev) => ({
      ...prev,
      ...data,
    }));
    setWalletInfo((prev) => ({ ...prev, connecting: false }));
  }, []);

  return {
    connect,
    walletInfo,
  };
};

export default useWallet;
