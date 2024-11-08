import useNFTName from "@/hooks/useNFTName";
import useTokenIDs from "@/hooks/useTokenIDs";
import { IconStrikeThrough } from "@douyinfe/semi-icons";
import { Dropdown, Spin, Typography } from "@douyinfe/semi-ui";
import { useNavigate } from "@modern-js/runtime/router";
import React from "react";

const NFTNumber = () => {
  const { NFTName, loading } = useNFTName();
  const { tokenIDs, loading: numberLoading } = useTokenIDs();

  const navigate = useNavigate();

  return (
    <Dropdown.Item
      icon={<IconStrikeThrough />}
      onClick={() => navigate("/list")}
    >
      <Spin spinning={loading || numberLoading}>
        <Typography.Text>
          {NFTName} ({tokenIDs.length})
        </Typography.Text>
      </Spin>
    </Dropdown.Item>
  );
};

export default NFTNumber;
