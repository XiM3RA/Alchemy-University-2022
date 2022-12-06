class Tree {
    constructor() {
        this.root = null;
    }

    addNode(newNode) {
        if (!this.root) {
            this.root = newNode;
        }
        this.addNodeHelper(this.root, newNode);
        
    }



    addNodeHelper(parent, child) {
        if (child.data < parent.data) {
            if (parent.left) {
                this.addNodeHelper(parent.left, child);
            }
            else {
                parent.left = child;
            }
        }
        
        if (child.data > parent.data) {
            if (parent.right) {
                this.addNodeHelper(parent.right, child);
            }
            else {
                parent.right = child;
            }
        }
    }

    hasNode(number) {
        let temp = this.root;
        while (temp) {
            if (temp.data == number) {
                return true;
            }
            if (number < temp.data) {
                temp = temp.left;
            }
            else if (number > temp.data) {
                temp = temp.right;
            }
        }
        return false;
    }
}

module.exports = Tree;
