import { defineComponent, ref, computed, provide, watchEffect, watch, onMounted, toRefs } from 'vue';
import props from '@td/intel/menu/props';
import { MenuValue } from '@td/intel/menu/type';
import { TdMenuInterface, TdOpenType } from './const';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import VMenu from './v-menu';
import log from '../_common/js/log/log';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';
import { isNumber } from 'lodash-es';
import { isArray } from 'lodash-es';

export default defineComponent({
  name: 'TMenu',
  props: { ...props, onCollapsed: Function },
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    watchEffect(() => {
      if (ctx.slots.options) {
        log.warnOnce('TMenu', '`options` slot is going to be deprecated, please use `operations` for slot instead.');
      }
    });
    const mode = ref(props.expandType);
    const theme = computed(() => props.theme);
    const isMutex = computed(() => props.expandMutex);
    const collapsed = computed(() => props.collapsed);
    const menuClass = computed(() => [
      `${classPrefix.value}-default-menu`,
      `${classPrefix.value}-menu--${props.theme}`,
      {
        [`${classPrefix.value}-is-collapsed`]: props.collapsed,
      },
    ]);
    const innerClasses = computed(() => [`${classPrefix.value}-menu`, `${classPrefix.value}-menu--scroll`]);
    const expandWidth = computed(() => {
      const { width } = props;
      const format = (val: string | number) => (isNumber(val) ? `${val}px` : val);
      if (isArray(width)) return width.map((item) => format(item));

      return [format(width), '64px'];
    });

    const styles = computed(() => ({
      height: '100%',
      width: props.collapsed ? expandWidth.value[1] : expandWidth.value[0],
    }));

    const { value, modelValue, expanded } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const [expandValues, setExpand] = useDefaultValue(expanded, props.defaultExpanded, props.onExpand, 'expanded');
    const activeValues = ref([]);

    watchEffect(() => {
      mode.value = props.collapsed ? 'popup' : props.expandType;
      props.onCollapsed?.({ collapsed: props.collapsed });
    });

    const vMenu = new VMenu({ isMutex, expandValues: expandValues.value ? [...expandValues.value] : [] });
    provide<TdMenuInterface>('TdMenu', {
      activeValue,
      activeValues,
      expandValues,
      mode,
      theme,
      isHead: false,
      vMenu,
      collapsed,
      select: (value: MenuValue) => {
        if (value !== activeValue.value) {
          setActiveValue(value);
        }
      },
      open: (value: MenuValue, type: TdOpenType) => {
        if (mode.value === 'normal') {
          setExpand(vMenu.expand(value));
        } else if (type === 'add') {
          if (expandValues.value.indexOf(value) === -1) {
            // 可能初始expanded里包含了该value
            setExpand([...expandValues.value, value]);
          }
        } else if (type === 'remove') {
          const index = expandValues.value.indexOf(value);
          const tmp = [...expandValues.value];
          tmp.splice(index, 1);
          setExpand(tmp);
        }
      },
    });

    // watch
    watch(
      () => props.expanded,
      (value) => {
        vMenu.expandValues = new Set(value);
      },
    );
    watch(
      () => props.collapsed,
      (newValue, oldValue) => {
        if (!newValue && oldValue) {
          // 如果重新打开菜单，就将原本已经展开的子菜单重新展开
          setExpand([...vMenu.expandValues]);
        }
      },
    );

    const updateActiveValues = (value: MenuValue) => {
      activeValues.value = vMenu.select(value);
    };
    watch(activeValue, updateActiveValues);

    // timelifes
    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
    });

    return {
      styles,
      classPrefix,
      menuClass,
      innerClasses,
      activeValue,
      activeValues,
      expandValues,
    };
  },
  render() {
    const operations = renderContent(this, 'operations', 'options');
    const logo = renderTNodeJSX(this, 'logo');
    return (
      <div class={this.menuClass} style={this.styles}>
        <div class={`${this.classPrefix}-default-menu__inner`}>
          {logo && <div class={`${this.classPrefix}-menu__logo`}>{logo}</div>}
          <ul class={this.innerClasses}>{renderContent(this, 'default', 'content')}</ul>
          {operations && <div class={`${this.classPrefix}-menu__operations`}>{operations}</div>}
        </div>
      </div>
    );
  },
});
