class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap) {
        if (cap <= 0 || !Number.isInteger(cap)) {
           throw new Error("Error");
       }

       this.#size = 0;
       this.#capacity = cap;
       this.#arr = new Uint32Array(cap);
    }

    #resize() {
        this.#capacity *= this.#GROWTH;
        const newArray = new Uint32Array(this.#capacity);
        for (let i = 0; i < this.#size; ++i) {
            newArray[i] = this.#arr[i];
        }
        this.#arr = newArray;
    }

    push_back(elem) {
        if (!Number.isInteger(elem)) {
           throw new TypeError("Error");
        }

        if (this.#size === this.#capacity) {
           this.#resize();
        }

        this.#arr[this.#size++] = elem;
    }

    pop_back() {
        if (!this.#size) {
           throw new Error("error");
       }

       return this.#arr[--this.#size];
    }

    at(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
            throw new Error("error");
        } 

        return this.#arr[index];
    }

    set(index, value) {
        if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
            throw new Error("error");
        }  
        if (!Number.isInteger(value)) {
           throw new TypeError("Error");
        }

        this.#arr[index] = value;

        return value;
    }

    front() {
        if(this.#size === 0) {
            throw new Error("Error");
        }
        
        return this.#arr[0];
    }

    back() {
         if(this.#size === 0) {
            throw new Error("Error");
        }
        
        return this.#arr[this.#size - 1];
    }

    erase(pos) {
        if (!Number.isInteger(pos) || pos < 0 || pos >= this.#size) {
           throw new Error("Error");
        }
        const value = this.#arr[pos];

        for(let i = pos; i < this.#size - 1; ++i) {
            this.#arr[i] = this.#arr[i+1];
        }
        this.#size--;

        return value;

    }

    insert(pos, value) {
       if (!Number.isInteger(pos) || pos < 0 || pos >= this.#size) {
           throw new Error("Error");
        }

        if (!Number.isInteger(value)) {
           throw new TypeError("Error");
        }

       if (this.#size === this.#capacity) {
           this.#resize();
       }

       for (let i = this.#size; i > pos; --i) {
           this.#arr[i] = this.#arr[i - 1];
       }

       this.#arr[pos] = value;
       this.#size++;

       return pos;
    }

    swap(i, j) {
        if (!Number.isInteger(i) || i < 0 || i >= this.#size) {
           throw new Error("Error");
        }
        if (!Number.isInteger(j) || j < 0 || j >= this.#size) {
           throw new Error("Error");
        }

        let temp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = temp;
    }

    *values() {
        for(let i = 0; i < this.#size; ++i) {
            yield this.#arr[i];
        }
    }
    *keys() {
        for(let i = 0; i < this.#size; ++i) {
            yield i;
        }
    }

    forEach(fn) {
        for(let i = 0; i < this.#size; ++i) {
            fn(this.#arr[i], i);
        }
    }

    map(fn) {
        const newArray = new DynamicArray(this.#size);

        for(let i = 0; i < this.#size; ++i) {
            newArray.push_back(fn(this.#arr[i], i));
        }
        return newArray;
    }

    filter(fn) {
        const newArray = new DynamicArray(this.#size);

        for(let i = 0; i < this.#size; ++i) {
           if(fn(this.#arr[i], i)) {
             newArray.push_back(this.#arr[i]);
           }
        }
        return newArray;
    }

    reduce(fn, init) {
        if(this.#size === 0) {
           throw new Error("Error");
        }

        let i = arguments.length === 2 ? 0 : 1;
        let accumulator = i === 1 ? this.#arr[0] : init ;

        for(i; i < this.#size; ++i) {
           accumulator = fn(accumulator, this.#arr[i], i);
        }

        return  accumulator;
    }

    some(fn) {
        for(let i = 0; i < this.#size; ++i) {
            if(fn(this.#arr[i], i)) {
                return true;
            }
        }
        return false;
    }

    find(fn) {
        for(let i = 0; i < this.#size; ++i) {
            if(fn(this.#arr[i], i)) {
                return this.#arr[i];
            }
        }
        return undefined;
    }

    findIndex(fn) {
        for(let i = 0; i < this.#size; ++i) {
            if(fn(this.#arr[i], i)) {
                return i;
            }
        }
        return -1;
    }
    
    includes(value) {
        for(let i = 0; i < this.#size; ++i) {
            if(this.#arr[i] === value) {
                return true;
            }
        }
        return false;
    }

    [Symbol.iterator]() {
        let arrayThis = this;
        let start = 0;
        let end = this.#size - 1;
        return {
            next() {
                if(start <= end) {
                    return {
                        value: arrayThis.#arr[start++],
                        done: false,
                    };
                }
                return {
                    done: true
                };
            }
        };
    }
}
