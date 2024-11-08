import { getTokenURI } from "@/utils/ethers";
import { useEffect, useState } from "react";

export interface TokenURIData {
  id: number;
  uri: string;
}

const useTokenURI = (tokenIds: number[]) => {
  const [loading, setLoading] = useState(false);
  const [tokenURIData, setTokenURIData] = useState<Array<TokenURIData>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const promises = tokenIds.map(async (id) => ({
          id,
          uri: await getTokenURI(id),
        }));

        setTokenURIData(await Promise.all(promises));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [tokenIds]);

  return { tokenURIData, loading };
};

export default useTokenURI;
