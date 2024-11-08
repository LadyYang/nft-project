import { WalletInfoContext } from "@/common/AppContext";
import { getTokenIdsOfOwner } from "@/utils/ethers";
import { useContext, useEffect, useState } from "react";

const useTokenIDs = () => {
  const [tokenIDs, setTokenIDs] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const walletInfo = useContext(WalletInfoContext);

  useEffect(() => {
    setLoading(true);
    getTokenIdsOfOwner(walletInfo.address)
      .then((n) => setTokenIDs(n.map((n) => Number(n))))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [walletInfo.address]);

  return { tokenIDs, loading };
};

export default useTokenIDs;
