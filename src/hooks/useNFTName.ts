import { getNFTName } from "@/utils/ethers";
import { useEffect, useState } from "react";

const useNFTName = () => {
  const [NFTName, setNFTName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getNFTName()
      .then(setNFTName)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return { NFTName, loading };
};

export default useNFTName;
