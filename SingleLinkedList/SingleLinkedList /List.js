class Node {
    constructor(value) {
        this.data = value;
        this.next = null;
    }
}

class SLinkedList {
    #size;

    constructor(iterables) {
        this.head = null;
        this.#size = 0;

        if (iterables == null) {
            return;
        }

        if (typeof iterables[Symbol.iterator] !== "function") {
            throw new TypeError("Argument is not iterable");
        }

        for (let val of iterables) {
            this.pushBack(val);
        }
    }

    static fromArray(arr) {
        return new SLinkedList(arr);
    }

    get size() {
        return this.#size;
    }

    pushFront(value) {
        const newNode = new Node(value);

        newNode.next = this.head;
        this.head = newNode;

        this.#size++;
    }

    popFront() {
        if (!this.head) {
            return;
        }

        this.head = this.head.next;
        this.#size--;
    }

    popBack() {
        if (!this.head) {
            return;
        }

        if (!this.head.next) {
            this.head = null;
            this.#size--;
            return;
        }

        let current = this.head;

        while (current.next.next) {
            current = current.next;
        }

        current.next = null;
        this.#size--;
    }

    front() {
        if (!this.head) {
            return;
        }

        return this.head.data;
    }

    insertAfter(node, value) {
        const newNode = new Node(value);

        newNode.next = node.next;
        node.next = newNode;

        this.#size++;
    }

    eraseAfter(node) {
        if (!node.next) {
            return;
        }

        node.next = node.next.next;
        this.#size--;
    }

    clear() {
        this.head = null;
        this.#size = 0;
    }

    isEmpty() {
        return this.head === null;
    }

    pushBack(elem) {
        const newNode = new Node(elem);

        if (!this.head) {
            this.head = newNode;
            this.#size++;
            return;
        }

        let current = this.head;

        while (current.next) {
            current = current.next;
        }

        current.next = newNode;
        this.#size++;
    }

    toArray() {
        const arr = [];
        let current = this.head;

        while (current) {
            arr.push(current.data);
            current = current.next;
        }

        return arr;
    }

    at(index) {
        if (index < 0 || index >= this.#size) {
            return;
        }

        let current = this.head;

        for (let i = 0; i < index; ++i) {
            current = current.next;
        }

        return current.data;
    }

    insert(index, value) {
        if (index < 0 || index > this.#size) {
            return;
        }

        const newNode = new Node(value);

        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            this.#size++;
            return;
        }

        let current = this.head;

        for (let i = 0; i < index - 1; ++i) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;

        this.#size++;
    }

    erase(index) {
        if (index < 0 || index >= this.#size) {
            return;
        }

        if (index === 0) {
            this.head = this.head.next;
            this.#size--;
            return;
        }

        let current = this.head;

        for (let i = 0; i < index - 1; ++i) {
            current = current.next;
        }

        current.next = current.next.next;
        this.#size--;
    }

    reverse() {
        let prev = null;
        let current = this.head;

        while (current) {
            let next = current.next;

            current.next = prev;
            prev = current;
            current = next;
        }

        this.head = prev;
    }

    remove(value) {
        if (!this.head) {
            return;
        }

        let prev = null;
        let current = this.head;

        while (current) {
            if (current.data === value) {
                if (!prev) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }

                this.#size--;
            } else {
                prev = current;
            }

            current = current.next;
        }
    }

    sort(cmp) {
        cmp = typeof cmp === 'function' ? cmp : (a, b) => a-b;
        function merge(l1, l2,cmp) {
            let dummy = new Node(0);
            let tail = dummy;

            while (l1 && l2) {
                if (cmp(l1.data, l2.data) <= 0) {
                    tail.next = l1;
                    l1 = l1.next;
                } else {
                    tail.next = l2;
                    l2 = l2.next;
                }

                tail = tail.next;
            }

            tail.next = l1 || l2;

            return dummy.next;
        }

        function mergeSort(head, cmp) {
            if (!head || !head.next) {
                return head;
            }

            let prev = null;
            let slow = head;
            let fast = head;

             while (fast && fast.next) {
                prev = slow;
                slow = slow.next;
                fast = fast.next.next;
            }

            prev.next = null;

            let leftList = mergeSort(head, cmp);
            let rightList = mergeSort(slow, cmp);

            return merge(leftList, rightList, cmp);
        }

        this.head = mergeSort(this.head, cmp);
    }


    [Symbol.iterator]() {
        let current = this.head;

        return {
            next() {
                if (current) {
                    const value = current.data;
                    current = current.next;

                    return {
                        value: value,
                        done: false
                    };
                }

                return {
                    done: true
                };
            }
        };
    }
}
