import isNull from 'lodash/isNull';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import uniqueId from 'lodash/uniqueId';
import isBoolean from 'lodash/isBoolean';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { TreeStore } from './tree-store';
import {
  TreeNodeValue,
  TreeNodeState,
  TypeIdMap,
  TypeTreeItem,
  TypeSettingOptions,
  TypeTreeNodeModel,
  TypeTreeNodeData,
} from './types';
import {
  createNodeModel,
  updateNodeModel,
} from './tree-node-model';
import log from '../log';

const { hasOwnProperty } = Object.prototype;

// 这里的属性为 data 中属性可以同步到 treeNode 实例属性的白名单
// 仅 label 属性和在列表中的属性可以通过 set 方法配置到 treeNode 实例上
export const setableStatus: Record<string, boolean | null> = {
  expandMutex: null,
  activable: null,
  checkable: null,
  draggable: null,
  loading: false,
};

export const setableProps = Object.keys(setableStatus);

export const syncableProps = [...setableProps, 'actived', 'expanded', 'checked'];

export const privateKey = '__tdesign_id__';

// vm 开头为视图属性，不可以外部设置
// 用于触发视图更新
// public 方法，在 ui 组件中有可能在使用，会保障其输入输出实现
// private 方法，可能会改动其输入输出

/**
 * tree 节点数据模型
 * @class TreeNode
 * @param {TreeStore} tree TreeStore 实例
 * @param {object} [data] 节点数据
 * @param {TreeNode} parent 指定的当前 TreeStore 实例中的父节点
 */
export class TreeNode {
  // 节点隶属的树实例
  public tree: TreeStore;

  // 节点 id ，唯一标志
  public value: string;

  // 节点文本
  public label: string;

  // 节点数据
  public data: TypeTreeNodeData;

  // 父节点
  public parent: TreeNode;

  // 子节点列表
  public children: TreeNode[] | boolean;

  // 暴露的 treeNodeModel，这个对象的属性和 api 提供给用户使用
  public model: TypeTreeNodeModel;

  // 是否为叶节点
  public vmIsLeaf: boolean;

  // 是否为子节点中的第一个
  public vmIsFirst: boolean;

  // 是否为子节点中的最后
  public vmIsLast: boolean;

  // 节点是否是经过过滤剩下的
  public vmIsRest: boolean;

  // 节点是否展示为锁定状态
  public vmIsLocked: boolean;

  // 节点在视图上实际的展开状态
  public expanded: boolean;

  // 展开时是否收起同级节点，对子节点生效
  public expandMutex: null | boolean;

  // 节点在视图上实际的激活状态
  public actived: boolean;

  // 是否可激活
  public activable: null | boolean;

  // 是否可选中
  public checkable: null | boolean;

  // 是否可选中的视图呈现
  public vmCheckable: boolean;

  // 节点在视图上实际的选中态
  public checked: boolean;

  // 节点实际是否为半选状态
  public indeterminate: boolean;

  // 节点是否已禁用
  public disabled: null | boolean;

  // 节点是否可拖动
  public draggable: null | boolean;

  // 节点是否可视
  public visible: boolean;

  // 节点在树中的层级
  public level: number;

  // 节点是否正在加载数据
  public loading: boolean;

