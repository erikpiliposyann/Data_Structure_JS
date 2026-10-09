class Stack {
    #capacity;
    #size;

    constructor(initialCapacity = 16) {
        if (!Number.isInteger(initialCapacity) || initialCapacity <= 0) {
            throw new RangeError("Invalid capacity");
        }
    
        this.arr = [];
        this.#capacity = initialCapacity;
        this.#size = 0;
    }

    isEmpty() {
        return this.#size === 0
    }

    get size() {
        return this.#size;
    }

    push(elem) {
        if (this.#size === this.#capacity) {
            this.#capacity = 2 * this.#capacity;
        }
        this.arr[this.#size] = elem;
        this.#size++;
    }

    pop() {
        if(this.#size === 0) {
            return;
        }

        this.arr.length = this.#size - 1;
        this.#size--;
    }

    top() {
        if (this.#size === 0) {
            return undefined;
        }

        return this.arr[this.#size - 1];
    }

    clear() {
        this.arr.length = 0;
        this.#size = 0;
    }

   [Symbol.iterator]() {
        let end = this.#size - 1;
        const arr = this.arr;

        return {
            next() {
                if (end >= 0) {
                    return {
                        value: arr[end--],
                        done: false
                    };
                }
                return { done: true };
            }
        };
    }
}
