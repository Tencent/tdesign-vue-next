import { ComponentPublicInstance, defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import TTabPanel from './tab-panel';
import TTabNav from './tab-nav';
import { TabValue, TdTabsProps } from './type';
import props from './props';
import { emitEvent } from '../utils/event';
import { renderTNodeJSX } from '../utils/render-tnode';

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

  methods: {
    onAddTab(e: MouseEvent) {
      emitEvent<Parameters<TdTabsProps['onAdd']>>(this, 'add', { e });
    },
    onChangeTab(value: TabValue) {
      emitEvent<Parameters<TdTabsProps['onChange']>>(this, 'change', value);
    },
    onRemoveTab({ e, value, index }: Parameters<TdTabsProps['onRemove']>[0]) {
      const eventData = {
        value,
        index,
        e,
      };
      emitEvent<Parameters<TdTabsProps['onRemove']>>(this, 'remove', eventData);
    },
    getSlotPanels() {
      let content = renderTNodeJSX(this, 'default');
      if (!content) return [];
      content = content
        .map((item: ComponentPublicInstance) => {
          if (item.children && Array.isArray(item.children)) return item.children;
          return item;
        })
        .flat()
        .filter((item: ComponentPublicInstance) => {
          return item.type.name === 'TTabPanel';
        });

      return content;
    },
    renderHeader() {
      const panels = (this.list?.length ? this.list : this.getSlotPanels()) || [];
      const panelsData = panels.map((item: ComponentPublicInstance) => {
        const selfItem = item;

        if (item.props) {
          Object.keys(item.props).forEach((key) => {
            selfItem[key] = item.props[key];
          });
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
          <TTabNav {...tabNavProps} onChange={this.onChangeTab} onAdd={this.onAddTab} onRemove={this.onRemoveTab} />
        </div>
      );
    },
    renderContent() {
      const panels = this.getSlotPanels();
      if (this.list?.length) {
        return this.list.map((item) => <TTabPanel {...item} onRemove={this.onRemoveTab} />);
      }
      if (panels && panels.length) {
        return <div class={[`${prefix}-tabs__content`]}>{panels}</div>;
      }
      console.warn('Tdesign error: list or slots is empty');
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
