require("dotenv").config();
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");



function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

async function signMessage(account, number) {
    const hashed_message = hashMessage("default");
    const [signature, recoveryBit ] = await secp.sign(hashed_message, account, { recovered: true});
    console.log("          ==================== Account ", number, " ====================");
    console.log("Signature: ", toHex(signature));
    console.log("Recovery bit: ", recoveryBit);
    return signature;
}

function getAddress(publicKey) {
    const sliced = publicKey.slice(1,publicKey.length);
    const hashed = keccak256(sliced);
    return hashed.slice(12,hashed.length);
}

const account1 = signMessage(process.env.PRIVATE_KEY_1, 1);
const account2 = signMessage(process.env.PRIVATE_KEY_2, 2);
const account3 = signMessage(process.env.PRIVATE_KEY_3, 3);

console.log("++++++++++++++++++ ADDRESSES ++++++++++++++++++");
console.log("ADDRESS 1: ", process.env.ADDRESS_1);
console.log("ADDRESS 2: ", process.env.ADDRESS_2);
console.log("ADDRESS 3: ", process.env.ADDRESS_3,"\n");
