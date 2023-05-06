const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const generateKeys = () => {
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey);
  console.log("private key:", toHex(privateKey));
  console.log("public key:", toHex(publicKey));
};

console.log(generateKeys);

// Allan's private key: bdb7481501da0862ba146ba1e0a867889ef066765112d8ffe82f9a220e965f39
// Allan's public key: 030559252bc98e1a2b0e8e2514d2a7e192ccc9768d8d31f47bfbff5e47393c425e

// Bob's private key: 5f5ff5e0d65635d3f662f69f6c4ac677acbb8690b08d00dc9f7608f51f82da9c
// Bob's public key: 03782b82d4c12a989dde7a15bce19635eff62011778793d62b93d7dcc855ae9f3e

// Coco's private key: b8162d045103d75b2a762caeb550bca453d58b0ac4e6f1b561013c9aa4e12ed4
// Coco's public key: 02cbf5a4bd73842e00d71090d585be99aaec7ca9eb474c1e7e1735ba71ab9749c3
