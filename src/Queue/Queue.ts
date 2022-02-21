/**
 * Implementation:
 *
 * Message Queue: https://codepen.io/kentagon/pen/wvewRjp
 */

export class Queue {
  private _head: number;
  private _tail: number;
  private _storage: Record<string, any>;
  constructor() {
    this._head = 0;
    this._tail = 0;
    this._storage = {};
  }

  enqueue(value: any) {
    this._storage[this._tail] = value;
    this._tail++;
    return this.length;
  }

  enqueueAll(values: any[]) {
    values.forEach(value => this.enqueue(value));
  }

  dequeue(): any | undefined {
    const dq = this._storage[this._head];
    delete this._storage[this._head];
    this._head !== this._tail && this._head++;
    return dq;
  }

  get length() {
    return this._tail - this._head;
  }

  queue(returnHeadOnRight: boolean) {
    return Object.entries(this._storage).sort((tupleA, tupleB) =>
      returnHeadOnRight ? +tupleB[0] - +tupleA[0] : +tupleA[0] - +tupleB[0]
    );
  }
}
