import { defineComponent, ref, computed, provide, watchEffect, watch, onMounted, toRefs } from 'vue';
import props from './props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './const';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import VMenu from './v-menu';
import { ClassName } from '../common';
import log from '../_common/js/log/log';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';

export default defineComponent({
  name: 'TMenu',
  props: { ...props },
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
    const menuClass = computed(() => [
      `${classPrefix.value}-default-menu`,
      `${classPrefix.value}-menu--${props.theme}`,
      {
        [`${classPrefix.value}-is-collapsed`]: props.collapsed,
      },
    ]);
    const innerClasses = computed(() => [
      `${classPrefix.value}-menu`,
      { [`${classPrefix.value}-menu--scroll`]: mode.value !== 'popup' },
      'narrow-scrollbar',
    ]);
    const expandWidth = computed(() => {
      const { width } = props;
      const format = (val: string | number) => (typeof val === 'number' ? `${val}px` : val);
      if (Array.isArray(width)) return width.map((item) => format(item));

      return [format(width), '64px'];
    });

    const styles: ClassName = computed(() => ({
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
      select: (value: MenuValue) => {
        setActiveValue(value);
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
