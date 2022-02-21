/**
 * Implementation:
 *
 * Array vs BST: https://codepen.io/kentagon/pen/XWgmGqm
 */

import { Queue } from '../Queue/Queue';

export class TreeNode {
  value: number | string;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(value: number | string) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
export class BinarySearchTree {
  _root: TreeNode | null;
  constructor(value?: number | string) {
    this._root = arguments[0] ? new TreeNode(value as number | string) : null;
  }

  insert(value: number | string): BinarySearchTree {
    const newNode = new TreeNode(value);

    if (!this._root) {
      this._root = newNode;
      return this;
    }

    const recurse = (node: TreeNode): BinarySearchTree => {
      if (value < node.value) {
        if (node.left) {
          return recurse(node.left);
        } else {
          node.left = newNode;
          return this;
        }
      } else if (value > node.value) {
        if (node.right) {
          return recurse(node.right);
        } else {
          node.right = newNode;
          return this;
        }
      } else return this;
    };

    return recurse(this._root);
  }

  contains(value: number | string): boolean {
    if (!this._root) return false;

    const recurse = (node: TreeNode): boolean => {
      if (value === node.value) return true;

      if (value < node.value && node.left) return recurse(node.left);
      else if (value > node.value && node.right) return recurse(node.right);
      else return false;
    };

    return recurse(this._root);
  }

  getBFS() {
    const nodes: (number | string)[] = [];
    if (!this._root) return nodes;

    const q = new Queue();
    let current: TreeNode;

    const recurse = () => {
      if (!q.length) return;
      current = q.dequeue();
      nodes.push(current.value);

      if (current.left) q.enqueue(current.left);
      if (current.right) q.enqueue(current.right);
      recurse();
    };

    q.enqueue(this._root);
    recurse();

    return nodes;
  }

  /**
   * Considerations:
   * - preOrder: returns root at index 0
   *   - good for flattening to store in db
   * - inOrder: returns values ascending in order
   */
  getDFS(order: 'preOrder' | 'postOrder' | 'inOrder' = 'preOrder') {
    const nodes: (number | string)[] = [];
    if (!this._root) return nodes;

    const preOrder = (node: TreeNode) => {
      nodes.push(node.value);
      if (node.left) preOrder(node.left);
      if (node.right) preOrder(node.right);
    };

    const postOrder = (node: TreeNode) => {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      nodes.push(node.value);
    };

    const inOrder = (node: TreeNode) => {
      if (node.left) inOrder(node.left);
      nodes.push(node.value);
      if (node.right) inOrder(node.right);
    };

    switch (order) {
      case 'preOrder':
        preOrder(this._root);
        break;
      case 'postOrder':
        postOrder(this._root);
        break;
      default:
        inOrder(this._root);
    }

    return nodes;
  }
}

// time diffs of searching via a tree vs an array
// use highlighting somehow
// debounce