  public constructor(
    tree: TreeStore,
    data?: TypeTreeNodeData,
    parent?: TreeNode,
  ) {
    this.data = data;
    this.tree = tree;

    const config = tree.config || {};
    const prefix = config.prefix || 't';
    const keys = config.keys || {};
    const propChildren = keys.children || 'children';
    const propLabel = keys.label || 'label';
    const propValue = keys.value || 'value';
    const propsDisabled = keys.disabled || 'disabled';

    // 节点自身初始化数据
    this.model = null;
    this.children = null;
    this.level = 0;

    // vm 开头为视图属性，不可以外部设置
    this.vmCheckable = false;
    this.vmIsLeaf = false;
    this.vmIsFirst = false;
    this.vmIsLast = false;
    this.vmIsRest = false;
    this.vmIsLocked = false;

    // 初始化节点基本状态
    this.visible = false;
    this.actived = false;
    this.checked = false;
    this.indeterminate = false;
    this.loading = false;
    this.expanded = config.expandAll;

    // 下面几个属性，节点初始化的时候，可以设置与 treeStore.config 不同的值
    // 初始化默认值为 null, 则在方法判断时，默认以 treeStore.config 为准
    // 传递或者设置属性为 boolean 类型的值，则以节点属性值为准
    // 这种处理方式主要是解决 treeStore.setConfig 方法配置全局属性导致的状态切换与保留的问题
    this.activable = null;
    this.checkable = null;
    this.expandMutex = null;
    this.draggable = null;

    // 为节点设置唯一 id
    // tree 数据替换时，value 相同有可能导致节点状态渲染冲突
    // 用这个 唯一 id 来解决，用于类似 vue 组件的唯一 key 指定场景
    this[privateKey] = uniqueId(prefix);

    // 设置 value
    // 没有 value 的时候，value 默认使用自动生成的 唯一 id
    this.value = isNil(get(data, propValue))
      ? this[privateKey]
      : get(data, propValue);
    const { nodeMap, privateMap } = tree;
    if (nodeMap.get(this.value)) {
      log.warn('Tree', `Dulplicate value: ${this.value}`);
    }
    nodeMap.set(this.value, this);
    privateMap.set(this[privateKey], this);

    // 设置标签
    this.label = get(data, propLabel) || '';
    // 设置是否禁用
    this.disabled = get(data, propsDisabled);

    // 设置子节点
    const children = data[propChildren];
    // 子节点为 true 的状态逻辑需要放到状态计算之前
    // 初始化加载逻辑需要依据这个来进行
    if (children === true) {
      this.children = children;
    }

    // 设置父节点
    if (parent && parent instanceof TreeNode) {
      this.parent = parent;
    } else {
      this.parent = null;
    }

    // 同步数据属性到节点属性
    // 仅 syncableStatus 列举的属性被同步到 treeNode 实例属性
    syncableProps.forEach((prop) => {
      if (typeof data[prop] !== 'undefined') {
        this[prop] = data[prop];
      }
    });

    // 初始化节点状态
    this.initActived();
    this.initExpanded();
    this.initChecked();

    // 这里的子节点加载逻辑不能放到状态初始化之前
    // 因为子节点状态计算依赖父节点初始化状态
    if (Array.isArray(children)) {
      this.append(children);
    } else if (children === true && !config.lazy) {
      this.loadChildren();
    }

    // checked 状态依赖于子节点状态
    // 因此子节点插入之后需要再次更新状态
    this.updateChecked();

    // 标记节点更新
    this.update();
    // 创建节点需要回流操作
    tree.reflow(this);
  }

  /* ------ 状态初始化 ------ */

  /**
   * 初始化选中态
   * @return void
   */
  private initChecked(): void {
    const { tree, value, parent } = this;
    const { checkedMap } = tree;
    const { checkStrictly } = tree.config;
    if (this.checked) {
      checkedMap.set(value, true);
    }
    if (!checkStrictly && parent?.isChecked()) {
      checkedMap.set(value, true);
    }
    this.updateChecked();
  }

  /**
   * 初始化节点展开状态
   * @return void
   */
  private initExpanded(): void {
    const { tree } = this;
    let { expanded } = this;
    const { config } = tree;
    if (isNumber(config.expandLevel) && this.getLevel() < config.expandLevel) {
      tree.expandedMap.set(this.value, true);
      expanded = true;
    }
    if (this.children === true && config.lazy) {
      expanded = false;
    }
    if (expanded) {
      tree.expandedMap.set(this.value, true);
    } else {
      tree.expandedMap.delete(this.value);
    }
    this.expanded = expanded;
  }

  /**
   * 初始化节点激活状态
   * @return void
   */
  private initActived(): void {
    const { tree, actived } = this;
    if (actived && this.isActivable()) {
      tree.activedMap.set(this.value, true);
    }
  }

  /* ------ 节点操作 ------ */

  /**
   * 追加节点数据
   * @param {object | object[]} data 节点数据
   * @return void
   */
  public append(data: TypeTreeNodeData | TypeTreeNodeData[]): void {
    const list = [];
    if (!Array.isArray(data)) {
      list.push(data);
    } else {
      list.push(...data);
    }
    if (list.length <= 0) {
      return;
    }
    if (!Array.isArray(this.children)) {
      this.children = [];
    }
    const { children, tree } = this;
    list.forEach((item) => {
      let node = null;
      if (item instanceof TreeNode) {
        node = item;
        node.appendTo(this.tree, this);
      } else {
        node = new TreeNode(this.tree, item, this);
        children.push(node);
      }
    });
    tree.reflow(this);
    this.updateRelated();
  }

