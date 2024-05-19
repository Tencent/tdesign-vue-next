import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import difference from 'lodash/difference';
import camelCase from 'lodash/camelCase';
import isPlainObject from 'lodash/isPlainObject';
import mitt from 'mitt';

import { TreeNode } from './tree-node';
import {
  TreeNodeValue,
  TypeIdMap,
  TypeTimer,
  TypeTargetNode,
  TypeTreeNodeData,
  TypeTreeItem,
  TypeTreeStoreOptions,
  TypeTreeFilter,
  TypeTreeFilterOptions,
  TypeRelatedNodesOptions,
  TypeTreeEventState,
} from './types';

// 构建一个树的数据模型
// 基本设计思想：写入时更新，减少读取消耗，以减少未来实现虚拟滚动所需的计算量
// 任何一次数据写入，会触发相应节点的状态更新
// public 方法，在 ui 组件中有可能在使用，会保障其输入输出实现
// private 方法，可能会改动其输入输出

/**
 * tree 数据模型
 * @class TreeStore
 * @param {object} options tree 组件选项
 * @param {string} [options.prefix="t"] tree 组件内部属性前缀
 * @param {object} options.keys 取值映射对象，部分属性按照其 key/value 来取 treeNode 属性值
 * @param {string} [options.keys.label="label"] 从 data 种取 label 值时读取的属性名称
 * @param {string} [options.keys.value="value"] 从 data 种取 value 值时读取的属性名称
 * @param {string} [options.keys.children="children"] 从 data 种取 children 值时读取的属性名称
 * @param {boolean} [options.expandAll=false] 初始化节点时，是否自动展开
 * @param {number} [options.expandLevel=0] 初始化节点时，自动展开的级别
 * @param {boolean} [options.expandMutex=false] 展开时，是否使用手风琴模式
 * @param {boolean} [options.expandParent=false] 展开节点时，是否自动展开父节点
 * @param {boolean} [options.activable=false] 是否可以激活节点
 * @param {boolean} [options.activeMultiple=false] 激活节点是否使用多选模式
 * @param {boolean} [options.checkable=false] 节点是否可选中
 * @param {boolean} [options.checkStrictly=false] 节点选中是否使用严格模式
 * @param {boolean} [options.disabled=false] 节点是否禁用
 * @param {boolean} [options.draggable=false] 节点是否可拖动
 * @param {function} [options.load=null] 节点延迟加载函数
 * @param {boolean} [options.lazy=false] 节点是否使用延迟加载模式
 * @param {string} [options.valueMode="onlyLeaf"] 节点选中取值模式
 * @param {function} [options.filter=null] 节点过滤函数
 * @param {function} [options.onLoad=null] 节点延迟加载完成时的回调函数
 * @param {function} [options.onReflow=null] 节点触发回流后的回调
 * @param {function} [options.onUpdate=null] 节点触发更新后的后调
 * @param {boolean} [options.allowFoldNodeOnFilter=false] 过滤时，是否允许折叠节点
 */
export class TreeStore {
  // 根节点集合
  public children: TreeNode[];

  // 所有节点集合
  public nodes: TreeNode[];

  // 所有节点映射
  public nodeMap: Map<TreeNodeValue, TreeNode>;

  // 节点 私有 ID 映射
  public privateMap: Map<string, TreeNode>;

  // 配置选项
  public config: TypeTreeStoreOptions;

  // 活动节点集合
  public activedMap: TypeIdMap;

  // 数据被更新的节点集合
  public updatedMap: TypeIdMap;

  // 选中节点集合
  public checkedMap: TypeIdMap;

  // 展开节点的集合
  public expandedMap: TypeIdMap;

  // 符合过滤条件的节点的集合
  public filterMap: TypeIdMap;

  // 数据更新计时器
  public updateTimer: TypeTimer;

  // 识别是否需要重排
  public shouldReflow: boolean;

  // 存在过滤器标志
  public hasFilter: boolean;

  // 树节点过滤器
  public prevFilter: TypeTreeFilter;

  // 事件派发器
  public emitter: ReturnType<typeof mitt>;

