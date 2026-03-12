class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;

    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key)
        bucket[i][1] = value;
    }

    bucket.push([key, value]);

    if (this.length() > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;

    this.capacity = this.capacity * 2;
    this.buckets = new Array(this.capacity);

    for (const bucket of oldBuckets) {
      if (!bucket) {
        continue;
      }

      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      return null;
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        return bucket[i][1];
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if ((!this.buckets[index])) {
      return false;
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (!this.buckets[index])
      return false;

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  length() {
    let count = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i])
        count += this.buckets[i].length;
    }

    return count;
  }

  clear() {
    this.buckets = new ArrayList(this.capacity);
  }

  keys() {
    const result = [];

    for (const bucket of this.buckets) {
      if (!bucket) {
        continue;
      }

      for (const pair of bucket) {
        result.push(pair[0]);
      }
    }

    return result;
  }

  values() {
    const result = new Array();

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const bucket = this.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          result.push(bucket[j][1]);
        }
      }
    }

    return result;
  }

  entries() {
    const result = new Array();

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        const bucket = this.buckets[i];
        for (let j = 0; j < bucket.length; j++) {
          result.push([bucket[j][0], bucket[j][1]]);
        }
      }
    }

    return result;
  }
}
