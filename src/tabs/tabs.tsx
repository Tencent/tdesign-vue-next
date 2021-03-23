import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import TTabNav from './tab-nav.vue';
import TTabPanel from './tab-panel';
import { TabValue } from '@TdTypes/tabs/TdTabsProps';
import props from '@TdTypes/tabs/props';

const name = `${prefix}-tabs`;

export default Vue.extend({
  name,
  model: {
    prop: 'value',
    event: 'change',
  },

  components: {
    RenderComponent,
    TTabPanel,
    TTabNav,
  },

  props: { ...props },

  data() {
    return {
      // tab内的panel实例组
      panels: [],
    };
  },

  methods: {
    connectPanels() {
      const scopedSlots = this.$scopedSlots.default?.({}) || [];
      if (scopedSlots.length) {
        const panelSlots = scopedSlots.filter((vnode) => {
          const {
            componentOptions: {
              tag = '',
            } = {},
          } = vnode;
          return tag === `${prefix}-tab-panel`;
        });
        const panels = panelSlots.map(({ componentInstance }) => componentInstance);
        const isChanged = !(panels.length === this.panels.length
          && panels.every((p, i) => p === this.panels[i]));
        if (isChanged) {
          this.panels = panels;
        }
      } else if (this.panels.length !== 0) {
        this.panels = [];
      }
    },

    tabChange(event: Event, panel: VNode, value: TabValue) {
      this.$emit('change', value);
      if (typeof this.onChange === 'function') {
        this.onChange(value);
      }
    },

    tabAdd(e: MouseEvent) {
      this.$emit('add', { e });
      if (typeof this.onAdd === 'function') {
        this.onAdd({ e });
      }
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
      if (typeof this.onRemove === 'function') {
        this.onRemove(eventData);
      }
      if ((panel instanceof TTabPanel) && (typeof panel.onRemove === 'function')) {
        panel.onRemove();
        panel.$emit('remove');
      }
    },

    genTabNav() {
      const {
        theme,
        panels,
        value: currValue,
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
          panels: [...panels], // immutable，为子组件watch
          currValue,
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
        <t-tab-nav {...data} />
      );
    },

    genTabHeader() {
      return (
        <div
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
        <div class={{ [`${prefix}-tabs__content`]: true }}>
          { this.$scopedSlots.default?.({}) }
        </div>
      );
    },
  },

  mounted() {
    this.connectPanels();
  },

  updated() {
    this.connectPanels();
  },

  render() {
    const header = this.genTabHeader();
    const content = this.genTabContent();
    return (
      <div class="t-tabs">
        { this.placement !== 'bottom' ? [header, content] : [content, header] }
      </div>
    );
  },

});
