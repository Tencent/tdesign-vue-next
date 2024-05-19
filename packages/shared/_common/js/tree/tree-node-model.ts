import isUndefined from 'lodash/isUndefined';
import isBoolean from 'lodash/isBoolean';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { TreeNode } from './tree-node';
import { OptionData } from '../common';
import {
  TreeNodeValue,
  TypeTreeNodeModel,
  TypeTreeNodeData,
  TypeTreeItem,
} from './types';
import log from '../log/log';

export const nodeKey = '__tdesign_tree-node__';

export class TreeNodeModel {
  private [nodeKey]: TreeNode;

  constructor(node: TreeNode) {
    this[nodeKey] = node;
  }

  public get value() {
    const node = this[nodeKey];
    return node.value;
  }

  public get label() {
    const node = this[nodeKey];
    return node.label;
  }

  public get data() {
    const node = this[nodeKey];
    return node.data;
  }

  public get actived() {
    const node = this[nodeKey];
    return node.actived;
  }

  public get expanded() {
    const node = this[nodeKey];
    return node.expanded;
  }

  public get checked() {
    const node = this[nodeKey];
    return node.checked;
  }

  public get indeterminate() {
    const node = this[nodeKey];
    return node.indeterminate;
  }

  public get loading() {
    const node = this[nodeKey];
    return node.loading;
  }

  public get disabled() {
    const node = this[nodeKey];
    return node.isDisabled();
  }

  /**
   * 获取节点所处层级
   * @return number 节点层级序号
   */
  public getLevel() {
    const node = this[nodeKey];
    return node.getLevel();
  }

  /**
   * 获取节点在父节点的子节点列表中的位置
   * - 如果没有父节点，则获取节点在根节点列表的位置
   * @return number 节点位置序号
   */
  public getIndex() {
    const node = this[nodeKey];
    return node.getIndex();
  }

  /**
   * 是否为兄弟节点中的第一个节点
   * @return boolean 是否为第一个节点
   */
  public isFirst() {
    const node = this[nodeKey];
    return node.isFirst();
  }

  /**
   * 是否为兄弟节点中的最后一个节点
   * @return boolean 是否为最后一个节点
   */
  public isLast() {
    const node = this[nodeKey];
    return node.isLast();
  }

  /**
   * 是否为叶子节点，叶子节点没有子节点
   * @return boolean 是否为叶子节点
   */
  public isLeaf() {
    const node = this[nodeKey];
    return node.isLeaf();
  }

  /**
   * 在当前节点之前插入节点
   * @param {object} newData 要插入的节点或者数据
   * @return void
   */
  public insertBefore(newData: TypeTreeItem) {
    const node = this[nodeKey];
    return node.insertBefore(newData);
  }

  /**
   * 在当前节点之后插入节点
   * @param {object} newData 要插入的节点或者数据
   * @return void
   */
  public insertAfter(newData: TypeTreeItem) {
    const node = this[nodeKey];
    return node.insertAfter(newData);
  }

  /**
   * 追加节点数据
   * @param {object | object[]} data 节点数据
   * @return void
   */
  public appendData(data: TypeTreeNodeData | TypeTreeNodeData[]) {
    const node = this[nodeKey];
    return node.append(data);
  }

  /**
   * 返回路径节点
   * - 路径节点包含自己在内
   * - 节点顺序与父级节点顺序相反，从根到当前
   * @return TreeNodeModel[] 路径节点数组
   */
  public getPath(): TypeTreeNodeModel[] {
    const node = this[nodeKey];
    const nodes = node.getPath();
    return nodes.map((item: TreeNode) => item.getModel());
  }

  /**
   * 获取本节点的父节点
   * @return TreeNodeModel 父节点
   */
  public getParent(): TypeTreeNodeModel {
    const node = this[nodeKey];
    return node.parent?.getModel();
  }

  /**
   * 获取所有父级节点
   * - 顺序为从当前到根
   * @return TreeNodeModel[] 父级节点数组
   */
  public getParents(): TypeTreeNodeModel[] {
    const node = this[nodeKey];
    const nodes = node.getParents();
    return nodes.map((item: TreeNode) => item.getModel());
  }

  /**
   * 获取本节点的根节点
   * @return TreeNodeModel 根节点
   */
  public getRoot(): TypeTreeNodeModel {
    const node = this[nodeKey];
    const root = node.getRoot();
    return root?.getModel();
  }

  /**
   * 获取所有兄弟节点，包含自己在内
   * @return TreeNodeModel[] 兄弟节点数组
   */
  public getSiblings(): TypeTreeNodeModel[] {
    const node = this[nodeKey];
    const nodes = node.getSiblings();
    return nodes.map((item: TreeNode) => item.getModel());
  }

  /**
   * 获取当前节点的子节点
   * @param {boolean} deep 是否获取所有深层子节点
   * @return TreeNodeModel[] 子节点数组
   */
  public getChildren(deep?: boolean): boolean | TypeTreeNodeModel[] {
    const node = this[nodeKey];
    let childrenModel: boolean | TypeTreeNodeModel[] = false;
    const { children } = node;
    if (Array.isArray(children)) {
      if (children.length > 0) {
        if (deep) {
          const nodes = node.walk();
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
   * 移除节点
   * - 提供 value 参数，移除本节点子节点中的节点
   * - 不提供 value 参数，移除自己
   * @param {string} value 目标节点值
   * @return void
   */
  public remove(value?: TreeNodeValue) {
    const node = this[nodeKey];
    if (!value) {
      node.remove();
      return;
    }

    const { tree } = node;
    const targetNode = tree.getNode(value);
    if (!targetNode) {
      log.warnOnce('Tree', `\`${value}\` is not exist`);
      return;
    }

    const parents = targetNode.getParents();
    const parentValues = parents.map((pnode) => (pnode.value));
    if (parentValues.indexOf(node.value) < 0) {
      log.warnOnce('Tree', `\`${value}\` is not a childNode of current node`);
      return;
    }
    targetNode.remove();
  }

  /**
   * 设置本节点携带的元数据
   * @param {object} data 节点数据
   * @return void
   */
  public setData(data: OptionData) {
    const node = this[nodeKey];
    // syncAttrs 列举的属性，key 名称可被 tree.config.keys 定义
    // 因此同步状态时需要读取被定义的 key 名称
    // 详细细节可见 https://github.com/Tencent/tdesign-common/issues/655
    const syncAttrs = [
      'value',
      'label',
      'disabled',
    ];
    const cleanData = omit(data, ['children', ...syncAttrs]);
    const { keys } = node.tree.config;
    syncAttrs.forEach((attr: string) => {
      const dataAttrValue = get(data, keys?.[attr] || attr);
      if (!isUndefined(dataAttrValue)) cleanData[attr] = dataAttrValue;
    });
    Object.assign(node.data, cleanData);
    Object.assign(node, cleanData);
    node.update();
  }
}

// 封装对外暴露的对象
export function createNodeModel(node: TreeNode): TypeTreeNodeModel {
  const model = new TreeNodeModel(node);
  return model as TypeTreeNodeModel;
}
