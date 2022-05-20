import { defineComponent, computed, provide, ref, reactive, watch, onMounted, watchEffect, toRefs } from 'vue';
import log from '../_common/js/log/log';
import props from './head-menu-props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './const';
import { Tabs, TabPanel } from '../tabs';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import VMenu from './v-menu';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

export default defineComponent({
  name: 'THeadMenu',
  props: { ...props },
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    watchEffect(() => {
      if (ctx.slots.options) {
        log.warnOnce('TMenu', '`options` slot is going to be deprecated, please use `operations` for slot instead.');
      }
    });
    const { value, modelValue, expanded } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [expandValues, setExpanded] = useDefaultValue(expanded, props.defaultExpanded, props.onExpand, 'expanded');
    const activeValues = ref([]);
    const theme = computed(() => props.theme);
    const menuClass = computed(() => [
      `${classPrefix.value}-menu`,
      `${classPrefix.value}-head-menu`,
      `${classPrefix.value}-menu--${props.theme}`,
    ]);
    const mode = ref(props.expandType);
    const submenu = reactive([]);
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
        setActiveValue(value);
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
        setExpanded(expanded);
      },
    });

    // methods
    const handleTabChange = (value: MenuValue) => {
      setActiveValue(value);
    };

    const handleSubmenuExpand = (value: MenuValue) => {
      const ans = vMenu.getChild(value);
      submenu.length = 0;
      submenu.push(...ans);
    };

    // watch
    watch(expandValues, (value) => {
      if (mode.value === 'normal') {
        handleSubmenuExpand(value[0]);
      }
    });
    const updateActiveValues = (value: MenuValue) => {
      activeValues.value = vMenu.select(value);
    };
    watch(activeValue, updateActiveValues);
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
      classPrefix,
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
        <ul class={[`${this.classPrefix}-head-menu__submenu`, `${this.classPrefix}-submenu`]}>
          {
            <Tabs value={this.activeValue} onChange={this.handleTabChange}>
              {this.submenu.map((item) => (
                <TabPanel value={item.value} label={item.vnode()[0]?.children} />
              ))}
            </Tabs>
          }
        </ul>
      );
    },
  },
  render() {
    const { classPrefix } = this;
    const operations = renderContent(this, 'operations', 'options');
    const logo = renderTNodeJSX(this, 'logo');
    return (
      <div class={this.menuClass}>
        <div class={`${classPrefix}-head-menu__inner`}>
          {logo && <div class={`${classPrefix}-menu__logo`}>{logo}</div>}
          <ul class={`${classPrefix}-menu`}>{renderContent(this, 'default', 'content')}</ul>
          {operations && <div class={`${classPrefix}-menu__operations`}>{operations}</div>}
        </div>
        {this.mode === 'normal' && this.renderNormalSubmenu()}
      </div>
    );
  },
});