  public constructor(options: TypeTreeStoreOptions) {
    const config: TypeTreeStoreOptions = {
      prefix: 't',
      keys: {},
      expandAll: false,
      expandLevel: 0,
      expandMutex: false,
      expandParent: false,
      activable: false,
      activeMultiple: false,
      checkable: false,
      checkStrictly: false,
      disabled: false,
      draggable: false,
      load: null,
      lazy: false,
      valueMode: 'onlyLeaf',
      filter: null,
      // 每次搜索条件变更，重置展开状态，路径节点展开，显示命中节点
      // allowFoldNodeOnFilter 为 true 时，搜索条件不变的情况下，允许折叠路径节点
      // 默认状态，allowFoldNodeOnFilter 为 false 时，路径节点无法折叠
      allowFoldNodeOnFilter: false,
      onLoad: null,
      onReflow: null,
      onUpdate: null,
      ...options,
    };
    this.config = config;
    this.nodes = [];
    this.children = [];
    this.nodeMap = new Map();
    this.privateMap = new Map();
    this.activedMap = new Map();
    this.expandedMap = new Map();
    this.checkedMap = new Map();
    this.updatedMap = new Map();
    this.filterMap = new Map();
    this.prevFilter = null;
    // 这个计时器确保频繁的 update 事件被归纳为1次完整数据更新后的触发
    this.updateTimer = null;
    // 在子节点增删改查时，将此属性设置为 true，来触发视图更新
    this.shouldReflow = false;
    // 这个标志会被大量用到
    this.hasFilter = isFunction(config.filter);
    this.emitter = mitt();
  }

  /**
   * 配置选项
   * @param {object} options tree 组件选项
   * @return void
   */
  public setConfig(options: TypeTreeStoreOptions) {
    const { config } = this;
    let hasChanged = false;
    Object.keys(options).forEach((key) => {
      const val = options[key];
      if (val !== config[key]) {
        hasChanged = true;
        config[key] = val;
      }
    });
    this.hasFilter = isFunction(config.filter);
    if (hasChanged) {
      // 在 td-tree 的 render 方法中调用 setConfig
      // 这样减少了 watch 属性
      // 仅在属性变更后刷新状态
      // 这样可以避免触发渲染死循环
      this.refreshState();
    }
  }

  /**
   * 获取根节点列表
   * @return TreeNode[] 根节点对象数组
   */
  public getChildren(): TreeNode[] {
    return this.children;
  }

  /**
   * 获取指定节点对象
   * @param {string|number|TreeNode} item 获取节点对象的条件，可以是节点 value，也可以是节点本身
   * @return TreeNode 节点对象，如果判断树中没有符合条件的节点，返回 null
   */
  public getNode(item: TypeTargetNode): TreeNode {
    let node = null;
    if (isString(item) || isNumber(item)) {
      node = this.nodeMap.get(item);
    } else if (item instanceof TreeNode) {
      node = this.nodeMap.get(item.value);
    }
    if (!node) node = null;
    return node;
  }

  /**
   * 获取节点在总节点列表中的位置
   * @param {TreeNode} node 节点对象
   * @return number 节点在总节点列表中的位置序号
   */
  public getIndex(node: TreeNode): number {
    return this.nodes.indexOf(node);
  }

  /**
   * 获取指定节点的父节点
   * @param {string} value 节点值
   * @return TreeNode 节点对象
   */
  public getParent(value: TypeTargetNode): TreeNode {
    let parent = null;
    const node = this.getNode(value);
    if (node) {
      parent = node.getParent();
    }
    return parent;
  }

  /**
   * 获取指定节点的所有父节点
   * @param {string} value 节点值
   * @return TreeNode[] 父节点数组
   */
  public getParents(value: TypeTargetNode): TreeNode[] {
    const node = this.getNode(value);
    let parents: TreeNode[] = [];
    if (node) {
      parents = node.getParents();
    }
    return parents;
  }

  /**
   * 获取指定节点在其所在 children 中的位置
   * @param {string} value 节点值
   * @return number 节点在 children 中的位置序号
   */
  public getNodeIndex(value: TypeTargetNode): number {
    const node = this.getNode(value);
    let index = -1;
    if (node) {
      index = node.getIndex();
    }
    return index;
  }

