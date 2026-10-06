class Node {
    constructor(value) {
        this.data = value;
        this.next = null;
        this.prev = null;
    }
}

class DLinkedList {
    #size;

    constructor(iterables) {
        this.head = null;
        this.tail = null;
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
        return new DLinkedList(arr);
    }

    get size() {
        return this.#size;
    }

    pushFront(value) {
        const newNode = new Node(value);
        newNode.next = this.head;

        if (this.head) {
            newNode.next.prev = newNode;
        } else {
            this.tail = newNode;
        }
        
        this.head = newNode;
        this.#size++;
    }

    popFront() {
        if (!this.head) {
            return;
        }

        this.head = this.head.next;

        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }
       
        this.#size--;
    }

    popBack() {
        if (!this.head) {
            return;
        }

        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            this.#size--;
            return;
        }
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.#size--;
    }

    front() {
        if (!this.head) {
            return;
        }

        return this.head.data;
    }

    back() {
        if (!this.tail) {
            return;
        }
    
        return this.tail.data;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.#size = 0;
    }

    isEmpty() {
        return this.head === null;
    }

    pushBack(elem) {
        const newNode = new Node(elem);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.#size++;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
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

        let current = null;
        if (index < this.#size / 2) {
            current = this.head;

            for (let i = 0; i < index; ++i) {
                current = current.next;
            }
        }
        else {
            current = this.tail;

            for (let i = this.#size - index - 1; i > 0; --i) {
                current = current.prev;
            }
        }

        return current.data;
    }

    insert(index, value) {
        if (index < 0 || index > this.#size) {
            return;
        }

        if (index === 0) {
            this.pushFront(value);
            return;
        }
        else if (index === this.#size) {
            this.pushBack(value);
            return;
        }

        const newNode = new Node(value);
        let current = null;

        if (index < this.#size / 2) {
            current = this.head;

            for (let i = 0; i < index; ++i) {
                current = current.next;
            }
        }
        else {
            current = this.tail;

            for (let i = this.#size - index - 1; i > 0; --i) {
                current = current.prev;
            }
        }
        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;

        this.#size++;
    }

    erase(index) {
        if (index < 0 || index >= this.#size) {
            return;
        }

        if (index === 0) {
            this.popFront();
            return;
        }
        else if (index === this.#size - 1) {
            this.popBack();
            return;
        }

        let current = null;
        
        if (index < this.#size / 2) {
            current = this.head;

            for (let i = 0; i < index; ++i) {
                current = current.next;
            }
        }
        else {
            current = this.tail;

            for (let i = this.#size - index - 1; i > 0; --i) {
                current = current.prev;
            }
        }

        current.next.prev = current.prev;
        current.prev.next = current.next;
        this.#size--;
    }

    reverse() {
        let current = this.tail;

        while (current) {
            let temp = current.next;
            current.next = current.prev;
            current.prev = temp;

            current = current.next;
        }
        let temp = this.tail;
        this.tail = this.head;
        this.head = temp;
    }

    remove(value) {
        if (!this.head) {
            return;
        }
        
        let current = this.head;

        while (current) {
            let next =  current.next;
            if (current.data === value) {
                if (!current.prev) {
                    this.popFront();
                }
                else if (!current.next) {
                    this.popBack();
                }
                else {
                    current.prev.next = next;
                    next.prev = current.prev;
                    this.#size--;
                }
            }
            current = next;
        }
    }

    sort(cmp) {
        cmp = typeof cmp === 'function' ? cmp : (a, b) => a-b;
        function merge(l1, l2, cmp) {
            let dummy = new Node(0);
            let tail = dummy;

            while (l1 && l2) {
                if (cmp(l1.data, l2.data) <= 0) {
                    tail.next = l1;
                    tail.next.prev = tail;
                    l1 = l1.next;
                } else {
                    tail.next = l2;
                    tail.next.prev = tail;
                    l2 = l2.next;
                }

                tail = tail.next;
            }

            if (l1) {
                tail.next = l1;
                l1.prev = tail;
            } else if (l2) {
                tail.next = l2;
                l2.prev = tail;
            }

            if (dummy.next) {
                dummy.next.prev = null;
            }

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

            prev.next.prev = null;
            prev.next = null;


            let leftList = mergeSort(head, cmp);
            let rightList = mergeSort(slow, cmp);

            return merge(leftList, rightList, cmp);
        }
        this.head = mergeSort(this.head, cmp);

        let current = this.head;

        while (current && current.next) {
            current = current.next;
        }
        this.tail = current;
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
