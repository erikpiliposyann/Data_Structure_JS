class Queue {
    #capacity;
    #size;
    #arr;
    #front;
    #back;

    constructor(initialCapacity = 16) {
        if (!Number.isInteger(initialCapacity) || initialCapacity <= 0) {
            throw new RangeError("Invalid capacity");
        }

        this.#arr = new Array(initialCapacity);
        this.#capacity = initialCapacity;
        this.#size = 0;
        this.#front = 0;
        this.#back = 0;
    }

    enqueue(elem) {
        if (this.#size === this.#capacity) {
            const oldCapacity = this.#capacity;
            this.#capacity *= 2;
            const newArray = new Array(this.#capacity);

            for (let i = 0; i < this.#size; ++i) {
                newArray[i] = this.#arr[(this.#front + i) % oldCapacity];
            }

            this.#front = 0;
            this.#back = this.#size;
            this.#arr = newArray;
        }

        this.#arr[this.#back] = elem;
        this.#back = (this.#back + 1) % this.#capacity;
        this.#size++;
    }

    dequeue() {
        if (this.#size === 0) {
            return;
        }

        this.#arr[this.#front] = undefined;
        this.#front = (this.#front + 1) % this.#capacity;
        this.#size--;
    }

    get size() {
        return this.#size;
    }

    getFront() {
        if (this.#size === 0) {
            return undefined;
        }

        return this.#arr[this.#front];
    }

    getBack() {
        if (this.#size === 0) {
            return undefined;
        }

        return this.#arr[(this.#back - 1 + this.#capacity) % this.#capacity];
    }

    print() {
        for (let i = 0; i < this.#size; ++i) {
            console.log(this.#arr[(this.#front + i) % this.#capacity]);
        }
    }

    isEmpty() {
        return this.#size === 0;
    }

    [Symbol.iterator]() {
        let arrayThis = this;
        let i = 0;

        return {
            next() {
                if (i < arrayThis.#size) {
                    return {
                        value: arrayThis.#arr[(arrayThis.#front + i++) % arrayThis.#capacity],
                        done: false
                    };
                }

                return { done: true };
            }
        };
    }
}