  /**
   * 获取所有符合条件的节点，按回流排序后的顺序给出
   * 以这些字段作为示例:
   * - value: 节点值(ID)
   * - TreeNode: 节点实例
   * - level: 节点层级
   * - filter: 节点过滤函数
   * 支持下列使用方式
   * - getNodes() 获取所有节点
   * - getNodes(value) 获取节点值对应的目标节点下，包含自己在内的所有子节点
   * - getNodes(TreeNode) 获取目标节点下，包含自己在内的所有子节点
   * - getNodes(value, { level: 2 }) 获取目标节点下，层级在 2 以内的子节点
   * - getNodes(value, { filter: node => (!node.checked) }) 获取目标节点下，未选中的节点
   * - getNodes(value, { props: { actived: true } }) 获取目标节点下，已激活的节点
   * @param {string | TreeNode} [item] 节点值，节点对象
   * @param {object} [options] 节点过滤条件，可传递节点属性，过滤出属性一致的节点
   * @param {number} [options.level=Infinity] 节点层级
   * @param {function} [options.filter=null] 节点过滤条件函数
   * @param {object} [options.props] 节点属性对象，作为过滤条件
   * @return TreeNode[] 符合条件的节点数组
   */
  public getNodes(
    item?: TypeTargetNode,
    options?: TypeTreeFilterOptions,
  ): TreeNode[] {
    let nodes: TreeNode[] = [];
    let val: TreeNodeValue = '';
    if (isString(item) || isNumber(item)) {
      val = item;
    } else if (item instanceof TreeNode) {
      val = item.value;
    }
    if (!val) {
      nodes = this.nodes.slice(0);
    } else {
      const node = this.getNode(val);
      if (node) {
        nodes = node.walk();
      }
    }

    if (options) {
      const conf: TypeTreeFilterOptions = {
        filter: null,
        level: Infinity,
        ...options,
      };
      if (isNumber(conf.level) && conf.level !== Infinity) {
        nodes = nodes.filter((node) => node.level <= conf.level);
      }
      if (isFunction(conf.filter)) {
        nodes = nodes.filter((node) => {
          const nodeModel = node.getModel();
          return conf.filter(nodeModel);
        });
      }
      if (isPlainObject(conf.props)) {
        nodes = nodes.filter((node) => {
          const result = Object.keys(conf.props).every((key) => {
            const propEqual = node[key] === conf.props[key];
            return propEqual;
          });
          return result;
        });
      }
    }
    return nodes;
  }

  /**
   * 添加新节点数据
   * @param {object[]} list 节点数据对象数组
   * @return void
   */
  public append(list: TypeTreeNodeData[]): void {
    list.forEach((item) => {
      const node = new TreeNode(this, item);
      this.children.push(node);
    });
    this.reflow();
  }

  /**
   * 清空当前树的数据，重新加载数据
   * @param {object[]} list 节点数据对象数组
   * @return void
   */
  public reload(list: TypeTreeNodeData[]): void {
    this.expandedMap.clear();
    this.checkedMap.clear();
    this.activedMap.clear();
    this.filterMap.clear();
    this.removeAll();
    this.append(list);
  }

  /**
   * 解析节点数据，适配多种节点类型
   * @param {string | TreeNode | object} para 树节点值，或者树节点，或者节点构造数据
   * @param {object | TreeNode} item 节点构造数据, 或者节点构造数据数组，或者树节点
   * @return spec 解析完成的数据结构
   * - {TreeNode} spec.node 目标树节点
   * - {object} spec.data 节点构造数据
   */
  private parseNodeData(
    para: TreeNodeValue | TreeNode | TypeTreeNodeData,
    item: TypeTreeNodeData | TreeNode,
  ) {
    let value: TreeNodeValue = '';
    let node = null;
    let data = null;

    if (isString(para) || isNumber(para)) {
      value = para;
      node = this.getNode(value);
      data = item;
    } else if (para instanceof TreeNode) {
      if (item) {
        node = para;
        data = item;
      } else {
        data = para;
      }
    } else {
      data = para;
    }
    const spec = {
      node,
      data,
    };
    return spec;
  }

