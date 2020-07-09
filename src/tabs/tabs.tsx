import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import TTabNav from './tab-nav.vue';
import TTabPanel from './tab-panel.vue';

const name = `${prefix}-tabs`;

export default Vue.extend({
  name,

  components: {
    RenderComponent,
    TTabPanel,
    TTabNav,
  },

  props: {
    theme: {
      type: String,
      default: 'normal',
      validator(v: string): boolean {
        return (
          [
            'normal',
            'card',
          ].indexOf(v) > -1
        );
      },
    },
    activeName: {
      type: [String, Number],
      default: 0,
    },
    defaultActiveName: {
      type: [String, Number],
      default: 0,
    },
    size: {
      type: String,
      default: 'middle',
      validator(v: string): boolean {
        return (
          [
            'large',
            'middle',
          ].indexOf(v) > -1
        );
      },
    },
    tabPosition: {
      type: String,
      default: 'top',
      validator(v: string): boolean {
        return (
          [
            'top',
            'right',
            'bottom',
            'left',
          ].indexOf(v) > -1
        );
      },
    },
    addable: {
      type: Boolean,
    },
  },

  data() {
    return {
      currName: this.activeName, // 当前tab name
      panels: [], // tab内的panel实例组
    };
  },

  watch: {
    activeName(val) {
      this.currName = val;
    },
  },

  methods: {
    connectPanels() {
      if (this.$slots.default) {
        const panelSlots = this.$slots.default.filter(vnode => {
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

    setCurrName(val: string) {
      this.currName = val;
    },

    tabChange(event: Event, panel: VNode, name: string) {
      this.setCurrName(name);
      this.$emit('change', name);
    },

    tabAdd() {
      this.$emit('add', null);
    },

    tabRemove(event: Event, name: string) {
      event.stopPropagation();
      this.$emit('remove', name);
    },

    genTabNav() {
      const {
        theme,
        panels,
        currName,
        size,
        tabPosition,
        addable,
        tabChange,
        tabAdd,
        tabRemove,
      } = this;
      const data = {
        props: {
          theme,
          panels: [...panels], // immutable，为子组件watch
          currName,
          size,
          tabPosition,
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
            [`${prefix}-is-${this.tabPosition}`]: true,
          }}
        >
          { this.genTabNav() }
        </div>
      );
    },

    genTabContent() {
      return (
        <div class={{ [`${prefix}-tabs__content`]: true }}>
          { this.$slots.default }
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
        { this.tabPosition !== 'bottom' ? [header, content] : [content, header] }
      </div>
    );
  }

});