  /**
   * 将当前节点追加到某个父节点的子节点列表中
   * @param {TreeStore} tree 目标树
   * @param {TreeNode} [parent] 目标父节点
   * @param {number} [index] 预期在子节点列表中的位置
   * @return void
   */
  public appendTo(tree: TreeStore, parent?: TreeNode, index?: number): void {
    const parentNode = parent;
    let targetIndex = -1;
    if (isNumber(index)) {
      targetIndex = index;
    }

    const targetParents = parentNode?.getParents() || [];
    const includeCurrent = targetParents.some((pnode) => pnode === this);
    if (includeCurrent) {
      throw new Error('无法将父节点插入到子节点');
    }

    if (parentNode === this) {
      throw new Error('无法将节点插入到本节点');
    }

    if (Array.isArray(parentNode?.children)) {
      const targetPosNode = parentNode?.children[targetIndex];
      if (targetPosNode && targetPosNode === this) {
        // 无需将节点插入到原位置
        return;
      }
    }

    // 先要取得 siblings
    // 因为要应对节点在同一个 siblings 中变换位置的情况
    let siblings = null;
    if (parentNode instanceof TreeNode) {
      if (!Array.isArray(parentNode?.children)) {
        parentNode.children = [];
      }
      siblings = parent.children;
    } else {
      siblings = tree.children;
    }

    // 上面的逻辑其实已经覆盖了所有业务情况
    // 这里的逻辑报错仅用于极限兜底，防止 treeStore 被误使用
    if (!Array.isArray(siblings)) {
      throw new Error('无法插入到目标位置，可插入的节点列表不存在');
    }

    const prevLength = siblings.length;
    const prevIndex = this.getIndex();

    this.remove();

    if (isNumber(index)) {
      let targetIndex = index;
      if (parentNode === this.parent) {
        // 前置节点被拔出后再插入到同一个 siblings 时，会引起目标 index 的变化
        // 因此要相应的变更插入位置
        // 后置节点被拔出时，目标 index 是不变的
        const curLength = siblings.length;
        if (curLength < prevLength && prevIndex <= targetIndex) {
          targetIndex -= 1;
        }
      }
      siblings.splice(targetIndex, 0, this);
    } else {
      siblings.push(this);
    }

    this.parent = parentNode;

    // 插入节点应当继承展开状态
    // 但不要继承选中状态和高亮状态
    const nodes = this.walk();
    nodes.forEach((item) => {
      const node = item;
      node.tree = tree;
      tree.nodeMap.set(node.value, node);
      tree.privateMap.set(node[privateKey], node);
      if (node.expanded) {
        tree.expandedMap.set(node.value, true);
      }
    });

    const updateNodes = parentNode?.walk() || tree.children.map((item) => item.walk()).flat();
    updateNodes.forEach((node) => {
      node.update();
      node.updateChecked();
    });

    tree.reflow();
  }

  /**
   * 插入一个节点或者数据到到同级节点的目标位置
   * @param {TreeNode | object} item 要插入的节点或者数据
   * @param {number} [index] 预期在子节点列表中的位置
   * @return void
   */
  private insert(item: TypeTreeItem, index?: number): void {
    const { tree, parent } = this;
    const siblings = this.getSiblings();
    let node = null;
    if (item instanceof TreeNode) {
      node = item;
      node.appendTo(tree, parent, index);
    } else if (item) {
      node = new TreeNode(tree, item, parent);
      if (isNumber(index)) {
        siblings.splice(index, 0, node);
      }
      siblings.forEach((sibling) => {
        sibling.update();
      });
    }
    tree.reflow();
  }

  /**
   * 在当前节点之前插入节点
   * @param {TreeNode | object} newData 要插入的节点或者数据
   * @return void
   */
  public insertBefore(newData: TypeTreeItem): void {
    const index = this.getIndex();
    this.insert(newData, index);
  }

  /**
   * 在当前节点之后插入节点
   * @param {TreeNode | object} newData 要插入的节点或者数据
   * @return void
   */
  public insertAfter(newData: TypeTreeItem): void {
    const index = this.getIndex();
    this.insert(newData, index + 1);
  }

  /**
   * 从当前树中移除本节点
   * @return void
   */
  public remove(): void {
    const { tree } = this;

    const nodes = this.walk();
    const siblings = this.getSiblings();
    const index = this.getIndex();
    // 从父节点的子节点列表中移除自己
    // 但不要将自己的父节点移除，避免渲染与判断失败
    if (Array.isArray(siblings)) {
      siblings.splice(index, 1);
    }
    // 清理与树的关系，但不清理自身状态
    nodes.forEach((node) => {
      node.clean();
    });
    // 同级节点的连线状态会受到影响
    siblings.forEach((node) => {
      node.update();
    });
    // 父节点选中态会受到影响
    this.updateParents();
    tree.reflow();
  }