  /**
   * 向指定节点追加节点或者数据
   * 以这些字段作为示例: item: 节点数据, TreeNode: 节点实例, value: 节点值(ID)
   * 支持下列使用方式
   * - appendNodes(item) 直接传递节点构造数据，新增节点
   * - appendNodes(TreeNode) 传递别的树的树节点，新增节点
   * - appendNodes(value, item) 以节点值查找指定节点，并新增节点构造数据
   * - appendNodes(value, TreeNode) 以节点值查找指定节点，并新增树节点
   * - appendNodes(TreeNode, item) 向指定节点新增节点构造数据
   * - appendNodes(TreeNode, TreeNode) 向指定节点新增树节点
   * @param {string | TreeNode | object} para 树节点值，或者树节点，或者节点构造数据
   * @param {object | TreeNode} [item] 节点构造数据, 或者节点构造数据数组，或者树节点
   * @return void
   */
  public appendNodes(
    para: TypeTargetNode | TypeTreeNodeData,
    item?: TypeTreeNodeData | TreeNode,
  ): void {
    const spec = this.parseNodeData(para, item);
    if (spec.data) {
      if (!spec.node) {
        // 在根节点插入
        if (spec.data instanceof TreeNode) {
          spec.data.appendTo(this);
        } else if (Array.isArray(spec.data)) {
          this.append(spec.data);
        } else {
          this.append([spec.data]);
        }
      } else {
        // 插入到目标节点之下
        if (spec.data instanceof TreeNode) {
          spec.data.appendTo(this, spec.node);
        } else if (isArray(spec.data)) {
          spec.node.append(spec.data);
        } else {
          spec.node.append([spec.data]);
        }
        spec.node.updateRelated();
      }
    }
  }

  /**
   * 在目标节点之前插入节点
   * @param {string | TreeNode} value 节点值，或者树节点
   * @param {object | TreeNode} item 节点构造数据, 或者树节点
   * @return void
   */
  public insertBefore(value: TypeTargetNode, item: TypeTreeItem): void {
    const node = this.getNode(value);
    if (node) {
      node.insertBefore(item);
    }
  }

  /**
   * 在目标节点之后插入节点
   * @param {string | TreeNode} value 节点值，或者树节点
   * @param {object | TreeNode} item 节点构造数据, 或者树节点
   * @return void
   */
  public insertAfter(value: TypeTargetNode, item: TypeTreeItem): void {
    const node = this.getNode(value);
    if (node) {
      node.insertAfter(item);
    }
  }

  /**
   * 更新树结构
   * - 清空 nodes 数组，然后遍历所有根节点重新插入 node
   * - 这个操作将会为树结构数据提供一个一纬数组索引
   * @return void
   */
  public refreshNodes(): void {
    const { children, nodes } = this;
    nodes.length = 0;
    children.forEach((node) => {
      const list = node.walk();
      Array.prototype.push.apply(nodes, list);
    });
  }

  /**
   * 更新所有树节点状态
   * @return void
   */
  public refreshState(): void {
    const { nodeMap } = this;
    // 树在初始化未回流时，nodes 数组为空
    // 所以遍历 nodeMap 确保初始化阶段 refreshState 方法也可以触发全部节点的更新
    nodeMap.forEach((node) => {
      node.update();
      node.updateChecked();
    });
  }

  /**
   * 标记节点重排
   * - 应该仅在树节点增删改查时调用
   * - 节点重排会在延时后触发 refreshNodes 方法的调用
   * @param {TreeNode} [node] 触发重排的树节点
   * @return void
   */
  public reflow(node?: TreeNode): void {
    this.shouldReflow = true;
    this.updated(node);
  }

