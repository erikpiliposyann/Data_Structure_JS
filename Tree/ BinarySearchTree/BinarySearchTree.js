class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert (value) {
        if (!this.root) {
            this.root = new TreeNode(value);
            return;
        }

        let current = this.root;
        while(current) {
            if (current.value > value) {
                if (current.left === null) {
                    current.left = new TreeNode(value);
                    return;
                }
                current = current.left;
            } else if (current.value < value){
                if (current.right === null) {
                    current.right = new TreeNode(value);
                    return;
                }
                current = current.right;
            }  else {
                return;
            }
        }
    }

    search (value) {
        let current = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return current;
            }   
        }
        return null;
    }

    contains (value) {
        let current = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }   
        }
        return false;
    }

    findMin () {
        if (!this.root) {
            return null;
        }
        let current = this.root;

        while (current.left) {
            current = current.left;
        }  

        return current.value;
    }

    findMax() {
         if (!this.root) {
            return null;
        }
        let current = this.root;

        while (current.right) {
            current = current.right;
        }  

        return current.value;
    }

    remove (value) {
        let current = this.root;

        while (current) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                break;
            }   
        }

        if (!current.left && !current.right) {
            delete current;
        } else if (!current.left) {

        } else {

        }
        
    }
}



const tree = new BinarySearchTree();

console.log(tree.root); // null

const node = new TreeNode(10);

console.log(node);
