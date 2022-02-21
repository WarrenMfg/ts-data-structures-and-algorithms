import { PriorityQueue } from '../PriorityQueue/PriorityQueue';
import { WeightedGraph, WeightedEdge } from '../WeightedGraph/WeightedGraph';

export class DijkstrasAlgorithm extends WeightedGraph {
  _pq: PriorityQueue;
  _accDist: Record<string, number>;
  _path: Record<string, string | null>;
  constructor() {
    super();
    this._pq = new PriorityQueue();
    this._accDist = {};
    this._path = {};
  }

  _reset(start: string) {
    const pq = new PriorityQueue();
    this._accDist = {};
    this._path = {};
    let priority: number;
    Object.entries(this._graph).forEach(entry => {
      priority = entry[0] === start ? 0 : Infinity;
      pq.enqueue(entry[0], priority);
      this._accDist[entry[0]] = priority;
      this._path[entry[0]] = null; // previous
    });
    this._pq = pq;
  }

  find(start: string, end: string) {
    if (!this._graph.hasOwnProperty(start) || !this._graph.hasOwnProperty(end))
      return null;

    this._reset(start);
    let least: string | undefined;
    let result: string[] = [];
    let neighbor: WeightedEdge;
    let neighborDist: number;

    while ((least = this._pq.dequeue()?.value)) {
      // if done
      if (least === end) {
        // create path to return
        while (this._path[least]) {
          result.push(least);
          least = this._path[least] as string;
        }
        return result.concat(least).reverse();
      }

      if (this._accDist[least] < Infinity) {
        for (let i in this._graph[least].edges) {
          neighbor = this._graph[least].edges[i];
          neighborDist = this._accDist[least] + neighbor.weight;
          if (neighborDist < this._accDist[neighbor.vertex.name]) {
            this._accDist[neighbor.vertex.name] = neighborDist;
            this._path[neighbor.vertex.name] = least;
            this._pq.enqueue(neighbor.vertex.name, neighborDist);
          }
        }
      }
    }

    return null;
  }
}
