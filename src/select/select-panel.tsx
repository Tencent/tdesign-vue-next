import { computed, defineComponent, toRefs, inject, PropType, Slots } from 'vue';
import { get } from 'lodash';
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
    size: TdSelectProps.size,
    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
    },
    empty: TdSelectProps.empty,
    creatable: TdSelectProps.creatable,
    loading: TdSelectProps.loading,
    loadingText: TdSelectProps.loadingText,
    multiple: TdSelectProps.multiple,
    max: TdSelectProps.max,
    value: TdSelectProps.value,
    realValue: {
      type: String as PropType<string>,
    },
    realLabel: {
      type: String as PropType<string>,
    },
    showCreateOption: {
      type: Boolean as PropType<boolean>,
    },
  },

  setup(props) {
    const { options, showCreateOption } = toRefs(props);
    const COMPONENT_NAME = usePrefixClass('select');
    const renderTNodeJSX = useTNodeJSX();
    const renderDefaultTNode = useTNodeDefault();
    const { t, global } = useConfig('select');
    const tSelect = inject(selectInjectKey);

    const isEmpty = computed(() => !options.value.length && !showCreateOption.value);

    const renderCreateOption = () => (
      <ul class={[`${COMPONENT_NAME.value}__create-option`, `${COMPONENT_NAME.value}__list`]}>
        <t-option
          value={props.inputValue}
          label={props.inputValue}
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
            return (
              <Option
                value={get(item, tSelect.value.keys?.value || 'value')}
                label={get(item, tSelect.value.keys?.label || 'label')}
                content={item.content}
                disabled={item.disabled}
                key={index}
                v-slots={item.slots}
              />
            );
          })}
        </ul>
      );
    };

    const dropdownInnerSize = computed(() => {
      return {
        small: 's',
        medium: 'm',
        large: 'l',
      }[props.size];
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
        {props.showCreateOption && renderCreateOption()}
        {!isEmpty.value && !props.loading && renderOptionsContent(props.options)}
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
