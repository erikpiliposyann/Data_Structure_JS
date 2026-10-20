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

    _insert(node, value) {
        if (!node) {
            return new TreeNode(value);
        }
        if (node.value > value) {
            
            _insert(node, value)
        }

    }

    insertRecursive(value) {
        


    }

    _contains(node, value) {}

    _inorder(node, result) {}

    _preOrder(node, result) {}

    _postOrder(node, result) {}

    _levelOrder(node, result) {}

    _remove(node, value) {}


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

    getMin(node) {
        if (!node) {
            return null;
        }
        let current = node;

        while (current.left) {
            current = current.left;
        }  

        return current;
    } 

    getMax(node) {
        if (!node) {
            return null;
        }
        let current = node;

        while (current.right) {
            current = current.right;
        }  

        return current;
    }


    removeIterative (value) {
        let current = this.root;
        let parent = null;

        while (current) {
            if (value < current.value) {
                parent = current;
                current = current.left;
            } else if (value > current.value) {
                parent = current;
                current = current.right;
            } else {
                break;
            }   
        }

        if (!current) {
            return;
        }

        if (!current.left && !current.right) {
            if (!parent) {
                this.root = null;
            } else if (parent.left === current) {
                parent.left = null;
            } else {
                parent.right = null;
            }
            return;

        } else if (!current.right) {
            if (!parent) {
                this.root = current.left;
            } else if (parent.left === current) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
            return;
        } else if (!current.left) {
            if (!parent) {
                this.root = current.right;
            } else if (parent.right === current) {
                parent.right = current.right;
            } else {
                parent.left = current.right;
            }
            return;
        } else {
            let successorParent = current;
            let successor = current.right;

            while(successor.left) {
                successorParent = successor;
                successor = successor.left;
            }
            current.value = successor.value;
            
            if (successorParent === current) {
                successorParent.right = successor.right;
            } else {
                successorParent.left = successor.right;
            }   
            return;
        } 
    }


    insertIterative (value) {
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

    


    inOrder() {
        const result = [];
        
        function traverse(node) {
            if (!node) {
                return;
            }
            traverse(node.left);
            result.push(node.value);
            
        }

        

        return result;
    }
}



const tree = new BinarySearchTree();

console.log(tree.root); // null

const node = new TreeNode(10);

console.log(node);
