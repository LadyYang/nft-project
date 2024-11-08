import { pinata, successResponse } from "api/common";

export const get = async () => {
  const listFiles = await pinata.listFiles().all();

  return successResponse<string[]>(listFiles.map(it => it.ipfs_pin_hash));
};
