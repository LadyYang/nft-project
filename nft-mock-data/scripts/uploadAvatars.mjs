/**
 * Upload files and metadata information to Pinata(IPFS)
 * so, we can fetch this information later. (in NFT)....
 *
 * NOTE: It has been initialized by Tao Chen.
 */
import { PinataSDK } from "pinata-web3";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { resolve } from "path";

const pathname = "./backend-mock-data";

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MTc4OGMyZC1hNzcxLTRkNDYtYjYzOC1jOTRhM2FlMjA0MzEiLCJlbWFpbCI6ImNoZW50YW8uYXVzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3NmVlYTVhZTMyYWYyYmY0MmMwYSIsInNjb3BlZEtleVNlY3JldCI6Ijk3NmFkNTVlNGFkNDk4ZDIwZjE1MzQ3MGE0NTdlZmIxN2I2YzU1OWFiOWU5ZjU0NzA5M2U5NDA2Mzc0NTJiYTYiLCJleHAiOjE3NjI1MDE0NTd9.opa60zB71IeVpBwiAWofJk0yNLSZR2Wv3Wo418Ogduw",
  pinataGateway: "turquoise-efficient-leopon-221.mypinata.cloud",
});

async function main() {
  const files = readdirSync(`${pathname}/avatars`);

  const promises = files.map(async (filename) => {
    try {
      const file = readFileSync(`${pathname}/avatars/${filename}`);
      const metadata = readFileSync(
        `${pathname}/ntf-metadata/${filename.split(".png", -1)[0]}.json`
      );

      const resp = await pinata.upload.base64(file.toString("base64"));

      /* for example:
    resp = {
      IpfsHash: 'bafybeiftdb4ss26lhw4lo6aqkbwwwjy7rnd2wopxomwdccih6kevq5jaum',
      PinSize: 1817837,
      Timestamp: '2024-11-07T08:36:54.456Z'
    }
  */
      const resp2 = await pinata.updateMetadata({
        cid: resp.IpfsHash,
        name: filename,
        keyValues: JSON.parse(metadata.toString()),
      });
    } catch (error) {
      console.log("error = ", error);
    }
  });

  await Promise.allSettled(promises);
}

main();