  /**
   * 清除本节点与当前树的关系
   * @return void
   */
  private clean(): void {
    const { tree, value } = this;
    tree.activedMap.delete(value);
    tree.checkedMap.delete(value);
    tree.expandedMap.delete(value);
    tree.nodeMap.delete(value);
    tree.filterMap.delete(value);
    tree.privateMap.delete(this[privateKey]);
  }

  /**
   * 异步加载子节点
   * @return Promise<void>
   */
  private async loadChildren(): Promise<void> {
    const config = get(this, 'tree.config') || {};
    if (this.children === true && !this.loading) {
      if (isFunction(config.load)) {
        this.loading = true;
        this.update();
        let list = [];
        list = await config.load(this);
        this.tree.emit('load', {
          node: this,
          data: list,
        });
        this.loading = false;
        if (Array.isArray(list) && list.length > 0) {
          this.append(list);
        } else {
          this.children = false;
        }
        this.update();
      }
    }
  }

  /**
   * 设置节点状态
   * - 为节点设置独立于配置的 disabled 状态: set({ disabled: true })
   * - 清除独立于配置的 disabled 状态: set({ disabled: null })
   * @param {object} item 节点状态对象
   * @return void
   */
  public set(item: TreeNodeState): void {
    const { tree } = this;
    const keys = Object.keys(item);
    keys.forEach((key) => {
      if (hasOwnProperty.call(setableStatus, key) || key === 'label' || key === 'disabled') {
        this[key] = item[key];
      }
    });
    tree.updated(this);
  }

  /* ------ 节点获取 ------- */

  /**
   * 获取本节点的父节点
   * @return TreeNode 父节点
   */
  public getParent(): TreeNode {
    return this.parent;
  }

  /**
   * 获取所有父级节点
   * - 顺序为从当前到根
   * @return TreeNode[] 父级节点数组
   */
  public getParents(): TreeNode[] {
    const parents = [];
    let node = this.parent;
    while (node) {
      parents.push(node);
      node = node.parent;
    }
    return parents;
  }

  /**
   * 获取所有兄弟节点，包含自己在内
   * @return TreeNode[] 兄弟节点数组
   */
  public getSiblings(): TreeNode[] {
    const { parent, tree } = this;
    let list: TreeNode[] = [];
    if (parent) {
      if (Array.isArray(parent.children)) {
        list = parent.children;
      }
    } else if (tree) {
      list = tree.children;
    }
    return list;
  }

  /**
   * 获取当前节点的子节点
   * @param {boolean} deep 是否获取所有深层子节点
   * @return TreeNodeModel[] 子节点数组
   */
  public getChildren(deep?: boolean): boolean | TypeTreeNodeModel[] {
    let childrenModel: boolean | TypeTreeNodeModel[] = false;
    const { children } = this;
    if (Array.isArray(children)) {
      if (children.length > 0) {
        if (deep) {
          const nodes = this.walk();
          nodes.shift();
          childrenModel = nodes.map((item) => item.getModel());
        } else {
          childrenModel = children.map((item) => item.getModel());
        }
      } else {
        childrenModel = false;
      }
    } else if (isBoolean(children)) {
      childrenModel = children;
    }
    return childrenModel;
  }

  /**
   * 获取本节点的根节点
   * @return TreeNode 根节点
   */
  public getRoot(): TreeNode {
    const parents = this.getParents();
    return parents[parents.length - 1] || null;
  }

  /**
   * 获取节点在父节点的子节点列表中的位置
   * - 如果没有父节点，则获取节点在根节点列表的位置
   * @return number 节点位置序号
   */
  public getIndex(): number {
    const list = this.getSiblings();
    return list.indexOf(this);
  }

  /**
   * 返回路径节点
   * - 路径节点包含自己在内
   * - 节点顺序与父级节点顺序相反，从根到当前
   * @return TreeNode[] 路径节点数组
   */
  public getPath(): TreeNode[] {
    const nodes = this.getParents();
    nodes.unshift(this);
    return nodes.reverse();
  }

  /**
   * 获取节点所在层级
   * @return number 层级序号
   */
  public getLevel(): number {
    const parents = this.getParents();
    return parents.length;
  }

  /* ------ 节点状态判断 ------ */