  /**
   * 触发更新事件
   * - 节点属性变更时调用
   * - 统一延时后，处理需要在其他节点状态更新后再处理的逻辑，减少这类逻辑的重复调用开销
   * - 统一延时后，派发事件，通知树已更新完毕，以及回流完毕，触发 vue 视图渲染操作
   * @param {TreeNode} [node] 触发更新的树节点
   * @return void
   */
  public updated(node?: TreeNode): void {
    if (node?.value) {
      this.updatedMap.set(node.value, true);
    }
    if (this.updateTimer) return;
    this.updateTimer = setTimeout(() => {
      clearTimeout(this.updateTimer);
      this.updateTimer = null;

      // 检查节点是否需要回流，重排数组
      if (this.shouldReflow) {
        this.refreshNodes();
        this.emit('reflow');
      }

      // 检查节点是否有被过滤，锁定路径节点
      // 在此之前要遍历节点生成一个经过排序的节点数组
      // 以便于优化锁定检查算法
      this.lockFilterPathNodes();

      const updatedList = Array.from(this.updatedMap.keys());
      if (updatedList.length > 0) {
        // 统计需要更新状态的节点，派发更新事件
        const updatedNodes = updatedList.map((value) => this.getNode(value));
        this.emit('update', {
          nodes: updatedNodes,
          map: this.updatedMap,
        });
      } else if (this.shouldReflow) {
        // 单纯的回流不需要更新节点状态
        // 但需要触发更新事件
        // 实际业务中，这个逻辑几乎无法触发，节点操作必然引发 update
        // 这里代码仅仅用于边界兜底
        this.emit('update', {
          nodes: [],
          map: this.updatedMap,
        });
      }

      // 每次回流检查完毕，还原检查状态
      this.shouldReflow = false;
      this.updatedMap.clear();
    });
  }

  /**
   * 获取激活节点集合
   * @param {Map} [map] 预设激活节点 map, 用于受控操作时预先获取结果而不直接操作节点状态
   * @return string[] 激活节点值数组
   */
  public getActived(map?: TypeIdMap): TreeNodeValue[] {
    const activedMap = map || this.activedMap;
    return Array.from(activedMap.keys());
  }

  /**
   * 获取指定范围的激活节点
   * - 范围是目标节点在内所有子节点
   * @param {string | TreeNode} [item] 目标节点值，或者目标节点本身
   * @return TreeNode[] 激活节点数组
   */
  public getActivedNodes(item?: TypeTargetNode): TreeNode[] {
    let nodes = this.getNodes(item);
    nodes = nodes.filter((node) => node.isActived());
    return nodes;
  }

  /**
   * 替换激活态
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public replaceActived(list: TreeNodeValue[]): void {
    this.resetActived();
    this.setActived(list);
  }

  /**
   * 设置激活态
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public setActived(actived: TreeNodeValue[]): void {
    const { activeMultiple } = this.config;
    const list = actived.slice(0);
    if (!activeMultiple) {
      list.length = 1;
    }
    list.forEach((val) => {
      this.activedMap.set(val, true);
      const node = this.getNode(val);
      if (node) {
        node.update();
      }
    });
  }

  /**
   * 清空所有节点的激活状态
   * @return void
   */
  public resetActived(): void {
    const actived = this.getActived();
    this.activedMap.clear();
    const relatedNodes = this.getRelatedNodes(actived);
    relatedNodes.forEach((node) => {
      node.update();
    });
  }

  /**
   * 获取展开节点集合
   * @param {Map} [map] 预设展开节点 map, 用于受控操作时预先获取结果而不直接操作节点状态
   * @return void
   */
  public getExpanded(map?: TypeIdMap): TreeNodeValue[] {
    const expandedMap = map || this.expandedMap;
    return Array.from(expandedMap.keys());
  }

  /**
   * 替换展开节点
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public replaceExpanded(list: TreeNodeValue[]): void {
    const expanded = this.getExpanded();
    const added = difference(list, expanded);
    const removed = difference(expanded, list);
    this.setExpandedDirectly(removed, false);
    this.updateExpanded(removed);
    this.setExpanded(added);
  }

  /**
   * 批量设置展开节点
   * - 注意这个状态设置操作会忽略互斥属性
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public setExpanded(list: TreeNodeValue[]): void {
    this.setExpandedDirectly(list);
    this.updateExpanded(list);
  }

  /**
   * 直接设置节点展开状态
   * - 注意这个状态设置操作会忽略互斥属性
   * @param {string[]} list 目标节点值数组
   * @param {boolean} [expanded=true] 展开状态
   * @return void
   */
  public setExpandedDirectly(list: TreeNodeValue[], expanded = true): void {
    list.forEach((val) => {
      if (expanded) {
        this.expandedMap.set(val, true);
      } else {
        this.expandedMap.delete(val);
      }
      const node = this.getNode(val);
      if (node) {
        node.afterExpanded();
      }
    });
  }

