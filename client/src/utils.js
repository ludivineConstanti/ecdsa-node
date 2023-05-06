import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import server from "./server";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function hashMessage(message) {
  const messageBytes = utf8ToBytes(message);
  return keccak256(messageBytes);
}

export async function signMessage(message, privateKey) {
  const hashedMessage = hashMessage(message);
  const signature = await secp256k1.sign(hashedMessage, privateKey);
  return signature;
}

export async function onNameFieldChange(evt, setAddress, setBalance) {
  const address = evt.target.value;
  setAddress(address);
  if (address) {
    const {
      data: { balance },
    } = await server.get(`balance/${address}`);
    console.log("balance", balance);
    setBalance(balance);
  } else {
    setBalance(0);
  }
}
