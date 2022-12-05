const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  "127c787af7872b2ab088ec6ca1fa2015e85833f5": 100,
  "2cb4e9877936e3e391d776151beda361e98e615c": 50,
  b7be05c7943f75f38a07ffff7efcabdd605b9ef1: 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const publicKey = recoverKey("default", signature, Number(recoveryBit));
  const queriedAccount = toHex(getAddress(publicKey));
  const balancesKeys = Object.keys(balances);
  const found = balancesKeys.find((account) => account == queriedAccount);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (!found) {
    res.status(400).send({ message: "Account not located" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

// Hash message
function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

// Recover key
function recoverKey(message, signature, recoveryBit) {
  return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
}

// Key to address
function getAddress(publicKey) {
  const sliced = publicKey.slice(1, publicKey.length);
  const hashed = keccak256(sliced);
  return hashed.slice(12, hashed.length);
}
