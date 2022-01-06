import { defineComponent, computed, provide, ref, reactive, watch, onMounted } from 'vue';
import { prefix } from '../config';
import props from './head-menu-props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './const';
import { Tabs, TabPanel } from '../tabs';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import VMenu from './v-menu';

export default defineComponent({
  name: 'THeadMenu',
  components: { Tabs, TabPanel },
  props,
  setup(props, ctx) {
    const activeValue = ref(props.defaultValue || props.value);
    const activeValues = ref([]);
    const expandValues = ref(props.defaultExpanded || props.expanded || []);
    const theme = computed(() => props.theme);
    const menuClass = computed(() => [`${prefix}-menu`, `${prefix}-head-menu`, `${prefix}-menu--${props.theme}`]);
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
        emitChange(value);
      },
      open: (value: MenuValue, type: TdOpenType) => {
        const expanded = [...expandValues.value];
        const index = expanded.indexOf(value);

        if (mode.value === 'popup') {
          if (type === 'add') {
            if (index === -1) {
              // 可能初始expanded里包含了该value
              expanded.push(value);
            }
          } else if (type === 'remove') {
            expanded.splice(index, 1);
          }
        } else {
          expanded.splice(0, 1);
          if (index === -1) {
            expanded.push(value);
          }
        }
        emitExpand(expanded);
      },
    });

    // methods
    const handleTabChange = (value: MenuValue) => {
      emitChange(value);
    };

    const handleSubmenuExpand = (value: MenuValue) => {
      const ans = vMenu.getChild(value);
      submenu.length = 0;
      submenu.push(...ans);
    };

    // watch
    watch(
      () => props.expanded,
      (value) => {
        expandValues.value = value;
        if (mode.value === 'normal') {
          handleSubmenuExpand(value[0]);
        }
      },
    );
    const updateActiveValues = (value: MenuValue) => {
      activeValue.value = value;
      activeValues.value = vMenu.select(value);
    };
    watch(() => props.value, updateActiveValues);
    watch(() => props.defaultValue, updateActiveValues);
    watch(
      () => props.expandType,
      (value) => {
        mode.value = value;
      },
    );

    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
      if (expandValues.value?.length > 0) {
        handleSubmenuExpand(expandValues.value[0]); // 顶部导航只能同时展开一个子菜单
      }
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
              {this.submenu.map((item) => (
                <t-tab-panel value={item.value} label={item.vnode()[0]?.children} />
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
          <ul class={`${prefix}-menu`}>{renderContent(this, 'default', 'content')}</ul>
          {operations && <div class={`${prefix}-menu__operations`}>{operations}</div>}
        </div>
        {this.mode === 'normal' && this.renderNormalSubmenu()}
      </div>
    );
  },
});
