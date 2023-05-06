import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [senderBalance, setSenderBalance] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [balanceRecipient, setBalanceRecipient] = useState(0);
  const [recipientName, setRecipientName] = useState("");

  return (
    <div className="app">
      <Wallet
        senderBalance={senderBalance}
        setSenderBalance={setSenderBalance}
        senderName={senderName}
        setSenderName={setSenderName}
        setBalanceRecipient={setBalanceRecipient}
        recipientName={recipientName}
      />
      <Transfer
        balanceRecipient={balanceRecipient}
        setBalanceRecipient={setBalanceRecipient}
        recipientName={recipientName}
        setRecipientName={setRecipientName}
      />
    </div>
  );
}

export default App;
