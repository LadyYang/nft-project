import React, { useContext } from "react";
import { Avatar, Dropdown, Layout, Typography } from "@douyinfe/semi-ui";
import Logo from "../Logo";
import { WalletInfoContext } from "@/common/AppContext";
import { IconUser } from "@douyinfe/semi-icons";
import NFTNumber from "../NFTNumber";

const Header = () => {
  const walletInfo = useContext(WalletInfoContext);

  return (
    <Layout.Header className="flex items-center justify-between h-12 bg-[#2B2D3C] sticky top-0 z-50 py-1 px-3 md:py-2 md:px-6">
      <Logo />

      <Dropdown
        position={"bottom"}
        render={
          <Dropdown.Menu className="p-2">
            {walletInfo.address && (
              <>
                <Dropdown.Item icon={<IconUser />}>
                  <Typography.Text
                    copyable={{ content: walletInfo.address }}
                  >{`${walletInfo.address.substring(
                    0,
                    6
                  )}...${walletInfo.address.substring(38)}`}</Typography.Text>
                </Dropdown.Item>

                <NFTNumber />
              </>
            )}
          </Dropdown.Menu>
        }
      >
        <Avatar size="small" color="orange">
          U
        </Avatar>
      </Dropdown>
    </Layout.Header>
  );
};

export default Header;
