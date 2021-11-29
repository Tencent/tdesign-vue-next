import { defineComponent, VNode } from 'vue';
import kebabCase from 'lodash/kebabCase';
import { prefix } from '../config';
import TTabPanel from './tab-panel';
import TTabNav from './tab-nav';
import { TabValue, TdTabsProps } from './type';
import props from './props';
import { emitEvent } from '../utils/event';

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
  data() {
    return {
      panels: [] as Array<InstanceType<typeof TTabPanel>>,
      listPanels: [],
    };
  },

  watch: {
    list: {
      handler(value) {
        if (!value) return;
        this.listPanels = this.createListPanels();
      },
      deep: true,
    },
  },

  mounted() {
    this.initPanels();
  },

  methods: {
    initPanels() {
      if (this.list) {
        this.listPanels = this.createListPanels();
      } else {
        const slots = this.$slots.default?.();
        this.listPanels = slots && slots.length === 1 ? (slots[0].children as VNode[]) : slots;
      }
      if (!this.listPanels) {
        this.panels = this.panels || [];
        return;
      }
      const newPanels = this.listPanels.filter((child) => kebabCase(child.type.name).endsWith(`${prefix}-tab-panel`));
      const isUnChange = () =>
        newPanels.length === this.panels.length && this.panels.every((panel, index) => panel === newPanels[index]);
      if (isUnChange()) return;
      this.panels = newPanels;
    },
    onAddTab(e: MouseEvent) {
      emitEvent<Parameters<TdTabsProps['onAdd']>>(this, 'add', { e });
    },
    onChangeTab(value: TabValue) {
      emitEvent<Parameters<TdTabsProps['onChange']>>(this, 'change', value);
    },
    onRemoveTab({ e, value, index }: Parameters<TdTabsProps['onRemove']>[0]) {
      const panel = this.panels[index];
      const eventData = {
        value,
        index,
        e,
      };
      emitEvent<Parameters<TdTabsProps['onRemove']>>(this, 'remove', eventData);
      if (!panel) return;
      emitEvent<Parameters<TdTabsProps['onRemove']>>(panel, 'remove', eventData);
    },
    renderHeader() {
      const panelsData = this.panels.map((item) => {
        const selfItem = item;
        for (const key in item.props) {
          selfItem[key] = item.props[key];
        }
        return selfItem;
      });
      const tabNavProps = {
        theme: this.theme,
        value: this.value,
        size: this.size,
        disabled: this.disabled,
        placement: this.placement,
        addable: this.addable,
        panels: panelsData,
      };
      return (
        <div
          class={{
            [`${prefix}-tabs__header`]: true,
            [`${prefix}-is-${this.placement}`]: true,
          }}
        >
          <TTabNav
            {...tabNavProps}
            onChange={this.onChangeTab}
            onAdd={this.onAddTab}
            onRemove={this.onRemoveTab}
          ></TTabNav>
        </div>
      );
    },
    createListPanels() {
      return this.list.map((item) => <TTabPanel {...item} onRemove={this.onRemoveTab}></TTabPanel>);
    },
    renderList(): VNode[] {
      if (!this.listPanels) {
        return this.createListPanels();
      }
      return this.listPanels;
    },
    renderContent() {
      return <div class={[`${prefix}-tabs__content`]}>{this.listPanels}</div>;
    },
  },

  render() {
    return (
      <div class={[`${prefix}-tabs`]}>
        {this.placement !== 'bottom'
          ? [this.renderHeader(), this.renderContent()]
          : [this.renderContent(), this.renderHeader()]}
      </div>
    );
  },
});
