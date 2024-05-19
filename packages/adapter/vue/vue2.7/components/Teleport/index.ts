import { getAttach } from '@td/adapter-utils';
import { H, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from '../../index';
import type { PropType } from '../../index';

/**
 * 实现非常的简单，就是 dom 操作
 * mounted 后移动到对应的节点下即可
 *
 * 难点在移除
 */

let globalChildNodesId = 0;

export interface RendererNode {
  [key: string]: any;
}

export default defineComponent({
  name: 'TTeleportVue2',
  props: {
    to: {
      type: [String, Element] as PropType<string | Element | RendererNode>,
      default: 'body',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const target = ref<Element | null>();
    // 记录结点
    const childNodes = ref<ChildNode[]>([]);
    // 记录结点 Id
    const childNodesId = ref<string[]>([]);

    // 获取 target
    const getTarget = () => {
      if (props.disabled) {
        // 禁用情况下，target 为当前容器
        const instance = getCurrentInstance();
        return instance?.$el.parentNode as Element;
      }
      const el = getAttach(props.to);
      if (!el) {
        return null;
      }
      return el;
    };

    // 获取子节点
    const getChildNodes = () => {
      const instance = getCurrentInstance();
      const childNodes: ChildNode[] = [];
      instance?.$el.childNodes.forEach(node => childNodes.push(node));
      return childNodes;
    };

    // 为每一个节点打上标记，这样才能在 unmount 时移除
    const markNode = (childNodes: ChildNode[]) => {
      const fragment = document.createDocumentFragment();
      childNodes.forEach((node) => {
        // 注释
        if (node.nodeType === 8) {
          return;
        }
        const nodeId = String(globalChildNodesId);
        (node as HTMLElement).dataset.tdesignVue2TeleportNodeId = nodeId;
        childNodesId.value.push(nodeId);
        fragment.appendChild(node);
        globalChildNodesId++;
      });
      return fragment;
    };

    // 移动到目标位置
    const moveToTarget = (target: Element) => {
      childNodes.value && target.appendChild(markNode(childNodes.value));
    };

    // 从目标位置移除
    const removeInTarget = (target: Element) => {
      childNodesId.value.forEach((nodeId) => {
        const node = target.querySelector(`[data-tdesign-vue2-teleport-node-id="${nodeId}"]`);
        node && target.removeChild(node);
      });
      childNodesId.value = [];
    };

    watch(
      [
        () => props.to,
        () => props.disabled,
      ],
      () => {
        target.value && removeInTarget(target.value);
        target.value = getTarget();
        target.value && moveToTarget(target.value);
      },
    );

    onMounted(() => {
      target.value = getTarget();
      childNodes.value = getChildNodes();
      target.value && moveToTarget(target.value);
    });

    onBeforeUnmount(() => {
      target.value && removeInTarget(target.value);
    });

    return () => {
      const instance = getCurrentInstance();
      return H('div', { class: 'tdesign-vue2-teleport', style: { visibility: 'hidden', display: 'none' } }, instance?.slots?.default?.(H));
    };
  },
});
