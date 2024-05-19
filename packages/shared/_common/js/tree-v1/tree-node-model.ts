import isUndefined from 'lodash/isUndefined';
import isBoolean from 'lodash/isBoolean';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { TreeNode } from './tree-node';
import { OptionData } from '../common';
import {
  TreeNodeValue,
  TypeTreeNodeModel,
  TypeTreeNodeData,
  TypeTreeItem,
  TreeNodeModelProps,
} from './types';
import log from '../log/log';

// 获取节点需要暴露的属性
function getExposedProps(node: TreeNode): TreeNodeModelProps {
  const props = pick(node, [
    'value',
    'label',
    'data',
    'actived',
    'expanded',
    'checked',
    'indeterminate',
    'loading',
  ]) as TreeNodeModelProps;
  return props;
}

// 封装对外暴露的对象
export function createNodeModel(node: TreeNode): TypeTreeNodeModel {
  const props = getExposedProps(node);

  const model: TypeTreeNodeModel = {
    ...props,

    /**
     * 获取节点所处层级
     * @return number 节点层级序号
     */
    getLevel() {
      return node.getLevel();
    },

    /**
     * 获取节点在父节点的子节点列表中的位置
     * - 如果没有父节点，则获取节点在根节点列表的位置
     * @return number 节点位置序号
     */
    getIndex() {
      return node.getIndex();
    },

    /**
     * 是否为兄弟节点中的第一个节点
     * @return boolean 是否为第一个节点
     */
    isFirst() {
      return node.isFirst();
    },

    /**
     * 是否为兄弟节点中的最后一个节点
     * @return boolean 是否为最后一个节点
     */
    isLast() {
      return node.isLast();
    },

    /**
     * 是否为叶子节点，叶子节点没有子节点
     * @return boolean 是否为叶子节点
     */
    isLeaf() {
      return node.isLeaf();
    },

    /**
     * 在当前节点之前插入节点
     * @param {object} newData 要插入的节点或者数据
     * @return void
     */
    insertBefore(newData: TypeTreeItem) {
      return node.insertBefore(newData);
    },

    /**
     * 在当前节点之后插入节点
     * @param {object} newData 要插入的节点或者数据
     * @return void
     */
    insertAfter(newData: TypeTreeItem) {
      return node.insertAfter(newData);
    },

    /**
     * 追加节点数据
     * @param {object | object[]} data 节点数据
     * @return void
     */
    appendData(data: TypeTreeNodeData | TypeTreeNodeData[]) {
      return node.append(data);
    },

    /**
     * 返回路径节点
     * - 路径节点包含自己在内
     * - 节点顺序与父级节点顺序相反，从根到当前
     * @return TreeNodeModel[] 路径节点数组
     */
    getPath(): TypeTreeNodeModel[] {
      const nodes = node.getPath();
      return nodes.map((item: TreeNode) => item.getModel());
    },

    /**
     * 获取本节点的父节点
     * @return TreeNodeModel 父节点
     */
    getParent(): TypeTreeNodeModel {
      return node.parent?.getModel();
    },

    /**
     * 获取所有父级节点
     * - 顺序为从当前到根
     * @return TreeNodeModel[] 父级节点数组
     */
    getParents(): TypeTreeNodeModel[] {
      const nodes = node.getParents();
      return nodes.map((item: TreeNode) => item.getModel());
    },

    /**
     * 获取本节点的根节点
     * @return TreeNodeModel 根节点
     */
    getRoot(): TypeTreeNodeModel {
      const root = node.getRoot();
      return root?.getModel();
    },

    /**
     * 获取所有兄弟节点，包含自己在内
     * @return TreeNodeModel[] 兄弟节点数组
     */
    getSiblings(): TypeTreeNodeModel[] {
      const nodes = node.getSiblings();
      return nodes.map((item: TreeNode) => item.getModel());
    },

    /**
     * 获取当前节点的子节点
     * @param {boolean} deep 是否获取所有深层子节点
     * @return TreeNodeModel[] 子节点数组
     */
    getChildren(deep?: boolean): boolean | TypeTreeNodeModel[] {
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
    },

    /**
     * 移除节点
     * - 提供 value 参数，移除本节点子节点中的节点
     * - 不提供 value 参数，移除自己
     * @param {string} value 目标节点值
     * @return void
     */
    remove(value?: TreeNodeValue) {
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
    },

    /**
     * 设置本节点携带的元数据
     * @param {object} data 节点数据
     * @return void
     */
    setData(data: OptionData) {
      // 详细细节可见 https://github.com/Tencent/tdesign-common/issues/655
      const _data = omit(data, ['children', 'value', 'label']);
      const { keys } = node.tree.config;
      const dataValue = data[keys?.value || 'value'];
      const dataLabel = data[keys?.label || 'label'];
      if (!isUndefined(dataValue)) _data.value = dataValue;
      if (!isUndefined(dataLabel)) _data.label = dataLabel;

      Object.assign(node.data, _data);
      Object.assign(node, _data);
    },
  };

  return model;
}

/**
 * 同步节点属性到封装对象
 * @param {TreeNodeModel} 节点封装对象
 * @param {object} data 节点数据
 * @return void
 */
export function updateNodeModel(model: TypeTreeNodeModel, node: TreeNode) {
  // 同步节点属性
  const props = getExposedProps(node);
  Object.assign(model, props);
}
