const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const sliced = publicKey.slice(1,publicKey.length);
    const hashed = keccak256(sliced);
    return hashed.slice(12,hashed.length);
}

module.exports = getAddress;
