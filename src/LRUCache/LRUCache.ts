// ⚪️ Doubly Linked List Node
class DLLNode {
  constructor(public prev: any, public value: LRUCacheItem, public next: any) {
    this.prev = prev;
    this.value = value;
    this.next = next;
  }

  sanitize(): void {
    this.prev = null;
    this.next = null;
  }

  delete(): void {
    if (this.prev) {
      this.prev.next = this.next;
    }
    if (this.next) {
      this.next.prev = this.prev;
    }
  }
}

// ⚪️ Doubly Linked List
class DLL {
  public head: any = null;
  public tail: any = null;

  unshift(LRUCacheItem: LRUCacheItem): DLLNode {
    const newNode = new DLLNode(null, LRUCacheItem, this.head);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.head.prev = newNode;
      this.head = newNode;
    }

    return this.head;
  }

  shift(): DLLNode | null {
    if (!this.head) return null;

    const shifted = this.head;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = shifted.next;
      this.head.prev = null;
      shifted.sanitize();
    }

    return shifted;
  }

  push(LRUCacheItem: LRUCacheItem): DLLNode {
    const newNode = new DLLNode(this.tail, LRUCacheItem, null);

    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this.tail;
  }

  pop(): DLLNode | null {
    if (!this.tail) return null;

    const popped = this.tail;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = popped.prev;
      this.tail.next = null;
      popped.sanitize();
    }

    return popped;
  }

  moveToFront(node: DLLNode): void {
    if (node === this.tail) {
      this.pop(); // in the case that this.tail === this.head, both are now null
    } else if (node === this.head) {
      return;
    } else {
      node.delete();
    }

    node.sanitize();

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }
}

// ⚪️ Least Recently Used Cache Item
class LRUCacheItem {
  public dllNode: DLLNode | null = null;
  constructor(public key: number, public value: any) {
    this.key = key; // ✅ actual user input
    this.value = value; // ✅ actual user input
  }
}

// ⚪️ Least Recently Used Cache _items interface
interface IMap {
  [key: string]: LRUCacheItem;
}

// ⚪️ Least Recently Used Cache
class LRUCache {
  private _items: IMap = {};
  private _dll = new DLL();
  private _size = 0;
  constructor(private _limit: number = 3) {
    this._limit = _limit;
  }

  size(): number {
    return this._size;
  }

  get limit(): number {
    return this._limit;
  }

  setLimit(limit: number): boolean {
    if (!Number.isFinite(limit) || limit < 0) return false;

    this._limit = limit;

    while (this._full()) {
      this._prune();
      if (this._size === 0) break;
    }

    return true;
  }

  private _full(): boolean {
    return this._size >= this._limit;
  }

  private _prune(): void {
    const popped = this._dll.pop();
    if (popped) {
      delete this._items[popped.value.key];
      this._size = Math.max(0, --this._size);
    }
  }

  set(key: number, value: any): void {
    let cacheItem: LRUCacheItem;

    if (this._items.hasOwnProperty(key)) {
      cacheItem = this._items[key];
      cacheItem.value = value;
      this._promote(cacheItem.dllNode as DLLNode);
    } else {
      if (this._full()) this._prune();

      cacheItem = new LRUCacheItem(key, value);
      cacheItem.dllNode = this._dll.unshift(cacheItem); // ✅ returns entire head object; references same object regardless of new head
      this._items[key] = cacheItem; // ✅ key, value, dllNode (dll head)
      this._size++;
    }
  }

  get(key: string): any | null {
    if (!this._items.hasOwnProperty(key)) return null;

    const cacheItem = this._items[key];
    this._promote(cacheItem.dllNode as DLLNode); // ✅ key, value, dllNode (dll head)
    return cacheItem.value;
  }

  private _promote(dllNode: DLLNode): void {
    this._dll.moveToFront(dllNode);
  }

  getDLL(): DLLNode {
    return this._dll.head;
  }
}
