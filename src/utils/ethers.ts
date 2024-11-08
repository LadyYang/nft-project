import { ABI } from "@/common/consts";
import { ethers } from "ethers";
import { get as getAllCids } from "@api/get-all-cid";

const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.BrowserProvider(window.ethereum);

const readContract = new ethers.Contract(contractAddress!, ABI, provider);

export const getTotalSupply = async () => await readContract.totalSupply();

export const mintNTF = async (address: string, num: number) => {
  const resp = await getAllCids();

  const existingUris = (
    (await readContract.hasURI(resp.data)) as string[]
  ).filter(Boolean);

  const selectNFT = (resp.data as string[])
    .filter((it: string) => !existingUris.includes(it))
    .slice(0, num);

  console.log("existingUris = ", existingUris);

  const signer = await provider.getSigner();
  const writeContract = readContract.connect(signer) as ethers.Contract;

  const tx = await writeContract.safeMint(address, selectNFT);

  return await tx.wait();
};

export const getNFTName = async () => readContract.name();

export const getOwnerNFT = async (address: string) =>
  await readContract.balanceOf(address);

export const getTokenIdsOfOwner = async (address: string): Promise<number[]> =>
  await readContract.getTokenIdsOf(address);

export const getTokenURI = async (tokenId: number): Promise<string> =>
  await readContract.tokenURI(tokenId);
