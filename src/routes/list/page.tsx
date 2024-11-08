import Button from "@/components/Button";
import useFetchMetadata from "@/hooks/useFetchMetadata";
import {
  Card,
  Descriptions,
  List,
  SideSheet,
  Typography,
} from "@douyinfe/semi-ui";
import React, { useState } from "react";

const NFTList = () => {
  const { metadata, loading } = useFetchMetadata();
  const [visible, setVisible] = useState(false);

  const [currentMetadata, setCurrentMetadata] =
    useState<Record<string, string>>();

  console.log("metadata = ", metadata);

  // TODO: add search function...

  return (
    <div>
      <List
        grid={{
          gutter: 12,
          span: 4,
        }}
        loading={loading}
        dataSource={metadata}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`TokenID: ${item.id}`}
              className="flex flex-col justify-center"
              footer={
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      setCurrentMetadata(item.metadata);
                      setVisible(true);
                    }}
                  >
                    Detail
                  </Button>
                </div>
              }
            >
              <img
                src={`https://turquoise-efficient-leopon-221.mypinata.cloud/ipfs/${item.uri}`}
              />
            </Card>
          </List.Item>
        )}
      />

      <SideSheet
        title="NFT Detail"
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        {currentMetadata && (
          <Descriptions
            data={Object.keys(currentMetadata).map((key) => ({
              key,
              value: currentMetadata[key],
            }))}
            align="left"
          />
        )}
      </SideSheet>
    </div>
  );
};

export default NFTList;