  /**
   * 清除所有节点的展开状态
   * @return void
   */
  public resetExpanded(): void {
    const expanded = this.getExpanded();
    this.expandedMap.clear();
    this.updateExpanded(expanded);
  }

  /**
   * 更新展开节点相关节点的状态
   * - 节点展开状态变更后，上下游节点可能存在状态变更，统一纳入待更新队列
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public updateExpanded(list: TreeNodeValue[]): void {
    const relatedNodes = this.getRelatedNodes(list, {
      withParents: false,
    });
    relatedNodes.forEach((node) => {
      node.update();
    });
  }

  /**
   * 获取选中态节点值数组
   * @param {Map} [map] 预设选中节点 map, 用于受控操作时预先获取结果而不直接操作节点状态
   * @return string[] 选中态节点 value 数组
   */
  public getChecked(map?: TypeIdMap): TreeNodeValue[] {
    const { nodeMap, config } = this;
    const { valueMode, checkStrictly } = config;
    const list: TreeNodeValue[] = [];
    const checkedMap = map || this.checkedMap;
    nodeMap.forEach((node) => {
      // 判断未选中，直接忽略
      if (!node.isChecked(checkedMap)) return;
      if (valueMode === 'parentFirst' && !checkStrictly) {
        // valueMode 为 parentFirst
        // 仅取值父节点
        if (!node.parent || !node.parent.isChecked(checkedMap)) {
          list.push(node.value);
        }
      } else if (valueMode === 'onlyLeaf' && !checkStrictly) {
        // valueMode 为 onlyLeaf
        // 仅取值叶子节点
        if (node.isLeaf()) {
          list.push(node.value);
        }
      } else {
        // valueMode 为 all
        // 取值所有选中节点
        list.push(node.value);
      }
    });
    return list;
  }

  /**
   * 获取指定节点下的选中节点
   * @param {string | TreeNode} [item] 目标节点值，或者目标节点
   * @return TreeNode[] 选中节点数组
   */
  public getCheckedNodes(item?: TypeTargetNode): TreeNode[] {
    let nodes = this.getNodes(item);
    nodes = nodes.filter((node) => node.isChecked());
    return nodes;
  }

  /**
   * 替换选中态列表
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public replaceChecked(list: TreeNodeValue[]): void {
    this.resetChecked();
    this.setChecked(list);
  }

  /**
   * 批量设置选中态
   * @param {string[]} list 目标节点值数组
   * @return void
   */
  public setChecked(list: TreeNodeValue[]): void {
    const { checkStrictly, checkable } = this.config;
    if (!checkable) return;
    list.forEach((val: TreeNodeValue) => {
      const node = this.getNode(val);
      if (!node) return;
      if (checkStrictly) {
        this.checkedMap.set(val, true);
        node.updateChecked();
      } else {
        const childrenNodes = node.walk();
        childrenNodes.forEach((childNode) => {
          this.checkedMap.set(childNode.value, true);
        });
      }
    });
    if (!checkStrictly) {
      const checkedValues = this.getChecked();
      const relatedNodes = this.getRelatedNodes(checkedValues);
      relatedNodes.forEach((node) => {
        node.updateChecked();
      });
    }
  }

  /**
   * 清除所有节点选中态
   * @return void
   */
  public resetChecked(): void {
    const checked = this.getChecked();
    const relatedNodes = this.getRelatedNodes(checked);
    this.checkedMap.clear();
    relatedNodes.forEach((node) => {
      node.updateChecked();
    });
  }

  /**
   * 更新全部节点状态
   * @return void
   */
  public updateAll(): void {
    this.nodeMap.forEach((node) => {
      node.update();
      node.updateChecked();
    });
  }

  /**
   * 移除指定节点
   * @param {string} value 目标节点值
   * @return void
   */
  public remove(value?: TypeTargetNode): void {
    const node = this.getNode(value);
    if (node) {
      node.remove();
    }
  }

