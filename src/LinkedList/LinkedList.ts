/**
 * Implementation:
 *
 * Linked List Commenting System: https://github.com/WarrenMfg/linked-list-commenting-system
 */

export class LinkedListNode {
  value: any;
  next: LinkedListNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  private _head: LinkedListNode | null;
  private _tail: LinkedListNode | null;
  private _length: number;

  constructor(init?: any) {
    this._head = arguments.length === 1 ? new LinkedListNode(init) : null;
    this._tail = arguments.length === 1 ? this._head : null;
    this._length = arguments.length === 1 ? 1 : 0;
  }

  get length() {
    return this._length;
  }

  push(value: any) {
    const newNode = new LinkedListNode(value);
    if (!this._head) {
      this._head = this._tail = newNode;
    } else if (this._tail) {
      this._tail.next = newNode;
      this._tail = newNode;
    }
    this._length++;
    return this;
  }

  pop() {
    if (!this._head) return undefined;

    let popped: LinkedListNode;
    if (this._length === 1) {
      popped = this._head;
      this._head = this._tail = null;
    } else {
      let prev = this._head;
      let cur = this._head;
      while (cur.next) {
        prev = cur;
        cur = cur.next;
      }
      popped = cur;
      prev.next = null;
      this._tail = prev;
    }

    this._length--;
    return popped;
  }

  unshift(value: any) {
    const newNode = new LinkedListNode(value);
    if (!this._head) {
      this._head = this._tail = newNode;
    } else {
      newNode.next = this._head;
      this._head = newNode;
    }
    this._length++;
    return this;
  }

  shift() {
    if (!this._head) return undefined;

    let shifted: LinkedListNode;
    shifted = this._head;
    if (this._length === 1) {
      this._head = this._tail = null;
    } else {
      this._head = shifted.next;
    }

    this._length--;
    return shifted;
  }

  get(index: number) {
    if (index < 0 || index >= this._length) return null;

    let counter = 0;
    let node = this._head as LinkedListNode;
    while (counter !== index) {
      node = node.next as LinkedListNode;
      counter++;
    }
    return node;
  }

  set(index: number, value: any) {
    const node = this.get(index);
    if (!node) return null;
    node.value = value;
    return this;
  }

  insert(index: number, value: any) {
    if (index < 0 || index > this._length) return null;
    if (index === 0) return this.unshift(value);
    if (index === this._length) return this.push(value);

    const pre = this.get(index - 1) as LinkedListNode;
    const post = pre.next;
    pre.next = new LinkedListNode(value);
    pre.next.next = post;
    this._length++;

    return this;
  }

  remove(index: number) {
    if (index < 0 || index >= this._length) return null;
    if (index === 0) return this.shift();
    if (index === this._length - 1) return this.pop();

    const pre = this.get(index - 1) as LinkedListNode;
    const removed = pre.next as LinkedListNode;
    pre.next = removed.next;
    this._length--;
    return removed;
  }

  reverse() {
    let middle = this._head;
    this._head = this._tail;
    this._tail = middle;

    let next;
    let prev = null;
    for (let i = 0; i < this._length; i++) {
      // save next
      next = middle!.next;
      // reassign next
      middle!.next = prev;
      // step forward
      prev = middle;
      // step forward
      middle = next;
    }

    return this;
  }
}
