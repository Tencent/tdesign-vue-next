import { computed, defineComponent, inject, PropType, Slots } from 'vue';
import isFunction from 'lodash/isFunction';

import { SelectOption, SelectOptionGroup, TdOptionProps } from './type';
import Option from './option';
import OptionGroup from './optionGroup';
import TdSelectProps from './props';

import { useTNodeJSX, useTNodeDefault } from '../hooks/tnode';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { selectInjectKey } from './helper';

export default defineComponent({
  name: 'TSelectPanel',
  props: {
    inputValue: TdSelectProps.inputValue,
    panelTopContent: TdSelectProps.panelTopContent,
    panelBottomContent: TdSelectProps.panelBottomContent,
    empty: TdSelectProps.empty,
    creatable: TdSelectProps.creatable,
    loading: TdSelectProps.loading,
    loadingText: TdSelectProps.loadingText,
    multiple: TdSelectProps.multiple,
    filterable: TdSelectProps.filterable,
    filter: TdSelectProps.filter,
    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('select');
    const renderTNodeJSX = useTNodeJSX();
    const renderDefaultTNode = useTNodeDefault();
    const { t, global } = useConfig('select');
    const tSelect = inject(selectInjectKey);

    const showCreateOption = computed(() => props.creatable && props.filterable && props.inputValue);

    const displayOptions = computed(() => {
      if (!props.inputValue || props.creatable || !(props.filterable || isFunction(props.filter))) return props.options;

      const filterMethods = (option: SelectOption) => {
        if (isFunction(props.filter)) {
          return props.filter(`${props.inputValue}`, option);
        }

        return option.label.indexOf(`${props.inputValue}`) > -1;
      };

      return props.options.filter(filterMethods);
    });

    const isEmpty = computed(() => !displayOptions.value.length);

    const renderCreateOption = () => (
      <ul class={[`${COMPONENT_NAME.value}__create-option`, `${COMPONENT_NAME.value}__list`]}>
        <Option
          value={props.inputValue}
          label={`${props.inputValue}`}
          createAble={true}
          class={`${COMPONENT_NAME.value}__create-option--special`}
        />
      </ul>
    );

    // 递归render options
    const renderOptionsContent = (options: SelectOption[]) => {
      return (
        <ul class={`${COMPONENT_NAME.value}__list`}>
          {options.map((item: SelectOptionGroup & TdOptionProps & { slots: Slots }, index) => {
            if (item.group) {
              return (
                <OptionGroup label={item.group} divider={item.divider}>
                  {renderOptionsContent(item.children)}
                </OptionGroup>
              );
            }
            return <Option key={index} {...item} multiple={props.multiple} v-slots={item.slots} />;
          })}
        </ul>
      );
    };

    const dropdownInnerSize = computed(() => {
      return {
        small: 's',
        medium: 'm',
        large: 'l',
      }[tSelect.value.size];
    });

    return () => (
      <div
        class={[
          `${COMPONENT_NAME.value}__dropdown-inner`,
          `${COMPONENT_NAME.value}__dropdown-inner--size-${dropdownInnerSize.value}`,
        ]}
      >
        {renderTNodeJSX('panelTopContent')}
        {/* create option */}
        {showCreateOption.value && renderCreateOption()}
        {!isEmpty.value && !props.loading && renderOptionsContent(displayOptions.value)}
        {/* 空状态 */}
        {isEmpty.value &&
          renderDefaultTNode('empty', {
            defaultNode: <div class={`${COMPONENT_NAME.value}__empty`}>{t(global.value.empty)}</div>,
          })}
        {/* loading状态 */}
        {!isEmpty.value &&
          props.loading &&
          renderDefaultTNode('loadingText', {
            defaultNode: <div class={`${COMPONENT_NAME.value}__loading-tips`}>{t(global.value.loadingText)}</div>,
          })}
        {renderTNodeJSX('panelBottomContent')}
      </div>
    );
  },
});