  /**
   * 判断节点是否被过滤
   * @return boolean 是否被过滤方法命中
   */
  public isRest(): boolean {
    const { config, filterMap, hasFilter } = this.tree;

    let rest = false;
    if (hasFilter) {
      // 仅在存在过滤条件时，过滤命中才有效
      const nodeModel = this.getModel();
      rest = config.filter(nodeModel);
    }

    if (rest) {
      filterMap.set(this.value, true);
    } else if (filterMap.get(this.value)) {
      filterMap.delete(this.value);
    }

    return rest;
  }

  /**
   * 判断节点是否可见
   * @return boolean 是否可见
   */
  public isVisible(): boolean {
    const { nodeMap, hasFilter, config } = this.tree;
    const { allowFoldNodeOnFilter } = config;

    let visible = true;

    if (!nodeMap.get(this.value)) {
      // 节点不在当前树上，所以不可见
      return false;
    }

    if (hasFilter && !allowFoldNodeOnFilter) {
      // 如果存在过滤条件
      // 锁定状态和过滤命中状态，直接呈现
      visible = this.vmIsLocked || this.vmIsRest;
      return visible;
    }

    // 标志所有父节点展开导致的可见状态
    let expandVisible = true;
    const parents = this.getParents();
    if (parents.length > 0) {
      expandVisible = parents.every((node: TreeNode) => node.expanded);
    }

    if (hasFilter) {
      visible = expandVisible && (this.vmIsRest || this.vmIsLocked);
    } else {
      visible = expandVisible;
    }
    return visible;
  }

  /**
   * 判断节点是否被禁用
   * @return boolean 是否被禁用
   */
  public isDisabled(): boolean {
    const { tree } = this;
    const { hasFilter, config } = tree;
    const { disabled, allowFoldNodeOnFilter } = config;
    if (hasFilter && !allowFoldNodeOnFilter && this.vmIsLocked && !this.vmIsRest) {
      return true;
    }
    let state = disabled;
    if (typeof this.disabled === 'boolean') {
      state = this.disabled;
    }
    return state;
  }

  /**
   * 判断节点是否能拖拽
   * @return boolean 是否能拖拽
   */
  public isDraggable(): boolean {
    let state = !!get(this, 'tree.config.draggable');
    if (typeof this.draggable === 'boolean') {
      state = this.draggable;
    }
    return state;
  }

  /**
   * 判断子节点是否互斥展开
   * @return boolean 子节点是否互斥展开
   */
  public isExpandMutex(): boolean {
    let state = !!get(this, 'tree.config.expandMutex');
    if (typeof this.expandMutex === 'boolean') {
      state = this.expandMutex;
    }
    return state;
  }

  /**
   * 节点是否可被激活
   * @return boolean 是否可被激活
   */
  public isActivable() {
    let state = !!get(this, 'tree.config.activable');
    if (typeof this.activable === 'boolean') {
      state = this.activable;
    }
    return state;
  }

  /**
   * 节点是否可选
   * @return boolean 是否可选
   */
  public isCheckable() {
    let state = !!get(this, 'tree.config.checkable');
    if (typeof this.checkable === 'boolean') {
      state = this.checkable;
    }
    return state;
  }

  /**
   * 节点是否被激活
   * @param {Map} [map] 预设激活节点 map, 用于计算节点在预期环境中的激活状态
   * @return boolean 是否被激活
   */
  public isActived(map?: Map<string, boolean>): boolean {
    const { tree, value } = this;
    const activedMap = map || tree.activedMap;
    return !!(tree.nodeMap.get(value) && activedMap.get(value));
  }

  /**
   * 节点是否已展开
   * @param {Map} [map] 预设展开节点 map, 用于计算节点在预期环境中的展开状态
   * @return boolean 是否已展开
   */
  public isExpanded(map?: Map<string, boolean>): boolean {
    const { tree, value, vmIsLocked } = this;
    const { hasFilter, config } = tree;
    const { allowFoldNodeOnFilter } = config;
    if (hasFilter && !allowFoldNodeOnFilter && vmIsLocked) return true;
    const expandedMap = map || tree.expandedMap;
    return !!(tree.nodeMap.get(value) && expandedMap.get(value));
  }

