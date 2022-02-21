/**
 * Implementation:
 *
 * Stack Data Structure: https://codepen.io/kentagon/pen/NWgKLyY
 */

export class Stack {
  private _size: number;
  private _storage: Record<string, any>;
  constructor() {
    this._storage = {};
    this._size = 0;
  }

  get stack() {
    return Object.entries(this._storage).sort(
      (tupleA, tupleB) => +tupleA[0] - +tupleB[0]
    );
  }

  get size() {
    return this._size;
  }

  push(value: any) {
    this._size++;
    this._storage[this._size] = value;
    return this._size;
  }

  pop(): any | undefined {
    if (this._size > 0) {
      const popped = this._storage[this._size];
      delete this._storage[this._size];
      this._size--;
      return popped;
    }
  }
}
