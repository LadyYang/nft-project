import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MTc4OGMyZC1hNzcxLTRkNDYtYjYzOC1jOTRhM2FlMjA0MzEiLCJlbWFpbCI6ImNoZW50YW8uYXVzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3NmVlYTVhZTMyYWYyYmY0MmMwYSIsInNjb3BlZEtleVNlY3JldCI6Ijk3NmFkNTVlNGFkNDk4ZDIwZjE1MzQ3MGE0NTdlZmIxN2I2YzU1OWFiOWU5ZjU0NzA5M2U5NDA2Mzc0NTJiYTYiLCJleHAiOjE3NjI1MDE0NTd9.opa60zB71IeVpBwiAWofJk0yNLSZR2Wv3Wo418Ogduw",
  pinataGateway: "turquoise-efficient-leopon-221.mypinata.cloud",
});

enum ErrorCode {
  Unknown = 1_000_000,
}

export const successResponse = <T = unknown>(data: T) => ({
  code: 0,
  data,
  message: "ok",
});

export const errorResponse = (code: ErrorCode, message: string) => ({
  code,
  message,
});
