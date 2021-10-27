import { Address } from "@emurgo/cardano-serialization-lib-nodejs";
import { NextApiHandler } from "next";

const convertAddr: NextApiHandler = async (req, res) => {
  const bech = Address.from_bytes(
    Buffer.from(req.body.address, "hex")
  ).to_bech32();

  return new Promise((resolve, reject) => {
    try {
      return resolve(res.status(200).json(bech));
    } catch (e) {
      return reject(
        res.status(500).json({ error: "Error converting to bech32 " })
      );
    }
  });
};
export default convertAddr;
