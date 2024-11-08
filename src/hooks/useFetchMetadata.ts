import React, { useEffect, useState } from "react";
import useTokenIDs from "./useTokenIDs";
import useTokenURI, { TokenURIData } from "./useTokenURI";
import { get as getMetadata } from "@api/get-metadata";

interface NFTMetadata extends TokenURIData {
  metadata: Record<string, string>;
}

const useFetchMetadata = () => {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<NFTMetadata[]>([]);
  const { tokenIDs, loading: tokenIdsLoading } = useTokenIDs();

  const { tokenURIData, loading: tokenURILoading } = useTokenURI(tokenIDs);

  console.log("tokenIDsxxxxx = ", tokenIDs, tokenURIData);

  useEffect(() => {
    const fetch = async () => {
      if (!tokenURIData.length) {
        return;
      }

      try {
        setLoading(true);

        const resp = await getMetadata({
          query: { cid: tokenURIData.map((it) => it.uri) },
        });

        setMetadata(
          resp.data.map(
            (it) =>
              ({
                ...it,
                id: tokenURIData.find((it2) => it2.uri === it.uri)?.id ?? 0,
              } as any)
          )
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [tokenURIData]);

  return {
    metadata,
    loading: tokenIdsLoading || tokenURILoading || loading,
  };
};

export default useFetchMetadata;