  /**
   * 节点是否被选中
   * @param {Map} [map] 预设选中节点 map, 用于计算节点在预期环境中的选中态
   * @return boolean 是否被选中
   */
  public isChecked(map?: TypeIdMap): boolean {
    const { children, tree, value } = this;
    const { checkStrictly } = tree.config;
    // 节点不在当前树上，视为未选中
    if (!tree.nodeMap.get(value)) return false;
    // 节点不可选，视为未选中
    if (!this.isCheckable()) return false;
    const checkedMap = map || tree.checkedMap;
    let checked = false;
    // 如果在 checkedMap 中，则直接为 true
    if (checkedMap.get(value)) {
      return true;
    }
    // 严格模式，则已经可以判定选中状态
    if (checkStrictly) return checked;
    // 允许关联状态的情况下，需要进一步判断
    if (Array.isArray(children) && children.length > 0) {
      // 子节点全部选中，则当前节点选中
      checked = children.every((node) => {
        const childIsChecked = node.isChecked(checkedMap);
        return childIsChecked;
      });
    } else {
      // 从父节点状态推断子节点状态
      // 这里再调用 isChecked 会导致死循环
      const parents = this.getParents();
      checked = parents.some((node) => checkedMap.get(node.value));
    }
    return checked;
  }

  /**
   * 是否为半选状态
   * @return boolean 是否为半选状态
   */
  public isIndeterminate(): boolean {
    const { children, tree, value } = this;
    const { checkStrictly } = tree.config;
    // 节点不在当前树上，视为未选中
    if (!tree.nodeMap.get(value)) return false;
    // 节点不可选，视为未选中
    if (!this.isCheckable()) return false;
    // 严格模式没有半选状态
    if (checkStrictly) return false;
    // 叶节点不存在半选状态
    if (!Array.isArray(children)) return false;

    let childChecked: null | boolean = null;
    const indeterminate = children.some((node: TreeNode) => {
      if (node.isIndeterminate()) {
        // 子节点有任意一个半选，则其为半选状态
        return true;
      }
      if (isNull(childChecked)) {
        childChecked = node.isChecked();
      }
      if (childChecked !== node.isChecked()) {
        // 子节点选中状态不一致，则其为半选状态
        return true;
      }
      return false;
    });

    return indeterminate;
  }

  /**
   * 是否为兄弟节点中的第一个节点
   * @return boolean 是否为第一个节点
   */
  public isFirst(): boolean {
    const siblings = this.getSiblings();
    return siblings[0] === this;
  }

  /**
   * 是否为兄弟节点中的最后一个节点
   * @return boolean 是否为最后一个节点
   */
  public isLast(): boolean {
    const siblings = this.getSiblings();
    return siblings[siblings.length - 1] === this;
  }

  /**
   * 是否为叶子节点，叶子节点没有子节点
   * @return boolean 是否为叶子节点
   */
  public isLeaf(): boolean {
    let isLeaf = false;
    if (Array.isArray(this.children)) {
      isLeaf = this.children.length <= 0;
    } else {
      isLeaf = !this.children;
    }
    return isLeaf;
  }

  /* ------ 节点状态切换 ------ */

  /**
   * 锁定节点，解锁节点
   * - 搜索过滤节点时，路径节点需要固定呈现，视其为锁定态
   * @param {boolean} lockState 锁定状态
   * @return void
   */
  public lock(lockState: boolean): void {
    this.vmIsLocked = lockState;
    this.expanded = this.isExpanded();
    this.visible = this.isVisible();
  }

  /**
   * 节点展开关闭后需要调用的状态检查函数
   * @return void
   */
  public afterExpanded(): void {
    this.update();
    // 节点展开时检查延迟加载的数据
    if (this.expanded && this.children === true) {
      this.loadChildren();
    }
    this.updateChildren();
  }

  /**
   * 切换节点展开状态
   * - 用于受控逻辑处理
   * - 仅返回预期状态值数组，不直接操作状态
   * @return string[] 当前树展开的节点值数组
   */
  public toggleExpanded(): TreeNodeValue[] {
    return this.setExpanded(!this.isExpanded());
  }

  /**
   * 设置节点展开状态
   * @param {boolean} expanded 节点展开状态
   * @param {object} [opts] 操作选项
   * @param {boolean} [opts.directly=false] 是否直接操作节点状态
   * @return string[] 当前树展开的节点值数组
   */
  public setExpanded(
    expanded: boolean,
    opts?: TypeSettingOptions
  ): TreeNodeValue[] {
    const { tree } = this;
    const { config } = tree;
    const options = {
      directly: false,
      ...opts,
    };

    let map = tree.expandedMap;
    if (!options.directly) {
      map = new Map(tree.expandedMap);
    }

    // 手风琴效果，先折叠同级节点
    if (expanded) {
      // 列举需要展开的节点
      const shouldExpandNodes = [];
      // 自己一定在展开列表中
      shouldExpandNodes.push(this);
      if (config.expandParent) {
        // expandParent 为 true，则父节点都要展开
        this.getParents().forEach((node) => {
          shouldExpandNodes.push(node);
        });
      }
      shouldExpandNodes.forEach((node) => {
        let isExpandMutex = false;
        // 对于每一个节点，都需要判断是否启用手风琴效果
        if (node.parent) {
          isExpandMutex = node.parent.isExpandMutex();
        } else {
          isExpandMutex = tree?.config?.expandMutex;
        }
        if (isExpandMutex) {
          // 折叠列表中，先移除同级节点
          const siblings = node.getSiblings();
          siblings.forEach((snode) => {
            map.delete(snode.value);
            // 同级节点相关状态更新
            snode.update();
            snode.updateChildren();
          });
        }
        // 最后设置自己的折叠状态
        map.set(node.value, true);
        node.update();
        node.updateChildren();
      });
    } else {
      map.delete(this.value);
    }

    if (options.directly) {
      this.afterExpanded();
    }

    return tree.getExpanded(map);
  }

