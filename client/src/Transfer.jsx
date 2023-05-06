import { useState } from "react";
import { onNameFieldChange } from "./utils";

function Transfer({
  balanceRecipient,
  setBalanceRecipient,
  recipientName,
  setRecipientName,
}) {
  return (
    <div className="container transfer">
      <h1>Send Transaction</h1>

      <label>
        Recipient's name
        <input
          placeholder="Type an address, for example: Allan, Bob or Coco"
          value={recipientName}
          onChange={(e) => {
            onNameFieldChange(e, setRecipientName, setBalanceRecipient);
          }}
        />
      </label>

      <div className="balance">Balance: {balanceRecipient}</div>
    </div>
  );
}

export default Transfer;
