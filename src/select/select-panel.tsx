import { computed, defineComponent, toRefs, inject, PropType } from 'vue';
import { get } from 'lodash';
import { TdOptionProps } from './type';
import Option from './option';
import OptionGroup from './optionGroup';
import TdSelectProps from './props';

import { useTNodeJSX } from '../hooks/tnode';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { selectInjectKey } from './constants';

export default defineComponent({
  name: 'TSelectPanel',

  props: {
    inputValue: TdSelectProps.inputValue,
    panelTopContent: TdSelectProps.panelTopContent,
    size: TdSelectProps.size,
    options: TdSelectProps.options,
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

  setup(props, { slots }) {
    const { options, showCreateOption } = toRefs(props);
    const selectName = usePrefixClass('select');
    const renderTNodeJSX = useTNodeJSX();
    const { t, global } = useConfig('select');
    const tSelect = inject(selectInjectKey);

    const isEmpty = computed(() => !options.value.length && !showCreateOption.value);

    const renderEmptyContent = () => {
      const useLocale = !props.empty && !slots.empty;
      if (useLocale) {
        return <div class={`${selectName.value}__empty`}>{t(global.value.empty)}</div>;
      }
      return renderTNodeJSX('empty');
    };

    const renderLoadingContent = () => {
      const useLocale = !props.loadingText && !slots.loadingText;
      if (useLocale) {
        return <div class={`${selectName.value}__loading-tips`}>{t(global.value.loadingText)}</div>;
      }
      return renderTNodeJSX('loadingText');
    };

    const renderCreateOption = () => {
      return (
        <ul v-show={props.showCreateOption} class={[`${name}__create-option`, `${name}__list`]}>
          <t-option value={props.inputValue} label={props.inputValue} class={`${name}__create-option--special`} />
        </ul>
      );
    };

    const renderSingleOption = (options: TdOptionProps[] = []) => {
      return options.map((item, index) => (
        <Option
          value={get(item, tSelect.value.keys?.value || 'value')}
          label={get(item, tSelect.value.keys?.label || 'label')}
          content={item.content}
          disabled={item.disabled}
          key={index}
        ></Option>
      ));
    };

    const renderOptionsContent = () => {
      const { options } = props;

      return <ul class={`${selectName.value}__list`}>{renderSingleOption(options)}</ul>;
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
        class={`${selectName.value}__dropdown-inner ${selectName.value}__dropdown-inner--size-${dropdownInnerSize.value}`}
      >
        {renderTNodeJSX('panelTopContent')}
        {isEmpty.value && renderEmptyContent()}
        {renderCreateOption()}
        {!isEmpty.value && props.loading && renderLoadingContent()}
        {!isEmpty.value && !props.loading && renderOptionsContent()}
        {renderTNodeJSX('panelBottomContent')}
      </div>
    );
  },
});
