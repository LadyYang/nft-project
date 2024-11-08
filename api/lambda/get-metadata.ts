import { pinata, successResponse } from "api/common";
import type { RequestOption } from "@modern-js/runtime/server";

export const get = async ({ query }: RequestOption<{ cid: string[] }>) => {
  const listFiles = await pinata.listFiles().all();

  return successResponse(
    listFiles
      .filter(it => query.cid.includes(it.ipfs_pin_hash))
      .map(it => ({ uri: it.ipfs_pin_hash, metadata: it.metadata.keyvalues }))
  );
};
