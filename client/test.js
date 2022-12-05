//import * as secp from '@noble/secp256k1';

//const msgHash = await secp.utils.sha256('Hello world');
//console.log(secp.utils.bytesToHex(msgHash));
//
import { keccak256 } from 'ethereum-cryptography/keccak.js';
import { sign, recoverPublicKey, getPublicKey } from 'ethereum-cryptography/secp256k1.js';
import { hexToBytes, toHex, utf8ToBytes } from 'ethereum-cryptography/utils.js';

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";


// Hash message
function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

// Sign message
async function signMessage(msg) {
    const hashed_message = hashMessage(msg);
    const [signature, recoveryBit] = await sign(hashed_message, PRIVATE_KEY, { recovered: true});
    console.log("Signature:", toHex(signature));
    console.log("Recovery bit:", recoveryBit);
    return signature;
}

// Recover key
async function recoverKey(message, signature, recoveryBit) {
    return recoverPublicKey(hashMessage(message), signature, recoveryBit);
}

// Key to address
function getAddress(publicKey) {
    const sliced = publicKey.slice(1,publicKey.length);
    const hashed = keccak256(sliced);
    return hashed.slice(12,hashed.length);
}

//const publicKey = getPublicKey(PRIVATE_KEY);
//console.log(toHex(getAddress(publicKey)));

const publicKey = await recoverKey("default","3045022100b92f36c6f53e77398b769796e612b905c991a8d0360bae8d5b42b5a08a56e49802205889ec8792fdb0b4f724bb8b3e9cb272fdc3dd93e9654aca73db42ab8d2feb23",0);
const output = toHex(getAddress(publicKey));
console.log(output);
