import "@douyinfe/semi-ui/dist/css/semi.min.css";
import "./index.css";

import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import { Outlet } from "@modern-js/runtime/router";
import { WalletInfoContext } from "@/common/AppContext";
import useConnectWallet from "@/hooks/useWallet";
import {
  Spin,
  Typography,
  Layout as SemiLayout,
  LocaleProvider,
} from "@douyinfe/semi-ui";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { hasInstalledMetamask } from "@/utils/metamask";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const commonStyle = "h-[100vh] flex justify-center items-center bg-gray-100";

export default function Layout() {
  const { walletInfo, connect } = useConnectWallet();

  if (!hasInstalledMetamask()) {
    return (
      <div className={commonStyle}>
        <Typography.Text
          link={{ target: "_blank", href: `https://metamask.io/download.html` }}
        >
          You must install Metamask, a virtual Ethereum wallet, in your browser.
        </Typography.Text>
      </div>
    );
  }

  if (walletInfo.checking) {
    return (
      <div className={commonStyle}>
        <div className="flex items-center">
          <div className="mr-3">In initialization, please wait patiently</div>
          <Spin spinning />
        </div>
      </div>
    );
  }

  if (!walletInfo.address) {
    return (
      <div className={commonStyle}>
        <ConnectWalletButton
          loading={walletInfo.connecting}
          onClick={connect}
        />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider locale={en_US}>
        <WalletInfoContext.Provider value={walletInfo}>
          <SemiLayout>
            <Header />

            <SemiLayout.Content className="min-h-[calc(100vh-48px)] bg-gray-100 p-8">
              <Outlet />
            </SemiLayout.Content>
          </SemiLayout>
        </WalletInfoContext.Provider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
