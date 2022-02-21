export class PriorityNode {
  priority: number;
  value: any;
  constructor(priority: number, value: any) {
    this.priority = priority;
    this.value = value;
  }
}

// TODO: consider dequeueing based off of insertion time when
// more than one of same priority
export class PriorityQueue {
  _nodes: PriorityNode[];

  constructor() {
    this._nodes = [];
  }

  enqueue(value: any, priority: number) {
    let newValueIndex = this._nodes.push(new PriorityNode(priority, value)) - 1;
    let parentIndex: number | undefined, temp: PriorityNode;

    // bubble up
    while (parentIndex !== 0) {
      parentIndex = Math.floor((newValueIndex - 1) / 2);
      if (
        this._nodes[newValueIndex].priority < this._nodes[parentIndex]?.priority
      ) {
        temp = this._nodes[parentIndex];
        this._nodes[parentIndex] = this._nodes[newValueIndex];
        this._nodes[newValueIndex] = temp;
        newValueIndex = parentIndex;
      } else break;
    }

    return this;
  }

  dequeue() {
    const lowestPriority = this._nodes.pop();
    if (!this._nodes.length) return lowestPriority;

    const highestPriority = this._nodes[0];
    this._nodes[0] = lowestPriority as PriorityNode;
    let parent = 0,
      left: number | undefined,
      right: number | undefined,
      smallestChild: number | undefined,
      temp: PriorityNode | undefined;

    // sink down
    while (true) {
      left = 2 * parent + 1;
      right = left + 1;

      smallestChild =
        this._nodes[right]?.priority < this._nodes[left]?.priority
          ? right
          : left;

      if (this._nodes[smallestChild]?.priority < this._nodes[parent].priority) {
        temp = this._nodes[parent];
        this._nodes[parent] = this._nodes[smallestChild];
        this._nodes[smallestChild] = temp;

        parent = smallestChild;
      } else {
        break;
      }
    }

    return highestPriority;
  }

  get length() {
    return this._nodes.length;
  }
}
