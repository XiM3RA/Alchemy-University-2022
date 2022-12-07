const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(letters) {
        let temp = this.root;

        for (let i=0; i<letters.length; i++) {
            if (Object.keys(temp.children) == 0) {
                temp.children[letters[i]] = new TrieNode(letters[i]);
                temp = temp.children[letters[i]];
            }
            else if (letters[i] in temp.children) {
                temp = temp.children[letters[i]];
            }
            else {
                temp.children[letters[i]] = new TrieNode(letters[i]);
                temp = temp.children[letters[i]];
            }
        }
        temp.isWord = true;
    }

    contains(letters) {
        let temp = this.root;

        for (let i=0; i<letters.length; i++) {
            if (temp.children[letters[i]]) {
                temp = temp.children[letters[i]];
            }
            else {
                return false;
            }
        }
        if (temp.isWord) {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = Trie;
