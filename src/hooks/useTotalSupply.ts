import { getTotalSupply } from "@/utils/ethers";
import { useEffect, useState } from "react";

const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTotalSupply()
      .then((v) => setTotalSupply(Number(v)))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return { totalSupply, loading };
};

export default useTotalSupply;
