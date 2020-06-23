import Vue, { CreateElement, VNode } from 'vue';
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
    },
    activeName: {
      type: String,
      default: '0',
    },
    defaultActiveName: {
      type: String,
      default: '0',
    },
    size: {
      type: String,
      default: 'middle',
      validator(v: string): boolean {
        return (
          [
            'large',
            'middle',
            'small',
          ].indexOf(v) > -1
        );
      },
    },
    disabled: {
      type: Boolean,
      default: false,
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
    closable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
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
      this.panels.length !== 0 && (this.panels = []);
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
        this.panels = panels;
      }
    },

    setCurrName(val: string) {
      this.currName = val;
    },

    tabChange(event: any, panel: VNode, name: string) {
      this.setCurrName(name);
    },

    tabAdd() {
      this.$emit('add', null);
    },

    tabRemove(name: string) {
      this.$emit('remove', name);
    },

    genTabNav() {
      const {
        theme,
        panels,
        currName,
        size,
        disabled,
        tabPosition,
        closable,
        addable,
        tabChange,
        tabRemove,
      } = this;
      const data = {
        props: {
          theme,
          panels: [...panels], // immutable，为子组件watch
          currName,
          size,
          disabled,
          tabPosition,
          closable,
          addable,
          tabChange,
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

  render(h: CreateElement) {
    const header = this.genTabHeader();
    const content = this.genTabContent();

    return (
      <div class="t-tabs">
        { this.tabPosition !== 'bottom' ? [header, content] : [content, header] }
      </div>
    );
  }

});
