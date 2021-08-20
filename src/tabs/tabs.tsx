import { Component, defineComponent, getCurrentInstance, onMounted, onUpdated, ref, Fragment, ComponentInternalInstance, VNode } from 'vue';
import { prefix } from '../config';
import TTabNav from './tab-nav.vue';
import TTabPanel from './tab-panel';
import { TabValue } from './type';
import props from './props';

const name = `${prefix}-tabs`;

export default defineComponent({
  name,

  components: {
    TTabPanel,
    TTabNav,
  },

  props: {
    ...props,
  },

  emits: ['change', 'add', 'remove', 'update:value'],

  setup(props, { slots }) {
    const panels = ref([]);
    const instance = getCurrentInstance();

    const getPaneInstanceFromSlot = (vnode: VNode, panelInstanceList: ComponentInternalInstance[] = []) => {
      Array.from((vnode.children || []) as ArrayLike<VNode>).forEach((node) => {
        let { type } = node;
        type = (type as Component).name || type;
        if (type === `${prefix}-tab-panel` && node.component) {
          panelInstanceList.push(node.component);
        } else if (type === Fragment || type === 'template') {
          getPaneInstanceFromSlot(node, panelInstanceList);
        }
      });
      return panelInstanceList;
    };
    const setPanelInstances = () => {
      if (slots.default) {
        // eslint-disable-next-line prefer-destructuring
        const { children } = instance.subTree.children[0];
        const content = Array.from(children as ArrayLike<VNode>).find(({ props }) => props.class === `${prefix}-tabs__content`);
        if (!content) return;
        const panelInstanceList = getPaneInstanceFromSlot(content);
        const isChanged = !(panelInstanceList.length === panels.value.length && panelInstanceList.every((panel, index) => panel.uid === panels.value[index].uid));
        if (isChanged) {
          panels.value = panelInstanceList;
        }
      }
    };

    onMounted(() => {
      setPanelInstances();
    });

    onUpdated(() => {
      setPanelInstances();
    });

    return {
      panels,
    };
  },
  // mounted() {
  //   this.getPanels()
  // },
  methods: {
    // getPanels() {
    //   const panels = this.$slots.default()
    //   if (panels.length) {
    //     const panelSlots = panels.filter((vnode) => {
    //       const {
    //         type,
    //       } = vnode;
    //       return type?.name?.endsWith(`${prefix}-tab-panel`);
    //     });
    //     console.log(panelSlots)
    //     this.panels = panelSlots
    //   }
    // },
    tabChange(event: Event, panel: VNode, value: TabValue) {
      // emit('xxx') 会调用onXxx函数, 所以不必在主动调用onXxx函数了
      this.$emit('change', value);
      this.$emit('update:value', value);
    },

    tabAdd(e: MouseEvent) {
      this.$emit('add', { e });
    },

    tabRemove(event: MouseEvent, value: TabValue, index: number) {
      event.stopPropagation();
      const panel = this.panels[index];
      const eventData = {
        value,
        index,
        e: event,
      };
      this.$emit('remove', eventData);
      if (panel.type.name === `${prefix}-tab-panel`) {
        panel.emit('remove');
      }
    },

    genTabNav() {
      const {
        theme,
        panels,
        value,
        size,
        disabled,
        placement,
        addable,
        tabChange,
        tabAdd,
        tabRemove,
      } = this;
      const data = {
        props: {
          theme,
          panels, // immutable，为子组件watch
          currValue: value,
          size,
          disabled,
          placement,
          addable,
          tabChange,
          tabAdd,
          tabRemove,
        },
        ref: 'nav',
      };
      return (
        <t-tab-nav {...data.props} ref="nav" />
      );
    },

    genTabHeader() {
      return (
        <div
          key="tab-header"
          class={{
            [`${prefix}-tabs__header`]: true,
            [`${prefix}-is-${this.placement}`]: true,
          }}
        >
          { this.genTabNav() }
        </div>
      );
    },

    genTabContent() {
      return (
        <div key="tab-content" class={{ [`${prefix}-tabs__content`]: true }}>
          { this.$slots.default?.() }
        </div>
      );
    },
  },


  render() {
    // 性能优化: 在tab和content加一个key, 在上下左右切换选项卡时, 可以快速让content和content diff, header和header diff
    const header = this.genTabHeader();
    const content = this.genTabContent();
    return (
      <div class="t-tabs">
        { this.placement !== 'bottom' ? [header, content] : [content, header] }
      </div>
    );
  },

});
