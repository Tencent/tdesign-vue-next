import {
  defineComponent, ref, computed, provide, watchEffect, watch,
} from 'vue';
import { prefix } from '../config';
import props from './props';
import { MenuValue } from './type';
import { TdMenuInterface } from './const';

const name = `${prefix}-menu`;

export default defineComponent({
  name,
  props: { ...props },
  setup(props, ctx) {
    const mode = ref(props.expandType);
    const theme = computed(() => props.theme);

    const menuClass = computed(() => [
      `${prefix}-default-menu`,
      `${prefix}-menu-mode__${mode.value}`,
      `${prefix}-menu--${props.theme}`,
      {
        [`${prefix}-is-collapsed`]: props.collapsed,
      },
    ]);
    const innerClasses = computed(() => [
      `${prefix}-menu`,
      { [`${prefix}-menu--scroll`]: mode.value !== 'popup' },
    ]);

    const styles = computed(() => {
      type WidthType = typeof props.width;
      let collapsedWidth: WidthType = '64px';
      let defaultWidth: WidthType = '';

      if (Array.isArray(props.width)) {
        [defaultWidth, collapsedWidth] = props.width;
      } else {
        defaultWidth = props.width === 'number' ? `${props.width}px` : props.width;
      }
      return {
        height: '100%',
        width: props.collapsed ? collapsedWidth : defaultWidth,
      };
    });

    const activeIndexValue = ref(props.defaultValue || props.value);
    const expandedArray = ref(props.expanded || []);
    const deliver = (evt: string) => (val: any) => {
      ctx.emit(evt, val);
    };
    const emitChange = deliver('change');
    const emitExpand = deliver('expand');
    const emitCollapse = deliver('collapsed');

    watchEffect(() => {
      mode.value = props.collapsed ? 'popup' : 'normal';
      emitCollapse(mode.value);
    });

    provide<TdMenuInterface>('TdMenu', {
      activeIndexValue,
      expandedArray,
      mode,
      theme,
      isHead: false,
      select: (val: MenuValue) => {
        if (val !== activeIndexValue.value) {
          activeIndexValue.value = val;
          emitChange(val);
        }
      },
      open: (val: MenuValue) => {
        const index = expandedArray.value.indexOf(val);

        if (props.expandMutex || mode.value === 'popup') {
          expandedArray.value.splice(0, 1);
          if (index === -1) {
            expandedArray.value.push(val);
            emitExpand(expandedArray.value);
            return true;
          }
        } else {
          if (index > -1) {
            expandedArray.value.splice(index, 1);
            emitExpand(expandedArray.value);
            return true;
          }
          expandedArray.value.push(val);
          emitExpand(expandedArray.value);
          return false;
        }
        emitExpand(expandedArray.value);
      },
    });

    // watch
    watch(
      () => props.expanded,
      (value) => {
        expandedArray.value = value;
      },
    );
    watch(
      () => props.value,
      (value) => {
        activeIndexValue.value = value;
      },
    );

    const openedNames = computed(() => props.expanded ? [...props.expanded] : []);

    return {
      styles,
      menuClass,
      innerClasses,
      openedNames,
      expandedArray,
    };
  },
  render() {
    if (this.$slots.options) {
      console.warn('TDesign Warn: `options` slot is going to be deprecated, please use `operations` for slot instead.');
    }
    const { logo: logoSlot, default: defaultSlot, operations: operationsSlot } = this.$slots;
    return (
      <div class={this.menuClass} style={this.styles}>
        <div class={`${prefix}-default-menu__inner`}>
          {logoSlot && (<div class={`${prefix}-menu__logo`}>{logoSlot()}</div>)}
          <ul class={this.innerClasses}>
            {defaultSlot && defaultSlot()}
          </ul>
          {operationsSlot && (<div class={`${prefix}-menu__operations`}>{operationsSlot()}</div>)}
        </div>
      </div>
    );
  },
});
