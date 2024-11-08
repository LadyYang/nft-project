import {
  Card,
  Descriptions,
  Form,
  Modal,
  Spin,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import React, { useContext, useRef, useState } from "react";
import Button from "../Button";
import { mintNTF } from "@/utils/ethers";
import { WalletInfoContext } from "@/common/AppContext";
import { ethers } from "ethers";
import { useNavigate } from "@modern-js/runtime/router";
import useTotalSupply from "@/hooks/useTotalSupply";
import styles from "./index.module.scss";

const TOTAL = 20;

interface FormData {
  mintNumber: number;
}

const Mint = () => {
  const formApi = useRef<FormApi<FormData>>();
  const walletInfo = useContext(WalletInfoContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { totalSupply, loading: totalSupplyLoading } = useTotalSupply();

  const mint = async () => {
    try {
      await formApi.current?.validate();
    } catch (error) {
      return;
    }

    try {
      setLoading(true);
      const tx = await mintNTF(
        walletInfo.address,
        formApi.current?.getValue("mintNumber") || 1
      );

      console.log("tx fee = ", tx.fee);

      const data = [
        {
          key: "Gas Price:",
          value: `${ethers.formatUnits(tx.gasPrice, "gwei")} Gwei`,
        },
        { key: "Gas Used:", value: Number(tx.gasUsed) },
        {
          key: "Transaction Fee:",
          value: `${ethers.formatEther(
            BigInt(tx.gasPrice) * BigInt(tx.gasUsed)
          )} ETH`,
        },
        {
          key: "Transaction Hash:",
          value: (
            <Typography.Text
              link={{
                target: "_blank",
                href: `https://sepolia.etherscan.io/tx/${tx.hash}`,
              }}
              ellipsis={{ showTooltip: true }}
              className="w-48"
            >
              {tx.hash}
            </Typography.Text>
          ),
        },
        {
          key: "Block Number",
          value: (
            <Typography.Text
              link={{
                target: "_blank",
                href: `https://sepolia.etherscan.io/block/${tx.blockNumber}`,
              }}
              ellipsis={{ showTooltip: true }}
              className="w-48"
            >
              {tx.blockNumber}
            </Typography.Text>
          ),
        },
        {
          key: "From",
          value: (
            <Typography.Text
              link={{
                target: "_blank",
                href: `https://sepolia.etherscan.io/address/${tx.from}`,
              }}
              ellipsis={{ showTooltip: true }}
              className="w-48"
            >
              {tx.from}
            </Typography.Text>
          ),
        },
        {
          key: "To",
          value: (
            <Typography.Text
              link={{
                target: "_blank",
                href: `https://sepolia.etherscan.io/address/${tx.to}`,
              }}
              ellipsis={{ showTooltip: true }}
              className="w-48"
            >
              {tx.to}
            </Typography.Text>
          ),
        },
      ];

      console.log("tx = ", tx);

      Modal.confirm({
        title: "Transaction Info",
        content: (
          <div>
            <Descriptions data={data} align="left" />
          </div>
        ),
        okText: "Confirm",
        hasCancel: false,
        icon: null,
        maskClosable: false,
        closable: false,
        onOk: () => {
          navigate("/list");
        },
      });
    } catch (error) {
      Toast.error((error as Error).message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        width: "70%",
      }}
    >
      <Form
        getFormApi={(api) => (formApi.current = api)}
        className={styles.root}
      >
        <div className="flex items-center justify-center flex-col">
          <Typography.Title>Start Miniting</Typography.Title>

          <div className="flex mt-4">
            <Typography.Text strong className="mr-3 text-xl">
              MINT
            </Typography.Text>

            <Form.InputNumber
              noLabel
              className="w-56"
              field="mintNumber"
              rules={[{ required: true, message: "required" }]}
              min={1}
              step={1}
              max={TOTAL - totalSupply}
              placeholder={"enter mint number"}
            />
          </div>

          <Spin spinning={totalSupplyLoading}>
            <Typography.Text strong>
              {TOTAL - totalSupply} / {TOTAL}
            </Typography.Text>
          </Spin>

          <Button
            className="mt-5 w-32"
            size="large"
            onClick={mint}
            loading={loading}
          >
            Mint NFT
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Mint;
