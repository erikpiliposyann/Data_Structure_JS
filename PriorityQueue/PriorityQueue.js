class PriorityQueue {
    constructor(compareFn) {
        this.heap = [];
        this.compareFn = compareFn || ((a, b) => a - b);
    }

    swap(i, j) {
        if(i >= this.heap.length || j >= this.heap.length || i === j) {
            return;
        }

        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    heapifyUp(index = this.heap.length - 1) {
        if (index <= 0) {
            return;
        }

        let parentIndex = this.getParent(index);

        if (this.compareFn(this.heap[index], this.heap[parentIndex]) < 0) {
            this.swap(index, parentIndex);
            this.heapifyUp(parentIndex);
        } else {
            return
        }
    }
    heapifyDown(index = 0) {
        let leftChild = this.getLeftChild(index);
        let rightChild = this.getRightChild(index);
        let selected = index;
    
        if (leftChild < this.heap.length &&
            this.compareFn(this.heap[leftChild], this.heap[selected]) < 0) {
            selected = leftChild;
        } 
        if (rightChild < this.heap.length && 
            this.compareFn(this.heap[rightChild], this.heap[selected]) < 0) {
            selected = rightChild;
        }
        if (selected !== index) {
            this.swap(selected, index);
            this.heapifyDown(selected);
        }
    }

    getParent(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChild(i) {
        return i * 2 + 1;
    }

    getRightChild(i) {
        return i * 2 + 2;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    peek() {
        if(this.heap.length === 0) {
            return;
        }

        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }

        let value = this.heap[0];
        this.swap(0, this.heap.length - 1);
        this.heap.pop();
        this.heapifyDown();
        return value;
    }
}

