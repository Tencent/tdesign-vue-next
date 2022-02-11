import { defineComponent, ref, computed, provide, watchEffect, watch, onMounted } from 'vue';
import { useEmitEvent } from '../hooks/event';
import { prefix } from '../config';
import props from './props';
import { MenuValue } from './type';
import { TdMenuInterface, TdOpenType } from './const';
import { renderContent, renderTNodeJSX } from '../utils/render-tnode';
import VMenu from './v-menu';
import { ClassName } from '../common';
import log from '../_common/js/log/log';

export default defineComponent({
  name: 'TMenu',
  props: { ...props },
  emits: ['collapsed', 'change', 'expand'],
  setup(props, ctx) {
    const emitEvent = useEmitEvent();
    watchEffect(() => {
      if (ctx.slots.options) {
        log.warnOnce('TMenu', '`options` slot is going to be deprecated, please use `operations` for slot instead.');
      }
    });
    const mode = ref(props.expandType);
    const theme = computed(() => props.theme);
    const isMutex = computed(() => props.expandMutex);
    const menuClass = computed(() => [
      `${prefix}-default-menu`,
      `${prefix}-menu--${props.theme}`,
      {
        [`${prefix}-is-collapsed`]: props.collapsed,
      },
    ]);
    const innerClasses = computed(() => [
      `${prefix}-menu`,
      { [`${prefix}-menu--scroll`]: mode.value !== 'popup' },
      'narrow-scrollbar',
    ]);
    const expandWidth = typeof props.width === 'number' ? `${props.width}px` : props.width;
    const styles: ClassName = computed(() => ({
      height: '100%',
      width: props.collapsed ? '64px' : expandWidth,
    }));

    const activeValue = ref(props.defaultValue || props.value);
    const activeValues = ref([]);
    const expandValues = ref(props.expanded || []);

    watchEffect(() => {
      mode.value = props.collapsed ? 'popup' : 'normal';
      emitEvent('collapsed', mode.value);
    });

    const vMenu = new VMenu({ isMutex: isMutex.value, expandValues: expandValues.value });
    provide<TdMenuInterface>('TdMenu', {
      activeValue,
      activeValues,
      expandValues,
      mode,
      theme,
      isHead: false,
      vMenu,
      select: (value: MenuValue) => {
        activeValue.value = value;
        emitEvent('change', value);
      },
      open: (value: MenuValue, type: TdOpenType) => {
        if (mode.value === 'normal') {
          expandValues.value = vMenu.expand(value);
        } else if (type === 'add') {
          if (expandValues.value.indexOf(value) === -1) {
            // 可能初始expanded里包含了该value
            expandValues.value.push(value);
          }
        } else if (type === 'remove') {
          const index = expandValues.value.indexOf(value);
          expandValues.value.splice(index, 1);
        }
        emitEvent('expand', expandValues.value);
      },
    });

    // watch
    watch(
      () => props.expanded,
      (value) => {
        expandValues.value = value;
        vMenu.expandValues = new Set(value);
      },
    );
    const updateActiveValues = (value: MenuValue) => {
      activeValue.value = value;
      activeValues.value = vMenu.select(value);
    };
    watch(() => props.value, updateActiveValues);
    watch(() => props.defaultValue, updateActiveValues);

    // timelifes
    onMounted(() => {
      activeValues.value = vMenu.select(activeValue.value);
    });

    return {
      styles,
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
        <div class={`${prefix}-default-menu__inner`}>
          {logo && <div class={`${prefix}-menu__logo`}>{logo}</div>}
          <ul class={this.innerClasses}>{renderContent(this, 'default', 'content')}</ul>
          {operations && <div class={`${prefix}-menu__operations`}>{operations}</div>}
        </div>
      </div>
    );
  },
});
