import { Queue } from '../Queue/Queue';

type Data = Record<string, any>;

export class WeightedVertex {
  name: string;
  data?: Data;
  edges: WeightedEdge[];
  constructor(name: string, data?: Data) {
    this.name = name;
    this.data = data || {};
    this.edges = [];
  }
}

export class WeightedEdge {
  vertex: WeightedVertex;
  weight: number;
  constructor(vertex: WeightedVertex, weight: number) {
    this.vertex = vertex;
    this.weight = weight;
  }
}

export class WeightedGraph {
  _graph: Record<string, WeightedVertex>;
  constructor() {
    // adjacency list, undirected
    this._graph = {};
  }

  get graph() {
    return this._graph;
  }

  addVertex(name: string, data?: Data) {
    if (!this._graph[name]) {
      this._graph[name] = new WeightedVertex(name, data);
    }
    return this;
  }

  addEdge(name1: string, name2: string, weight: number) {
    const v1 = this._graph[name1];
    const v2 = this._graph[name2];
    if (!v1 || !v2) return this;
    if (!v1.edges.find(weightedEdge => weightedEdge.vertex === v2))
      v1.edges.push(new WeightedEdge(v2, weight));
    if (!v2.edges.find(weightedEdge => weightedEdge.vertex === v1))
      v2.edges.push(new WeightedEdge(v1, weight));
    return this;
  }

  removeEdge(name1: string, name2: string) {
    const v1 = this._graph[name1];
    const v2 = this._graph[name2];
    let i;
    if (
      (i = v1?.edges.findIndex(weightedEdge => weightedEdge.vertex === v2)) > -1
    ) {
      v1.edges.splice(i, 1);
    }
    if (
      (i = v2?.edges.findIndex(weightedEdge => weightedEdge.vertex === v1)) > -1
    ) {
      v2.edges.splice(i, 1);
    }
    return this;
  }

  removeVertex(name: string) {
    const v1 = this._graph[name];
    if (!v1) return this;
    delete this._graph[name];

    let i;
    v1.edges.forEach(weightedEdge => {
      if (
        (i = weightedEdge.vertex.edges.findIndex(wE => wE.vertex === v1)) > -1
      ) {
        weightedEdge.vertex.edges.splice(i, 1);
      }
    });

    return this;
  }

  dfs(start: string, cb?: (data?: Data) => any) {
    if (!this._graph.hasOwnProperty(start)) return null;

    const visited: Record<string, any | Data> = {};
    const recurse = (name: string) => {
      if (visited.hasOwnProperty(name)) return;
      visited[name] = cb ? cb(this._graph[name].data) : this._graph[name].data;
      for (let i = 0; i < this._graph[name].edges.length; i++) {
        recurse(this._graph[name].edges[i].vertex.name);
      }
    };

    recurse(start);
    return visited;
  }

  bfs(start: string, cb?: (data?: Data) => any) {
    if (!this._graph.hasOwnProperty(start)) return null;

    const visited: Record<string, any | Data> = {};
    const q = new Queue();
    q.enqueue(this._graph[start]);
    let current: WeightedVertex | undefined;

    while (q.length) {
      current = q.dequeue() as WeightedVertex;
      if (!visited[current.name]) {
        visited[current.name] = cb
          ? cb(this._graph[current.name].data)
          : this._graph[current.name].data;
        q.enqueueAll(current.edges.map(weightedEdge => weightedEdge.vertex));
      }
    }

    return visited;
  }
}
