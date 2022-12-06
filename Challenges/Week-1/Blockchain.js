const Block = require('./Block');

class Blockchain {

    constructor() {
        const genesis = new Block('The genesis block');
        this.chain = [ genesis ];
    }
    
    addBlock(newBlock) {
        newBlock.previousHash = this.chain[this.chain.length -1].toHash();
        this.chain.push(newBlock);
    }

    isValid() {
        // TODO: returns true if blockchain is valid
        // should verify every block on the chain
        let iter = this.chain.length - 1;
        for (iter; iter > 0; iter--) {
            if (this.chain[iter].previousHash.toString() != this.chain[iter-1].toHash().toString()) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
