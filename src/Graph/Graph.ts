import { Queue } from '../Queue/Queue';

type Data = Record<string, any>;

export class Vertex {
  name: string;
  data?: Data;
  edges: Vertex[];
  constructor(name: string, data?: Data) {
    this.name = name;
    this.data = data || {};
    this.edges = [];
  }
}

export class Graph {
  _graph: Record<string, Vertex>;
  constructor() {
    // adjacency list, undirected
    this._graph = {};
  }

  addVertex(name: string, data?: Data) {
    if (!this._graph[name]) {
      this._graph[name] = new Vertex(name, data);
    }
    return this;
  }

  addEdge(name1: string, name2: string) {
    const v1 = this._graph[name1];
    const v2 = this._graph[name2];
    if (!v1 || !v2) return this;
    if (!v1.edges.includes(v2)) v1.edges.push(v2);
    if (!v2.edges.includes(v1)) v2.edges.push(v1);
    return this;
  }

  removeEdge(name1: string, name2: string) {
    const v1 = this._graph[name1];
    const v2 = this._graph[name2];
    let i;
    if ((i = v1?.edges.indexOf(v2)) > -1) {
      v1.edges.splice(i, 1);
    }
    if ((i = v2?.edges.indexOf(v1)) > -1) {
      v2.edges.splice(i, 1);
    }
    return this;
  }

  removeVertex(name: string) {
    const v1 = this._graph[name];
    if (!v1) return this;
    delete this._graph[name];

    let i;
    v1.edges.forEach(v2 => {
      if ((i = v2.edges.indexOf(v1)) > -1) {
        v2.edges.splice(i, 1);
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
        recurse(this._graph[name].edges[i].name);
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
    let current: Vertex | undefined;

    while (q.length) {
      current = q.dequeue() as Vertex;
      if (!visited[current.name]) {
        visited[current.name] = cb
          ? cb(this._graph[current.name].data)
          : this._graph[current.name].data;
        q.enqueueAll(current.edges);
      }
    }

    return visited;
  }
}
