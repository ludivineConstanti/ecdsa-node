const { textToBigint } = require("bigint-conversion");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { verifySignature } = require("./utils");

app.use(cors());
app.use(express.json());

const balances = [
  {
    name: "Allan",
    publicKey:
      "030559252bc98e1a2b0e8e2514d2a7e192ccc9768d8d31f47bfbff5e47393c425e",
    balance: 100,
  },
  {
    name: "Bob",
    publicKey:
      "03782b82d4c12a989dde7a15bce19635eff62011778793d62b93d7dcc855ae9f3e",
    balance: 50,
  },
  {
    name: "Coco",
    publicKey:
      "02cbf5a4bd73842e00d71090d585be99aaec7ca9eb474c1e7e1735ba71ab9749c3",
    balance: 75,
  },
];

const getAccount = (name) => {
  return balances.find((account) => account.name === name);
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const account = getAccount(address);
  const balance = account ? account.balance : 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const senderAccount = getAccount(sender);
  const recipientAccount = getAccount(recipient);

  if (senderAccount === undefined) {
    res
      .status(400)
      .send({ message: `The account of the sender does not exist` });
  } else if (senderAccount.publicKey === undefined) {
    res.status(400).send({
      message: `The public key of the sender's account is not in the database`,
    });
  }

  const isValid = await verifySignature(
    {
      ...signature,
      r: BigInt(signature.r),
      s: BigInt(signature.s),
    },
    amount.toString(),
    senderAccount.publicKey
  );

  if (isValid === false) {
    res.status(400).send({ message: `The signature is incorrect` });
  } else if (senderAccount.balance === undefined) {
    res
      .status(400)
      .send({ message: `The account of the sender does not have any balance` });
  } else if (recipientAccount === undefined) {
    res.status(400).send({ message: `The receiving account does not exist` });
  } else if (recipientAccount.balance === undefined) {
    res
      .status(400)
      .send({ message: `The receiving account does not have any balance` });
  } else if (senderAccount.balance < amount) {
    res.status(400).send({ message: `Not enough funds!` });
  } else {
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;
    res.send({
      balanceSender: getAccount(sender).balance,
      balanceReceiver: getAccount(recipient).balance,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
