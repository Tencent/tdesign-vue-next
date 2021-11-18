type MenuValue = string | number;
type MenuNode = MenuValue | VMenuData;

interface VMenuData {
  value: MenuValue;
  parent?: MenuNode;
  children: VMenuData[];
}

interface VMenuItem {
  value?: MenuValue;
  parent: MenuValue;
}

const getTreePaths = (node: VMenuData, val: MenuValue, ans: MenuValue[]): MenuValue[] => {
  if (!node) return;
  for (let i = 0; i < node.children.length; ++i) {
    const child = node.children[i];
    if (child.value === val) return [...ans, node.value];
    const target = getTreePaths(child, val, [...ans, node.value]);
    if (target) return target;
  }
};

const getTreeSameParentNodes = (node: VMenuData, val: MenuValue): VMenuData[] => {
  if (!node) return [];
  for (let i = 0; i < node.children.length; ++i) {
    const child = node.children[i];
    if (child.value === val) return node.children;
    const target = getTreeSameParentNodes(child, val);
    if (target) return target;
  }
};

const DFS = (root: VMenuData, val: MenuValue): VMenuData => {
  if (root.value === val) return root;
  if (root.children.length > 0) {
    for (let i = 0, len = root.children.length; i < len; i++) {
      const res = DFS(root.children[i], val);
      if (res) return res;
    }
  }
};

export default class VMenu {
  data: VMenuData = null;

  cache: Set<VMenuData> = new Set();

  isMutex = false;

  expandValues: Set<MenuValue> = null;

  constructor(options: Record<string, any>) {
    const root: VMenuData = {
      value: null, parent: null, children: [],
    };
    this.data = root;
    this.isMutex = options?.isMutex;
    this.expandValues = new Set(options?.expandValues);
  }

  add(item: VMenuItem) {
    const { value, parent } = item;
    const node: VMenuData = {
      value,
      parent,
      children: [],
    };

    this.cache.forEach((data, v2, set) => {
      if (item.value === data.parent) {
        node.children.push(data);
        set.delete(data);
      }
    });
    if (item.parent == null) {
      this.data.children.push(node);
      node.parent = this.data;
    } else if (this.data.children.length > 0) {
      const pNode = DFS(this.data, parent);
      if (pNode) {
        pNode.children.push(node);
      }
    } else {
      this.cache.add(node);
    }
  }

  select(val: MenuValue) {
    const activeValues = getTreePaths(this.data, val, []) || [];

    activeValues.push(val);
    return activeValues.filter((val) => val != null);
  }

  expand(val: MenuValue) {
    if (this.expandValues.has(val)) {
      this.expandValues.delete(val);
      return [...this.expandValues];
    }

    this.expandValues.add(val);

    if (!this.isMutex) {
      return [...this.expandValues];
    }

    const sameParentNodes = getTreeSameParentNodes(this.data, val) || [];
    const sameLevelSubmenuValues = new Set(sameParentNodes
      .filter((node) => node.children?.length > 0 && node.value !== val)
      .map((child) => child.value));

    this.expandValues.forEach((val) => {
      const isHit = sameLevelSubmenuValues.has(val);
      if (isHit) {
        this.expandValues.delete(val);
      }
    });
    return [...this.expandValues];
  }
}
