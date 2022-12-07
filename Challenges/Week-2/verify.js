function verifyProof(proof, node, root, concat) {
    // proof: array of objects, properties data, left
    // node: leaf node to prove is within the tree
    // root: valid Merkle root
    // concat: method to combine leaf nodes
    let temp = node;
    for (let i=0; i< proof.length; i++) {
        if (proof[i].left) {
            temp = concat(proof[i].data, temp);
        }
        else {
            temp = concat(temp, proof[i].data);
        }
    }
    return temp === root;
}

module.exports = verifyProof;