  /**
   * 切换节点激活状态
   * - 用于受控逻辑处理
   * - 仅返回预期状态值数组，不直接操作状态
   * @return string[] 当前树激活的节点值数组
   */
  public toggleActived(): TreeNodeValue[] {
    return this.setActived(!this.isActived());
  }

  /**
   * 设置节点激活状态
   * @param {boolean} actived 节点激活状态
   * @param {object} [opts] 操作选项
   * @param {boolean} [opts.directly=false] 是否直接操作节点状态
   * @return string[] 当前树激活的节点值数组
   */
  public setActived(
    actived: boolean,
    opts?: TypeSettingOptions
  ): TreeNodeValue[] {
    const { tree } = this;
    const options = {
      directly: false,
      ...opts,
    };
    const config = tree.config || {};
    let map = tree.activedMap;
    if (!options.directly) {
      map = new Map(tree.activedMap);
    }
    if (this.isActivable()) {
      if (actived) {
        const prevKeys = Array.from(map.keys());
        if (!config.activeMultiple) {
          map.clear();
        }
        prevKeys.forEach((value) => {
          const node = tree.getNode(value);
          node?.update();
        });
        map.set(this.value, true);
      } else {
        map.delete(this.value);
      }
    }
    this.update();
    return tree.getActived(map);
  }

  /**
   * 切换节点选中状态
   * - 用于受控逻辑处理
   * - 仅返回预期状态值数组，不直接操作状态
   * @return string[] 当前树选中的节点值数组
   */
  public toggleChecked(): TreeNodeValue[] {
    return this.setChecked(!this.isChecked());
  }

  /**
   * 设置节点选中状态
   * - 节点 UI 操作时调用这个方法
   * - 节点设置自身状态时调用这个方法
   * @param {boolean} checked 节点选中状态
   * @param {object} [opts] 操作选项
   * @param {boolean} [opts.isAction=true] 是否为 UI 动作
   * @param {boolean} [opts.directly=false] 是否直接操作节点状态
   * @return string[] 当前树选中的节点值数组
   */
  public setChecked(
    checked: boolean,
    opts?: TypeSettingOptions
  ): TreeNodeValue[] {
    const { tree } = this;
    const config = tree.config || {};
    const options: TypeSettingOptions = {
      // 为 true, 为 UI 操作，状态扩散受 disabled 影响
      // 为 false, 为值操作, 状态扩散不受 disabled 影响
      isAction: true,
      // 为 true, 直接操作节点状态
      // 为 false, 返回预期状态
      directly: false,
      ...opts,
    };
    let map = tree.checkedMap;
    if (!options.directly) {
      map = new Map(tree.checkedMap);
    }
    if (!this.isCheckable()) {
      // 当前节点非可选节点，则不可设置选中态
      return tree.getChecked(map);
    }
    if (options.isAction && this.isDisabled()) {
      // 对于 UI 动作，禁用时不可切换选中态
      return tree.getChecked(map);
    }
    if (checked === this.isChecked()) {
      // 值没有变更，则选中态无变化
      return tree.getChecked(map);
    }

    if (checked) {
      map.set(this.value, true);
    } else {
      map.delete(this.value);
    }

    if (config.checkStrictly) {
      // 严格模式下，选中态不扩散，仅操作节点自身
      if (options.directly) {
        // 严格模式值更新节点自身
        this.updateChecked();
      }
    } else {
      // 先向下游扩散选中态
      this.spreadChildrenChecked(checked, map, options);
      // 再计算上游选中态
      this.spreadParentChecked(checked, map, options);
      // 状态更新务必放到扩散动作之后
      // 过早的状态更新会导致后续计算出错
      if (options.directly) {
        const relatedNodes = tree.getRelatedNodes([this.value], {
          reverse: true,
        });
        relatedNodes.forEach((node) => {
          node.updateChecked();
        });
      }
    }

    return tree.getChecked(map);
  }

