const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  const messageBytes = utf8ToBytes(message);
  return keccak256(messageBytes);
}

module.exports.verifySignature = async function (
  signature,
  message,
  publicKey
) {
  const hashedMessage = hashMessage(message);
  return secp256k1.verify(signature, hashedMessage, publicKey);
};
