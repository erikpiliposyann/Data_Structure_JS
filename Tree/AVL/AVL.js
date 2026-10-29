class AvlNode {
    constructor(value) {
        this.data = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVL {
    constructor(value) {
        this.root = value === undefined || value === null
            ? null
            : new AvlNode(value);
    }

    _getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    _update(node) {
        node.height = 1 + Math.max(
            this._getHeight(node.left),
            this._getHeight(node.right)
        );
    }

    _bf(node) {
        return this._getHeight(node.left) - this._getHeight(node.right);
    }

    _getMin(node) {
        if (!node) return null;

        let current = node;

        while (current.left) {
            current = current.left;
        }

        return current;
    }

    _rotateRight(y) {
        const x = y.left;
        const temp = x.right;

        x.right = y;
        y.left = temp;

        this._update(y);
        this._update(x);

        return x;
    }

    _rotateLeft(x) {
        const y = x.right;
        const temp = y.left;

        y.left = x;
        x.right = temp;

        this._update(x);
        this._update(y);

        return y;
    }

    _insert(node, value) {
        if (!node) return new AvlNode(value);

        if (value < node.data) {
            node.left = this._insert(node.left, value);
        } else if (value > node.data) {
            node.right = this._insert(node.right, value);
        } else {
            return node;
        }

        this._update(node);
        const balance = this._bf(node);

        // LL and LR
        if (balance > 1) {
            if (value < node.left.data) {
                return this._rotateRight(node);
            } else {
                node.left = this._rotateLeft(node.left);
                return this._rotateRight(node);
            }
        }

        // RR and RL
        if (balance < -1) {
            if (value > node.right.data) {
                return this._rotateLeft(node);
            } else {
                node.right = this._rotateRight(node.right);
                return this._rotateLeft(node);
            }
        }

        return node;
    }

    _remove(node, value) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this._remove(node.left, value);
        } else if (value > node.data) {
            node.right = this._remove(node.right, value);
        } else {
            if (!node.left && !node.right) {
                return null;
            } else if (!node.left || !node.right) {
                return node.left || node.right;
            } else {
                const successor = this._getMin(node.right);

                node.data = successor.data;
                node.right = this._remove(node.right, successor.data);
            }
        }

        this._update(node);
        const balance = this._bf(node);

        // LL and LR
        if (balance > 1) {
            if (this._bf(node.left) >= 0) {
                return this._rotateRight(node);
            } else {
                node.left = this._rotateLeft(node.left);
                return this._rotateRight(node);
            }
        }

        // RR and RL
        if (balance < -1) {
            if (this._bf(node.right) <= 0) {
                return this._rotateLeft(node);
            } else {
                node.right = this._rotateRight(node.right);
                return this._rotateLeft(node);
            }
        }

        return node;
    }

    _contains(node, value) {
        if (!node) return false;

        if (node.data < value) {
            return this._contains(node.right, value);
        } else if (node.data > value) {
            return this._contains(node.left, value);
        } else {
            return true;
        }
    }

    _inorder(node, result) {
        if (!node) return;

        this._inorder(node.left, result);
        result.push(node.data);
        this._inorder(node.right, result);
    }

    _preOrder(node, result) {
        if (!node) return;

        result.push(node.data);
        this._preOrder(node.left, result);
        this._preOrder(node.right, result);
    }

    _postOrder(node, result) {
        if (!node) return;

        this._postOrder(node.left, result);
        this._postOrder(node.right, result);
        result.push(node.data);
    }

    _levelOrder(node, result, level) {
        if (!node) return;

        if (!result[level]) {
            result[level] = [];
        }

        result[level].push(node.data);

        this._levelOrder(node.left, result, level + 1);
        this._levelOrder(node.right, result, level + 1);
    }

    search(value) {
        let current = this.root;

        while (current) {
            if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            } else {
                return current;
            }
        }

        return null;
    }

    findMin() {
        const node = this._getMin(this.root);
        return node ? node.data : null;
    }

    findMax() {
        if (!this.root) return null;

        let current = this.root;

        while (current.right) {
            current = current.right;
        }

        return current.data;
    }

    getMax(node) {
        if (!node) return null;

        let current = node;

        while (current.right) {
            current = current.right;
        }

        return current;
    }

    containsIterative(value) {
        let current = this.root;

        while (current) {
            if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            } else {
                return true;
            }
        }

        return false;
    }

    inOrderIterative() {
        const result = [];
        const stack = [];
        let current = this.root;

        while (current || stack.length > 0) {
            while (current) {
                stack.push(current);
                current = current.left;
            }

            const node = stack.pop();
            result.push(node.data);
            current = node.right;
        }

        return result;
    }

    preOrderIterative() {
        const result = [];
        const stack = [];

        if (!this.root) return result;

        stack.push(this.root);

        while (stack.length > 0) {
            const node = stack.pop();

            result.push(node.data);

            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
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

            const node = stack[stack.length - 1];

            if (node.right && node.right !== prev) {
                current = node.right;
            } else {
                result.push(node.data);
                stack.pop();
                prev = node;
            }
        }

        return result;
    }

    levelOrderIterative() {
        const result = [];

        if (!this.root) return result;

        const queue = [this.root];
        let head = 0;

        while (head < queue.length) {
            const node = queue[head++];

            result.push(node.data);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    remove(value) {
        this.root = this._remove(this.root, value);
    }

    height() {
        return this._getHeight(this.root);
    }

    containsRecursive(value) {
        return this._contains(this.root, value);
    }

    inOrderRecursive() {
        const result = [];

        this._inorder(this.root, result);

        return result;
    }

    preOrderRecursive() {
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
