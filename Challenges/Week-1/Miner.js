const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;
const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let nonce = 0;
    let transactions = [];
    while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
        transactions.push(mempool.pop());
    }
    while(true) {
    const block = { id: blocks.length, transactions, nonce }
    const hash = SHA256(JSON.stringify(block));
    if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
        blocks.push({ ...block, hash });
        break;
    }
    nonce++;

    }
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    mempool,
    blocks,
};