  /**
   * 移除所有节点
   * @return void
   */
  public removeAll(): void {
    const nodes = this.getNodes();
    nodes.forEach((node) => {
      node.remove();
    });
  }

  /**
   * 获取节点状态变化可能影响的关联节点
   * - 用于实现最小遍历集合
   * @param {string[]} list 目标节点值数组
   * @param {object} [options] 操作选项
   * @oaran {boolean} [options.reverse=false] 倒序排列遍历节点
   * @param {boolean} [options.withParents=true] 包含所有父节点
   * @return TreeNode[] 关联节点数组
   */
  public getRelatedNodes(
    list: TreeNodeValue[],
    options?: TypeRelatedNodesOptions,
  ): TreeNode[] {
    const conf = {
      // 默认倒序排列，从底层节点开始遍历
      reverse: false,
      // 默认遍历父节点
      withParents: true,
      ...options,
    };
    const map = new Map();
    list.forEach((value) => {
      if (map.get(value)) return;
      const node = this.getNode(value);
      if (node) {
        const parents = node.getParents().reverse();
        const children = node.walk();
        let related = [];
        if (conf.withParents) {
          related = parents.concat(children);
        } else {
          related = children;
        }
        // 用 map 实现节点去重
        related.forEach((relatedNode) => {
          map.set(relatedNode.value, relatedNode);
        });
      }
    });
    let relatedNodes = Array.from(map.values());
    if (conf.reverse) {
      relatedNodes = relatedNodes.reverse();
    }
    return relatedNodes;
  }

  /**
   * 触发绑定的事件
   * - store.emitter 可以绑定事件回调，用于多个组件共同监听事件
   * @param {string} name 事件名称
   * @param {Event} [state] 事件对象
   * @param {TreeNode} [state.node] 事件关联节点
   * @param {TreeNode[]} [state.nodes] 事件关联节点数组
   * @param {Map} [state.map] 事件关联节点映射
   * @param {object[]} [state.data] 事件关联节点数据
   * @return void
   */
  public emit(name: string, state?: TypeTreeEventState): void {
    const { config, emitter } = this;
    const methodName = camelCase(`on-${name}`);
    const method = config[methodName];
    if (isFunction(method)) {
      method(state);
    }
    emitter.emit(name, state);
  }

  /**
   * 锁定过滤节点的路径节点
   * - 使得路径节点自动展开
   * @return void
   */
  private lockFilterPathNodes(): void {
    const { config } = this;
    const allNodes = this.getNodes();

    if (this.prevFilter) {
      // 过滤条件清空时，也需要清理锁定节点
      // 所在判断过滤条件是否存在之前，就要调用这里的清理逻辑
      // 不想在每次渲染时都做这个清空判断
      // 所以判断一下之前是否有进行过滤
      allNodes.forEach((node: TreeNode) => {
        // 先清空所有锁定状态
        if (node.vmIsLocked) {
          // lock 方法内部有状态计算
          // 所以要减少 lock 方法调用次数
          node.lock(false);
        }
      });
    }

    const currentFilter = config.filter;
    // 当前没有过滤器
    // 则无需处理锁定节点
    if (!currentFilter || !isFunction(currentFilter)) return;
    this.prevFilter = config.filter;

    // 全部节点要经过排序，才能使用这个遍历
    // 比起每个过滤节点调用 getParents 方法检查父节点状态
    // 复杂度 O(N*log(N)) => O(N)
    allNodes.reverse().forEach((node: TreeNode) => {
      // 数组颠倒后，等于是从每个节点的子节点开始判断
      // 想象为从展开树的最底部向上遍历
      const parent = node.getParent();
      if (!parent) return;
      if (node.vmIsRest || node.vmIsLocked) {
        // 当前节点被过滤条件命中
        // 或者当前节点被锁定
        // 则需要判定父节点状态
        if (!parent.vmIsLocked) {
          // 父节点已被锁定，则忽略动作
          // lock 方法有内置状态判断
          parent.lock(true);
        }
      }
    });
  }
}

export default TreeStore;
