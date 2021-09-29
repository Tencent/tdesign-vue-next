import {
  defineComponent, computed, provide, ref, reactive, watch, onMounted,
} from 'vue';
import { prefix } from '../config';
import props from './head-menu-props';
import { MenuValue } from './type';
import { TdMenuInterface, TdMenuItem } from './const';
import { Tabs, TabPanel } from '../tabs';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import VMenu from './v-menu';

const name = `${prefix}-head-menu`;

export default defineComponent({
  name,
  components: { Tabs, TabPanel },
  props,
  setup(props, ctx) {
    const activeValue = ref(props.defaultValue || props.value);
    const activeValues = ref([]);
    const expandValues = ref(props.defaultExpanded || props.expanded || []);
    const theme = computed(() => props.theme);
    const menuClass = computed(() => [
      `${prefix}-menu`,
      `${prefix}-head-menu`,
      `${prefix}-menu-mode__${props.expandType}`,
      `${prefix}-menu--${props.theme}`,
    ]);
    const mode = ref(props.expandType);
    const submenu = reactive([]);
    const deliver = (evt: string) => {
      const func = `on${evt[0].toUpperCase() + evt.slice(1)}`;
      return (val: any) => {
        if (typeof props[func] === 'function') {
          props[func](val);
        }
        ctx.emit(evt, val);
      };
    };
    const emitChange = deliver('change');
    const emitExpand = deliver('expand');
    const vMenu = new VMenu({ isMutex: true, expandValues: expandValues.value });

    provide<TdMenuInterface>('TdMenu', {
      mode,
      theme,
      vMenu,
      isHead: true,
      expandValues,
      activeValue,
      activeValues,
      select: (value: MenuValue) => {
        activeValue.value = value;
        emitChange(value);
      },
      selectSubMenu: (menuItems: TdMenuItem[]) => {
        submenu.length = 0;
        submenu.push(...menuItems);
      },
      open: (value: MenuValue) => {
        const index = expandValues.value.indexOf(value);

        expandValues.value.splice(0, 1);
        if (index === -1) {
          expandValues.value.push(value);
          emitExpand(expandValues.value);
          return true;
        }
        emitExpand(expandValues.value);
        return false;
      },
    });

    // methods
    const handleTabChange = (value: MenuValue) => {
      emitChange(value);
    };

    // watch
    watch(
      () => props.expanded,
      (value) => {
        expandValues.value = value;
      },
    );
    const updateActiveValues = (value: MenuValue) => {
      activeValue.value = value;
      activeValues.value = vMenu.select(value);
    };
    watch(() => props.value, updateActiveValues);
    watch(() => props.defaultValue, updateActiveValues);

    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
    });

    return {
      mode,
      menuClass,
      expandValues,
      activeValue,
      activeValues,
      submenu,
      handleTabChange,
    };
  },
  methods: {
    renderNormalSubmenu() {
      if (this.submenu.length === 0) return null;
      return (
        <ul class={[`${prefix}-head-menu__submenu`, `${prefix}-submenu`]}>
          {
            <t-tabs value={this.activeValue} onChange={this.handleTabChange}>
              { this.submenu.map((item) => (
                <t-tab-panel value={item.value} label={item.label[0].text} />
              ))}
            </t-tabs>
          }
        </ul>
      );
    },
  },
  render() {
    if (this.$slots.options) {
      console.warn('TDesign Warn: `options` slot is going to be deprecated, please use `operations` for slot instead.');
    }
    const operations = renderContent(this, 'operations', 'options');
    const logo = renderTNodeJSX(this, 'logo');
    return (
      <div class={this.menuClass}>
        <div class={`${prefix}-head-menu__inner`}>
          {logo && <div class={`${prefix}-menu__logo`}>{logo}</div>}
          <ul class={`${prefix}-menu`}>
            {renderContent(this, 'default', 'content')}
          </ul>
          {operations && <div class={`${prefix}-menu__operations`}>{operations}</div>}
        </div>
        {this.mode === 'normal' && this.renderNormalSubmenu()}
      </div>
    );
  },
});
