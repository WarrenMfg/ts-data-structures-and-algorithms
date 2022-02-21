export class MinBinaryHeap {
  _values: number[];

  constructor() {
    this._values = [];
  }

  insert(value: number) {
    let newValueIndex = this._values.push(value) - 1;
    let parentIndex: number | undefined, temp: number;

    // bubble up
    while (parentIndex !== 0) {
      parentIndex = Math.floor((newValueIndex - 1) / 2);
      if (this._values[parentIndex] > this._values[newValueIndex]) {
        temp = this._values[parentIndex];
        this._values[parentIndex] = this._values[newValueIndex];
        this._values[newValueIndex] = temp;
        newValueIndex = parentIndex;
      } else break;
    }

    return this;
  }

  extractMin() {
    const last = this._values.pop();
    if (!this._values.length) return last;

    const min = this._values[0];
    this._values[0] = last as number;
    let parent = 0,
      left: number | undefined,
      right: number | undefined,
      smallestChild: number | undefined,
      temp: number | undefined;

    // sink down
    while (true) {
      left = 2 * parent + 1;
      right = left + 1;

      smallestChild = this._values[right] < this._values[left] ? right : left;

      if (this._values[smallestChild] < this._values[parent]) {
        temp = this._values[parent];
        this._values[parent] = this._values[smallestChild];
        this._values[smallestChild] = temp;

        parent = smallestChild;
      } else {
        break;
      }
    }

    return min;
  }
}
