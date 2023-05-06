import { useState } from "react";
import { onNameFieldChange, signMessage } from "./utils";
import server from "./server";

const accounts = [
  {
    name: "Allan",
    privateKey:
      "bdb7481501da0862ba146ba1e0a867889ef066765112d8ffe82f9a220e965f39",
    password: "password",
  },
  {
    name: "Bob",
    privateKey:
      "5f5ff5e0d65635d3f662f69f6c4ac677acbb8690b08d00dc9f7608f51f82da9c",
    password: "password",
  },
  {
    name: "Coco",
    privateKey:
      "b8162d045103d75b2a762caeb550bca453d58b0ac4e6f1b561013c9aa4e12ed4",
    password: "password",
  },
];

function Wallet({
  senderName,
  setSenderName,
  setSenderBalance,
  senderBalance,
  setBalanceRecipient,
  recipientName,
}) {
  const [sendAmount, setSendAmount] = useState("");
  const [password, setPassword] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const currentAccount = accounts.find(
      (account) => account.name === senderName
    );

    if (currentAccount === undefined) {
      alert("This account does not exist");
    } else if (password !== currentAccount.password) {
      alert("The password should be password");
    }

    const signature = await signMessage(sendAmount, currentAccount.privateKey);

    try {
      const {
        data: { balanceSender, balanceReceiver },
      } = await server.post(`send`, {
        sender: senderName,
        amount: parseInt(sendAmount),
        recipient: recipientName,
        signature: {
          ...signature,
          r: signature.r.toString(),
          s: signature.s.toString(),
        },
      });

      setSenderBalance(balanceSender);
      setBalanceRecipient(balanceReceiver);
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Your Wallet</h1>

      <label>
        Sender's name
        <input
          placeholder="Type an address, for example: Allan, Bob or Coco"
          value={senderName}
          onChange={(e) =>
            onNameFieldChange(e, setSenderName, setSenderBalance)
          }
        ></input>
      </label>
      <div className="balance">Balance: {senderBalance}</div>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>
      <label>
        Password
        <input
          placeholder={`Write "password"`}
          value={password}
          type="password"
          onChange={setValue(setPassword)}
        />
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Wallet;
