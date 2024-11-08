import React, { FC } from "react";
import MetamaskJPG from "@/static/metamask.jpg";
import Button from "../Button";
import { type ButtonProps } from "@douyinfe/semi-ui/lib/es/button/Button";
import clsx from "clsx";
import { Card, Typography } from "@douyinfe/semi-ui";

const ConnectWalletButton: FC<ButtonProps> = ({ ...props }) => {
  return (
    <Card
      shadows="hover"
      bodyStyle={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={MetamaskJPG} className="w-80 rounded-sm" />
      <Typography.Text strong className="mt-3">
        Please, connect your wallet
      </Typography.Text>
      <Button {...props} className={clsx("mt-3", props.className)}>
        Connect wallet
      </Button>
    </Card>
  );
};

export default ConnectWalletButton;
