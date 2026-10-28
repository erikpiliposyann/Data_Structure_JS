function isPrime(n) {
    if (n < 2) {
        return false;
    } 

    for(let i = 2; i <= Math.sqrt(n); ++i) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function nextPrime(n) {
    let prime = n;
    while (!isPrime(prime)) {
        prime++;
    }
    return prime;
}

class HashTable {
    constructor(initialCapacity = 11, maxLoadFactor = 1.0) {
        this.capacity = nextPrime(initialCapacity);
        this.table = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
        this.maxLoadFactor = maxLoadFactor;
    }

    _hash(key) {
        let hash = 0;

        for (let i = 0; i < key.length; ++i) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
    }

    loadFactor() {
        return this.size / this.capacity;
    }

    has(key) {
        let index = this._hash(key);

        for(let entry of this.table[index]) {
            if (entry.key === key) {
                return true;
            }
        }
        return false;
    }

    get(key) {
        let index = this._hash(key);

        for(let entry of this.table[index]) {
            if (entry.key === key) {
                return entry.value;
            }
        }
    }

    set(key, value) {
        let index = this._hash(key);

        for(let entry of this.table[index]) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }

        this.table[index].push({ key, value });
        this.size++;

        if(this.loadFactor() > this.maxLoadFactor) {
            this.resize();
        }
    }

    getSize() {
        return this.size;
    }

    delete(key) {
        let index = this._hash(key);
        let bucket = this.table[index];
    
        for (let i = 0; i < bucket.length; ++i) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    *keys() {
        for(let i = 0; i < this.table.length; ++i) {
            for(let entry of this.table[i]) {
                yield entry.key;
            }
        }
    }

    *values() {
        for(let i = 0; i < this.table.length; ++i) {
            for(let entry of this.table[i]) {
                yield entry.value;
            }
        }
    }

    *entries() {
        for(let i = 0; i < this.table.length; ++i) {
            for(let entry of this.table[i]) {
                yield [entry.key, entry.value];
            }
        }
    }

    resize() {
        let currentTable = this.table;
        this.capacity = nextPrime(this.capacity * 2);
        this.table = Array.from({ length: this.capacity }, () => []);
        this.size = 0;

        for(let i = 0; i < currentTable.length; ++i) {
            for(let entry of currentTable[i]) {
                this.set(entry.key, entry.value);
            }
        }

    }

    clear() {
        for (let i = 0; i < this.table.length; ++i) {
            this.table[i] = [];
        }
        this.size = 0;
    }

    *[Symbol.iterator]() {
        yield* this.entries();
    }
}
