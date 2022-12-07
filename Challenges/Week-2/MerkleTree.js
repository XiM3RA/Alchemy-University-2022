iclass MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        return this.getRootHelper(this.leaves);
    }

    getRootHelper(leaves) {
        if (leaves.length == 1) {
            return leaves[0];
        } else if (leaves.length == 2) {
            return this.concat(leaves[0], leaves[1]);
        } else {
            let mid = Math.ceil(leaves.length / 2);
            if (mid % 2 == 0) {
                return this.concat(
                    this.getRootHelper(leaves.slice(0, mid)),
                    this.getRootHelper(leaves.slice(mid, leaves.length))
                );
            } else {
                return this.concat(
                    this.getRootHelper(leaves.slice(0, mid + 1)),
                    this.getRootHelper(leaves.slice(mid + 1, leaves.length))
                );
            }
        }
    }
    getProof(index, layer = this.leaves, proof = []) {
        if (layer.length === 1) return proof;
        const newLayer = [];
        for (let i = 0; i < layer.length; i += 2) {
            let left = layer[i];
            let right = layer[i + 1];
            if (!right) {
                newLayer.push(left);
            } else {
                newLayer.push(this.concat(left, right));

                if (i === index || i === index - 1) {
                    let isLeft = !(index % 2);
                    proof.push({
                        data: isLeft ? right : left,
                        left: !isLeft,
                    });
                }
            }
        }
        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }
}

module.exports = MerkleTree;
