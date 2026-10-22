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
        if (node.value < value) {
            node.right = this._insert(node.right, value);
        } else if(node.value > value){
            node.left = this._insert(node.left, value);
        }

        return node;
    }

    _contains (node, value) {
        if (!node) {
            return false;
        }
        if (node.value < value) {
            return this._contains(node.right, value);
        } else if(node.value > value){
            return this._contains(node.left, value);
        } else {
            return true;
        }
    }

    _inorder(node, result) {
        if (!node) return;

        this._inorder(node.left, result);
        result.push(node.value);
        this._inorder(node.right, result);
    }

    _preOrder(node, result) {
        if (!node) return;

        result.push(node.value);
        this._preOrder(node.left, result);
        this._preOrder(node.right, result);
    }

    _postOrder(node, result) {
        if (!node) return;

        this._postOrder(node.left, result);
        this._postOrder(node.right, result);
        result.push(node.value);
    }

    _levelOrder(node, result, level) {
        if (!node) return;
    
        if (!result[level]) {
            result[level] = [];
        }
    
        result[level].push(node.value);
        
        this._levelOrder(node.left, result, level + 1);
        this._levelOrder(node.right, result, level + 1);
    }
    _height(node) {
        if (!node) return -1;
    
        const leftHeight = this._height(node.left);
        const rightHeight = this._height(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    _remove(node, value) {
        if (!node) return null;
    
        if (value < node.value) {
            node.left = this._remove(node.left, value);
        } else if (value > node.value) {
            node.right = this._remove(node.right, value);
        } else {
            if(!node.right && !node.left) {
                return null;
            } else if(!node.right) {
                return node.left;
            } else if(!node.left){
                return node.right;
            } else {
                const successor = this.getMin(node.right);
                node.value = successor.value;
                node.right = this._remove(node.right, successor.value);
            }
        }
    
        return node;
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

    containsIterative (value) {
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

    inOrderIterative () {
        const result = [];
        const stack = [];
    
        let current = this.root;
    
        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }

            let node = stack.pop();
            result.push(node.value);
            current = node.right;
        }
        return result;
    }

    preOrderIterative () {
        const result = [];
        const stack = [];

        if (!this.root) return result;
        
        stack.push(this.root);

        while (stack.length > 0) {
            let node = stack.pop();
            result.push(node.value);
            if (node.right) {
                stack.push(node.right);
            }
            if (node.left) {
                stack.push(node.left);
            }
        }
        return result;
    }

    postOrderIterative() {
        const result = [];
        const stack = [];
        let prev = null;

        let current = this.root;

        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }

            let node = stack[stack.length - 1];

            if (node.right && node.right !== prev) {
                current = node.right;
            } else {
                result.push(node.value);
                stack.pop();
                prev = node;
            }
            
        }
        return result;
    }

    levelOrderIterative() {
        const result = [];
        const queue = [];
    
        if (!this.root) return result;
    
        queue.push(this.root);
    
        while(queue.length > 0) {
            let node = queue.shift();

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            result.push(node.value);
        }
    
        return result;
    }
    
    removeRecursive(value) {
        this.root = this._remove(this.root, value);
    }
 
    height() {
        return this._height(this.root);
    }

    insertRecursive (value) {
        this.root = this._insert(this.root, value);
    }

    containsRecursive (value) {
        return this._contains (this.root, value);
    }

    inOrderRecursive () {
	    const result = [];
        this._inorder(this.root, result);
	    return result;
    }
     
    preOrderRecursive () {
        const result = [];
        this._preOrder(this.root, result);
        return result;
    }

    postOrderRecursive() {
        const result = [];
        this._postOrder(this.root, result);
        return result;
    }
    
    levelOrderRecursive() {
        const result = [];
    
        this._levelOrder(this.root, result, 0);
    
        return result.flat();
    }

}