  // 选中态向上游扩散
  private spreadParentChecked(
    checked: boolean,
    map?: TypeIdMap,
    opts?: TypeSettingOptions
  ) {
    const options: TypeSettingOptions = {
      isAction: true,
      directly: false,
      ...opts,
    };

    // 碰到不可选节点，中断扩散
    if (!this.isCheckable()) return;

    const { children } = this;
    if (Array.isArray(children) && children.length > 0) {
      // 有子节点，则选中态由子节点选中态集合来决定
      map.delete(this.value);
    }

    const { parent } = this;
    if (!parent) return;
    parent.spreadParentChecked(checked, map, options);
  }

  // 选中态向下游扩散
  private spreadChildrenChecked(
    checked: boolean,
    map?: TypeIdMap,
    opts?: TypeSettingOptions
  ) {
    const options: TypeSettingOptions = {
      isAction: true,
      directly: false,
      ...opts,
    };

    // 碰到不可选节点，中断扩散
    if (!this.isCheckable()) return;
    // 对于 UI 动作操作，节点禁用，中断扩散
    if (options.isAction && this.isDisabled()) return;

    const { children } = this;
    if (!Array.isArray(children)) return;
    children.forEach((node) => {
      // 对于 UI 动作，向下扩散时，禁用状态会阻止状态切换
      if (options.isAction && node.isDisabled()) return;
      if (checked) {
        map.set(node.value, true);
      } else {
        map.delete(node.value);
      }
      node.spreadChildrenChecked(checked, map, options);
    });
  }

  /* ------ 节点状态更新 ------ */

  /**
   * 更新节点当前状态，将节点放到延时更新检查队列
   * @return void
   */
  public update(): void {
    this.level = this.getLevel();
    this.vmIsFirst = this.isFirst();
    this.vmIsLast = this.isLast();
    this.vmIsLeaf = this.isLeaf();
    this.vmCheckable = this.isCheckable();
    this.vmIsRest = this.isRest();
    this.actived = this.isActived();
    this.expanded = this.isExpanded();
    this.visible = this.isVisible();
    this.tree.updated(this);
  }

  /**
   * 更新节点选中态
   * @return void
   */
  public updateChecked(): void {
    const { tree, value } = this;
    const { checkedMap } = tree;
    this.checked = this.isChecked();
    this.indeterminate = this.isIndeterminate();
    if (this.checked) {
      checkedMap.set(value, true);
    }
    tree.updated(this);
  }

  /**
   * 更新所有子节点状态
   * - 不包含自己
   * @return void
   */
  public updateChildren(): void {
    const { children } = this;
    if (Array.isArray(children)) {
      children.forEach((node) => {
        node.update();
        node.updateChecked();
        node.updateChildren();
      });
    }
  }

  /**
   * 更新所有父级节点状态
   * - 不包含自己
   * @return void
   */
  public updateParents(): void {
    const { parent } = this;
    if (parent) {
      parent.update();
      parent.updateChecked();
      parent.updateParents();
    }
  }

  /**
   * 更新上下游相关节点状态
   * - 包含自己
   * @return void
   */
  public updateRelated(): void {
    const { tree } = this;
    const relatedNodes = tree.getRelatedNodes([this.value]);
    relatedNodes.forEach((node) => {
      node.update();
      node.updateChecked();
    });
  }

  /* ------ 节点遍历 ------ */

  /**
   * 获取包含自己在内所有的子节点
   * - 包含自己
   * @return TreeNode[] 遍历结果节点数组
   */
  public walk(): TreeNode[] {
    const { children } = this;
    let list: TreeNode[] = [];
    list.push(this);
    if (Array.isArray(children) && children.length > 0) {
      children.forEach((node) => {
        list = list.concat(node.walk());
      });
    }
    return list;
  }

  /**
   * 获取节点封装对象
   * - TreeNode 对象 => TypeTreeNodeModel 对象
   * - TypeTreeNodeModel 用于封装 treeNode 对外暴露的 api
   * - 用户仅可操作经过封装的对象，减少了对外暴露的 api，利于代码重构
   * @return TypeTreeNodeModel 节点封装对象
   */
  public getModel(): TypeTreeNodeModel {
    let { model } = this;
    if (!model) {
      model = createNodeModel(this);
      this.model = model;
    }
    updateNodeModel(model, this);
    return model;
  }
}

export default TreeNode;
